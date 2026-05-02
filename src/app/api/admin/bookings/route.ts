import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/admin";
import { verifyAdminFromRequest } from "@/lib/auth/admin";

export async function GET(req: NextRequest) {
  try {
    await verifyAdminFromRequest(req);
    const snapshot = await adminDb.collection("bookings").orderBy("createdAt", "desc").limit(100).get();
    const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await verifyAdminFromRequest(req);
    const payload = (await req.json()) as {
      id?: string;
      status?: string;
      driverId?: string;
    };
    if (!payload.id) {
      return NextResponse.json({ error: "Missing booking id" }, { status: 400 });
    }
    await adminDb
      .collection("bookings")
      .doc(payload.id)
      .set(
        {
          ...(payload.status ? { status: payload.status } : {}),
          ...(payload.driverId ? { driverId: payload.driverId } : {}),
          updatedAt: new Date().toISOString()
        },
        { merge: true }
      );
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
