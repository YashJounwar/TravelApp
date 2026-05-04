import { createHmac, timingSafeEqual } from "crypto";

export interface JwtClaims {
  sub: string;
  email: string;
  role: "admin";
  jti: string;
  iat: number;
  exp: number;
}

function base64UrlEncode(value: Buffer | string) {
  return Buffer.from(value).toString("base64url");
}

function base64UrlDecode(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function getSigningSecret() {
  const secret = process.env.JWT_SECRET || process.env.AUTH_SECRET;

  if (secret && secret.length >= 32) {
    return secret;
  }

  if (process.env.NODE_ENV !== "production") {
    return "shanvi-travels-development-jwt-secret-change-before-production";
  }

  throw new Error("JWT_SECRET must be set to at least 32 characters in production.");
}

function signContent(content: string) {
  return createHmac("sha256", getSigningSecret()).update(content).digest("base64url");
}

function safeCompare(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

export function signJwt(claims: JwtClaims) {
  const header = base64UrlEncode(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = base64UrlEncode(JSON.stringify(claims));
  const content = `${header}.${payload}`;
  return `${content}.${signContent(content)}`;
}

export function verifyJwt(token: string): JwtClaims {
  const [header, payload, signature] = token.split(".");

  if (!header || !payload || !signature) {
    throw new Error("Malformed token");
  }

  const expectedSignature = signContent(`${header}.${payload}`);
  if (!safeCompare(signature, expectedSignature)) {
    throw new Error("Invalid token signature");
  }

  const headerData = JSON.parse(base64UrlDecode(header)) as { alg?: string; typ?: string };
  if (headerData.alg !== "HS256" || headerData.typ !== "JWT") {
    throw new Error("Unsupported token header");
  }

  const claims = JSON.parse(base64UrlDecode(payload)) as JwtClaims;
  const now = Math.floor(Date.now() / 1000);
  if (!claims.exp || claims.exp <= now) {
    throw new Error("Token expired");
  }

  if (claims.role !== "admin") {
    throw new Error("Forbidden");
  }

  return claims;
}
