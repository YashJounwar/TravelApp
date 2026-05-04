import { createHash, randomBytes, randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/admin";
import { signJwt, verifyJwt, type JwtClaims } from "@/lib/auth/jwt";

export const ACCESS_COOKIE_NAME = "shanvi_access";
export const REFRESH_COOKIE_NAME = "shanvi_refresh";

const ACCESS_TOKEN_SECONDS = 15 * 60;
const REFRESH_TOKEN_SECONDS = 30 * 24 * 60 * 60;

export interface AuthUser {
  uid: string;
  email: string;
  role: "admin";
}

function tokenHash(value: string) {
  return createHash("sha256").update(value).digest("base64url");
}

function getRequestIp(req: NextRequest) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

function getUserAgent(req: NextRequest) {
  return req.headers.get("user-agent") || "unknown";
}

function cookieSecure() {
  return process.env.NODE_ENV === "production";
}

function cookieMaxAge(daysOrSeconds: number) {
  return daysOrSeconds;
}

function refreshCollection() {
  return adminDb.collection("authRefreshTokens");
}

function createAccessToken(user: AuthUser) {
  const now = Math.floor(Date.now() / 1000);
  const claims: JwtClaims = {
    sub: user.uid,
    email: user.email,
    role: user.role,
    jti: randomUUID(),
    iat: now,
    exp: now + ACCESS_TOKEN_SECONDS
  };
  return signJwt(claims);
}

function createRefreshCookieValue(tokenId: string, secret: string) {
  return `${tokenId}.${secret}`;
}

function parseRefreshCookie(value: string | undefined) {
  if (!value) return null;
  const [tokenId, secret] = value.split(".");
  if (!tokenId || !secret) return null;
  return { tokenId, secret };
}

export function setAuthCookies(response: NextResponse, accessToken: string, refreshToken: string) {
  response.cookies.set(ACCESS_COOKIE_NAME, accessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: cookieSecure(),
    path: "/",
    maxAge: cookieMaxAge(ACCESS_TOKEN_SECONDS)
  });

  response.cookies.set(REFRESH_COOKIE_NAME, refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: cookieSecure(),
    path: "/api/auth",
    maxAge: cookieMaxAge(REFRESH_TOKEN_SECONDS)
  });
}

export function clearAuthCookies(response: NextResponse) {
  response.cookies.set(ACCESS_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: cookieSecure(),
    path: "/",
    maxAge: 0
  });

  response.cookies.set(REFRESH_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: cookieSecure(),
    path: "/api/auth",
    maxAge: 0
  });
}

export async function createRefreshSession(user: AuthUser, req: NextRequest) {
  const tokenId = randomUUID();
  const familyId = randomUUID();
  const secret = randomBytes(48).toString("base64url");
  const now = new Date();
  const expiresAt = new Date(now.getTime() + REFRESH_TOKEN_SECONDS * 1000);

  await refreshCollection().doc(tokenId).set({
    tokenHash: tokenHash(secret),
    uid: user.uid,
    email: user.email,
    role: user.role,
    familyId,
    createdAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
    revokedAt: null,
    replacedBy: null,
    userAgent: getUserAgent(req),
    ip: getRequestIp(req)
  });

  return {
    accessToken: createAccessToken(user),
    refreshToken: createRefreshCookieValue(tokenId, secret)
  };
}

export async function rotateRefreshSession(req: NextRequest) {
  const parsed = parseRefreshCookie(req.cookies.get(REFRESH_COOKIE_NAME)?.value);
  if (!parsed) throw new Error("Missing refresh token");

  const now = new Date();
  const existingRef = refreshCollection().doc(parsed.tokenId);
  const newTokenId = randomUUID();
  const newSecret = randomBytes(48).toString("base64url");
  const newRef = refreshCollection().doc(newTokenId);

  const user = await adminDb.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(existingRef);
    if (!snapshot.exists) throw new Error("Invalid refresh token");

    const data = snapshot.data() as {
      tokenHash?: string;
      uid?: string;
      email?: string;
      role?: "admin";
      familyId?: string;
      expiresAt?: string;
      revokedAt?: string | null;
    };

    if (!data.uid || !data.email || data.role !== "admin" || !data.familyId || !data.expiresAt) {
      throw new Error("Invalid refresh token");
    }

    if (data.revokedAt || new Date(data.expiresAt).getTime() <= now.getTime()) {
      throw new Error("Expired refresh token");
    }

    if (data.tokenHash !== tokenHash(parsed.secret)) {
      transaction.set(existingRef, { revokedAt: now.toISOString(), revokedReason: "hash_mismatch" }, { merge: true });
      throw new Error("Invalid refresh token");
    }

    const newExpiresAt = new Date(now.getTime() + REFRESH_TOKEN_SECONDS * 1000);
    transaction.set(existingRef, { revokedAt: now.toISOString(), replacedBy: newTokenId }, { merge: true });
    transaction.set(newRef, {
      tokenHash: tokenHash(newSecret),
      uid: data.uid,
      email: data.email,
      role: data.role,
      familyId: data.familyId,
      createdAt: now.toISOString(),
      expiresAt: newExpiresAt.toISOString(),
      revokedAt: null,
      replacedBy: null,
      userAgent: getUserAgent(req),
      ip: getRequestIp(req)
    });

    return { uid: data.uid, email: data.email, role: data.role };
  });

  return {
    accessToken: createAccessToken(user),
    refreshToken: createRefreshCookieValue(newTokenId, newSecret),
    user
  };
}

export async function revokeRefreshSession(req: NextRequest) {
  const parsed = parseRefreshCookie(req.cookies.get(REFRESH_COOKIE_NAME)?.value);
  if (!parsed) return;

  await refreshCollection()
    .doc(parsed.tokenId)
    .set({ revokedAt: new Date().toISOString(), revokedReason: "logout" }, { merge: true });
}

export function verifyAccessTokenFromRequest(req: NextRequest): AuthUser {
  const cookieToken = req.cookies.get(ACCESS_COOKIE_NAME)?.value;
  const bearerToken = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const claims = verifyJwt(cookieToken || bearerToken || "");

  return {
    uid: claims.sub,
    email: claims.email,
    role: claims.role
  };
}
