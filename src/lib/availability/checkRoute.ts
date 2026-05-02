import { SearchQuery, Vehicle } from "@/lib/types/domain";

export function checkRouteAvailability(query: SearchQuery) {
  const hasRoute = Boolean(query.pickup && query.destination && query.pickup !== query.destination);
  return {
    available: hasRoute,
    reason: hasRoute ? null : "Selected route is not available at the moment."
  };
}

export function isVehicleEligible(vehicle: Vehicle, passengers: number) {
  return vehicle.seats >= passengers;
}
