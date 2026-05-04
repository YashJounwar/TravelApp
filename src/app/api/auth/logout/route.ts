import { NextRequest, NextResponse } from "next/server";
import { clearAuthCookies, revokeRefreshSession } from "@/lib/auth/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  await revokeRefreshSession(req).catch(() => undefined);
  const response = NextResponse.json({ ok: true });
  clearAuthCookies(response);
  response.headers.set("Cache-Control", "no-store");
  return response;
}
