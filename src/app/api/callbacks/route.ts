import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/admin";
import { callbackSchema } from "@/lib/validation/schemas";

export async function POST(req: NextRequest) {
  const payload = await req.json();
  const parsed = callbackSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid callback payload" }, { status: 400 });
  }

  const now = new Date().toISOString();
  const callback = {
    ...parsed.data,
    status: "pending",
    createdAt: now,
    updatedAt: now
  };
  const ref = await adminDb.collection("callbacks").add(callback);
  return NextResponse.json({ id: ref.id, callback }, { status: 201 });
}
