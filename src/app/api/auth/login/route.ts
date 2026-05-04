import { createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createRefreshSession, setAuthCookies } from "@/lib/auth/session";
import { verifyAdminPassword } from "@/lib/auth/password";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const loginSchema = z.object({
  email: z.string().trim().email().max(254),
  password: z.string().min(8).max(200)
});

function adminUid(email: string) {
  return createHash("sha256").update(`admin:${email.toLowerCase()}`).digest("hex").slice(0, 32);
}

export async function POST(req: NextRequest) {
  const parsed = loginSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Please enter a valid admin email and password." }, { status: 400 });
  }

  const configuredEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const email = parsed.data.email.toLowerCase();

  if (!configuredEmail || email !== configuredEmail || !(await verifyAdminPassword(parsed.data.password))) {
    return NextResponse.json({ error: "Invalid admin credentials." }, { status: 401 });
  }

  const user = {
    uid: adminUid(email),
    email,
    role: "admin" as const
  };
  const session = await createRefreshSession(user, req);
  const response = NextResponse.json({ user });
  setAuthCookies(response, session.accessToken, session.refreshToken);
  response.headers.set("Cache-Control", "no-store");
  return response;
}
