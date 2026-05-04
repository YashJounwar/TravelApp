import { NextRequest, NextResponse } from "next/server";
import { verifyAccessTokenFromRequest } from "@/lib/auth/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const devBypass = process.env.NODE_ENV !== "production" && process.env.ALLOW_DEV_ADMIN_BYPASS === "true";
  if (devBypass) {
    return NextResponse.json({
      user: { uid: "dev-admin", email: "dev-admin@shanvitravels.local", role: "admin" }
    });
  }

  try {
    const user = verifyAccessTokenFromRequest(req);
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
