import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/admin";
import { verifyAdminFromRequest } from "@/lib/auth/admin";
import { defaultPricing } from "@/lib/pricing/rules";

const DOC_ID = "default";

export async function GET(req: NextRequest) {
  try {
    await verifyAdminFromRequest(req);
    const doc = await adminDb.collection("pricingRules").doc(DOC_ID).get();
    return NextResponse.json({ rule: doc.exists ? doc.data() : defaultPricing });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await verifyAdminFromRequest(req);
    const payload = await req.json();
    await adminDb.collection("pricingRules").doc(DOC_ID).set(
      {
        ...payload,
        updatedAt: new Date().toISOString()
      },
      { merge: true }
    );
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
