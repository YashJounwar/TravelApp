import { Vehicle, VehicleCategory } from "@/lib/types/domain";

export const categoryLabels: Record<VehicleCategory, string> = {
  "economy-sedan": "Economy Sedan",
  "comfort-sedan": "Comfort Sedan",
  "suv-muv": "SUV / MUV",
  "premium-suv": "Premium SUV",
  "tempo-traveller": "Tempo Traveller",
  "luxury-car": "Luxury Car",
  "urbania-premium-van": "Urbania / Premium Van",
  minibus: "Minibus"
};

export const vehicleData: Vehicle[] = [
  {
    id: "v1",
    slug: "swift-dzire",
    name: "Swift Dzire",
    category: "economy-sedan",
    seats: 4,
    luggage: 2,
    rating: 4.7,
    reviewCount: 847,
    baseFare: 2500,
    image: "https://images.unsplash.com/photo-1550355291-bbee04a92027",
    amenities: ["AC", "Music", "Bottle Water"],
    verifiedDriver: true
  },
  {
    id: "v2",
    slug: "ertiga",
    name: "Maruti Ertiga",
    category: "suv-muv",
    seats: 6,
    luggage: 4,
    rating: 4.8,
    reviewCount: 502,
    baseFare: 3600,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
    amenities: ["AC", "Charging Port", "Spacious Cabin"],
    verifiedDriver: true
  },
  {
    id: "v3",
    slug: "tempo-traveller-12",
    name: "Tempo Traveller 12-Seater",
    category: "tempo-traveller",
    seats: 12,
    luggage: 10,
    rating: 4.9,
    reviewCount: 211,
    baseFare: 7400,
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b",
    amenities: ["Pushback Seats", "AC", "Large Luggage Space"],
    verifiedDriver: true
  }
];
