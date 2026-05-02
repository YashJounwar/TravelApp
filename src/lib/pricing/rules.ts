import { TripType } from "@/lib/types/domain";

export const tripMultipliers: Record<TripType, number> = {
  "one-way-outstation": 1,
  "round-trip": 1.8,
  "local-hourly-rental": 0.9,
  "airport-transfer": 0.85,
  "group-travel": 1.4
};

export const defaultPricing = {
  perKm: 14,
  perHour: 350,
  gstRate: 0.05,
  tollParkingRate: 0.08,
  nightRate: 0.1,
  surgeRate: 0.12
};
