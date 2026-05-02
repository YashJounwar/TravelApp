import { NextRequest } from "next/server";
import { adminAuth } from "@/lib/firebase/admin";

function getBearerToken(headerValue: string | null) {
  if (!headerValue) return null;
  const [scheme, token] = headerValue.split(" ");
  if (scheme !== "Bearer" || !token) return null;
  return token;
}

export async function verifyAdminFromRequest(req: NextRequest) {
  const devBypass = process.env.NODE_ENV !== "production" && process.env.ALLOW_DEV_ADMIN_BYPASS === "true";
  if (devBypass) return { uid: "dev-admin", role: "admin" };

  const token = getBearerToken(req.headers.get("authorization"));
  if (!token) {
    throw new Error("Missing admin token");
  }
  const decoded = await adminAuth.verifyIdToken(token);
  if (decoded.role !== "admin") {
    throw new Error("Forbidden");
  }
  return { uid: decoded.uid, role: decoded.role };
}

export function assertAdminRole() {
  const enabled = process.env.ADMIN_DASHBOARD_ENABLED !== "false";
  if (!enabled) {
    throw new Error("Admin dashboard disabled");
  }
}
