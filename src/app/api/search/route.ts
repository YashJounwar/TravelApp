import { NextRequest, NextResponse } from "next/server";
import { vehicleData } from "@/lib/data/mock";
import { calculateFare } from "@/lib/pricing/calculateFare";
import { checkRouteAvailability, isVehicleEligible } from "@/lib/availability/checkRoute";
import { SearchQuery, Vehicle } from "@/lib/types/domain";
import { adminDb } from "@/lib/firebase/admin";
import { searchSchema } from "@/lib/validation/schemas";

export async function POST(req: NextRequest) {
  const payload = await req.json();
  const parsed = searchSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid search payload" }, { status: 400 });
  }
  const query = parsed.data as SearchQuery;
  const route = checkRouteAvailability(query);
  if (!route.available) {
    return NextResponse.json({ error: route.reason }, { status: 400 });
  }

  let vehiclesSource: Vehicle[] = vehicleData;
  try {
    const snapshot = await adminDb.collection("vehicles").where("active", "==", true).get();
    if (!snapshot.empty) {
      vehiclesSource = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Vehicle, "id">)
      }));
    }
  } catch {
    // fallback to seeded mock data if Firestore is unavailable
  }

  const vehicles = vehiclesSource
    .filter((v) => isVehicleEligible(v, query.passengers))
    .map((v) => ({ ...v, fare: calculateFare(query, v) }));

  return NextResponse.json({ vehicles });
}
