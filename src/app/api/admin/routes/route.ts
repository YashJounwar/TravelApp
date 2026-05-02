import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/admin";
import { verifyAdminFromRequest } from "@/lib/auth/admin";

export async function GET(req: NextRequest) {
  try {
    await verifyAdminFromRequest(req);
    const snapshot = await adminDb.collection("routes").orderBy("fromCity", "asc").limit(200).get();
    const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await verifyAdminFromRequest(req);
    const payload = await req.json();
    if (!payload.fromCity || !payload.toCity || !payload.tripType) {
      return NextResponse.json({ error: "fromCity, toCity, and tripType are required" }, { status: 400 });
    }
    const ref = await adminDb.collection("routes").add({
      ...payload,
      active: payload.active ?? true,
      createdAt: new Date().toISOString()
    });
    return NextResponse.json({ id: ref.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await verifyAdminFromRequest(req);
    const payload = (await req.json()) as { id?: string; active?: boolean; tripType?: string };
    if (!payload.id) {
      return NextResponse.json({ error: "Route id is required" }, { status: 400 });
    }
    await adminDb
      .collection("routes")
      .doc(payload.id)
      .set(
        {
          ...(payload.active !== undefined ? { active: payload.active } : {}),
          ...(payload.tripType ? { tripType: payload.tripType } : {}),
          updatedAt: new Date().toISOString()
        },
        { merge: true }
      );
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await verifyAdminFromRequest(req);
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Route id is required" }, { status: 400 });
    }
    await adminDb.collection("routes").doc(id).delete();
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
