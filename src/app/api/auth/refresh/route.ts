import { NextRequest, NextResponse } from "next/server";
import { rotateRefreshSession, setAuthCookies } from "@/lib/auth/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const session = await rotateRefreshSession(req);
    const response = NextResponse.json({ user: session.user });
    setAuthCookies(response, session.accessToken, session.refreshToken);
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch {
    return NextResponse.json({ error: "Session expired. Please sign in again." }, { status: 401 });
  }
}
