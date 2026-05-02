import { z } from "zod";

export const tripTypeSchema = z.enum([
  "one-way-outstation",
  "round-trip",
  "local-hourly-rental",
  "airport-transfer",
  "group-travel"
]);

export const searchSchema = z.object({
  pickup: z.string().min(2),
  destination: z.string().min(2),
  date: z.string().min(4),
  time: z.string().min(3),
  tripType: tripTypeSchema,
  passengers: z.number().int().min(1).max(40)
});

export const bookingSchema = z.object({
  vehicleSlug: z.string().min(1),
  name: z.string().min(2),
  phone: z.string().min(8),
  email: z.string().email().optional().or(z.literal("")),
  pickupAddress: z.string().min(5),
  notes: z.string().optional()
});

export const callbackSchema = z.object({
  phone: z.string().min(8),
  context: z.string().optional()
});

export const vehicleSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(2),
  category: z.string().min(2),
  seats: z.number().int().min(1),
  luggage: z.number().int().min(0),
  baseFare: z.number().int().min(0),
  rating: z.number().min(0).max(5).default(4.5),
  reviewCount: z.number().int().min(0).default(0),
  image: z.string().url(),
  amenities: z.array(z.string()).default([]),
  verifiedDriver: z.boolean().default(true),
  active: z.boolean().default(true)
});
