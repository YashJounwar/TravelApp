import { NextRequest } from "next/server";
import { verifyAccessTokenFromRequest } from "@/lib/auth/session";

export async function verifyAdminFromRequest(req: NextRequest) {
  const devBypass = process.env.NODE_ENV !== "production" && process.env.ALLOW_DEV_ADMIN_BYPASS === "true";
  if (devBypass) return { uid: "dev-admin", email: "dev-admin@shanvitravels.local", role: "admin" as const };

  const user = verifyAccessTokenFromRequest(req);
  if (user.role !== "admin") {
    throw new Error("Forbidden");
  }
  return user;
}

export function assertAdminRole() {
  const enabled = process.env.ADMIN_DASHBOARD_ENABLED !== "false";
  if (!enabled) {
    throw new Error("Admin dashboard disabled");
  }
}
