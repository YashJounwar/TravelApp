import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/admin";
import { verifyAdminFromRequest } from "@/lib/auth/admin";
import { vehicleSchema } from "@/lib/validation/schemas";

export async function GET(req: NextRequest) {
  try {
    await verifyAdminFromRequest(req);
    const snapshot = await adminDb.collection("vehicles").orderBy("name", "asc").get();
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
    const parsed = vehicleSchema.safeParse(payload);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid vehicle payload" }, { status: 400 });
    }
    const ref = await adminDb.collection("vehicles").add(parsed.data);
    return NextResponse.json({ id: ref.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await verifyAdminFromRequest(req);
    const payload = (await req.json()) as { id?: string; name?: string; baseFare?: number; active?: boolean };
    if (!payload.id) {
      return NextResponse.json({ error: "Vehicle id is required" }, { status: 400 });
    }
    await adminDb
      .collection("vehicles")
      .doc(payload.id)
      .set(
        {
          ...(payload.name !== undefined ? { name: payload.name } : {}),
          ...(payload.baseFare !== undefined ? { baseFare: payload.baseFare } : {}),
          ...(payload.active !== undefined ? { active: payload.active } : {}),
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
      return NextResponse.json({ error: "Vehicle id is required" }, { status: 400 });
    }
    await adminDb.collection("vehicles").doc(id).delete();
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
