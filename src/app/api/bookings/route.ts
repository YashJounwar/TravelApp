import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/admin";
import { bookingSchema } from "@/lib/validation/schemas";

export async function POST(req: NextRequest) {
  const payload = await req.json();
  const parsed = bookingSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid booking payload" }, { status: 400 });
  }

  const now = new Date().toISOString();
  const booking = {
    ...parsed.data,
    status: "new",
    createdAt: now,
    updatedAt: now
  };
  const ref = await adminDb.collection("bookings").add(booking);
  return NextResponse.json({ id: ref.id, booking }, { status: 201 });
}
