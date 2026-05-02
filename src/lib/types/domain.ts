export type TripType =
  | "one-way-outstation"
  | "round-trip"
  | "local-hourly-rental"
  | "airport-transfer"
  | "group-travel";

export type VehicleCategory =
  | "economy-sedan"
  | "comfort-sedan"
  | "suv-muv"
  | "premium-suv"
  | "tempo-traveller"
  | "luxury-car"
  | "urbania-premium-van"
  | "minibus";

export interface SearchQuery {
  pickup: string;
  destination: string;
  date: string;
  time: string;
  tripType: TripType;
  passengers: number;
}

export interface Vehicle {
  id: string;
  slug: string;
  name: string;
  category: VehicleCategory;
  seats: number;
  luggage: number;
  rating: number;
  reviewCount: number;
  baseFare: number;
  image: string;
  amenities: string[];
  verifiedDriver: boolean;
}

export interface FareBreakdown {
  baseFare: number;
  distanceCharge: number;
  timeCharge: number;
  tollsAndParking: number;
  nightCharge: number;
  surgeCharge: number;
  gst: number;
  total: number;
}
