import { SearchQuery, FareBreakdown, Vehicle } from "@/lib/types/domain";
import { defaultPricing, tripMultipliers } from "./rules";

export function calculateFare(
  query: SearchQuery,
  vehicle: Vehicle,
  estimatedKm = 140,
  estimatedHours = 4
): FareBreakdown {
  const tripMultiplier = tripMultipliers[query.tripType];
  const baseFare = Math.round(vehicle.baseFare * tripMultiplier);
  const distanceCharge = Math.round(estimatedKm * defaultPricing.perKm * tripMultiplier);
  const timeCharge = Math.round(estimatedHours * defaultPricing.perHour);
  const tollsAndParking = Math.round((baseFare + distanceCharge) * defaultPricing.tollParkingRate);
  const nightCharge = query.time >= "22:00" || query.time <= "05:00" ? Math.round(baseFare * defaultPricing.nightRate) : 0;
  const surgeCharge = query.passengers > 6 ? Math.round(baseFare * defaultPricing.surgeRate) : 0;
  const subtotal = baseFare + distanceCharge + timeCharge + tollsAndParking + nightCharge + surgeCharge;
  const gst = Math.round(subtotal * defaultPricing.gstRate);
  const total = subtotal + gst;

  return { baseFare, distanceCharge, timeCharge, tollsAndParking, nightCharge, surgeCharge, gst, total };
}
