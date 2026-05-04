import { categoryLabels, vehicleData } from "@/lib/data/mock";
import { defaultPricing, tripMultipliers } from "@/lib/pricing/rules";

export const supportContact = {
  phone: "+91-90000-00000",
  whatsapp: "+91-90000-00000",
  email: "support@shanvitravels.in"
};

const popularRoutes = [
  { route: "Delhi to Jaipur", fare: "from INR 2,999", time: "5 hr 10 min" },
  { route: "Delhi to Agra", fare: "from INR 2,499", time: "3 hr 40 min" },
  { route: "Gurugram to Chandigarh", fare: "from INR 3,699", time: "4 hr 35 min" },
  { route: "Delhi to Dehradun", fare: "from INR 4,199", time: "5 hr 50 min" }
];

const tripTypes = [
  "one-way outstation",
  "round trip",
  "local hourly rental",
  "airport transfer",
  "group travel"
];

const vehicleSummary = vehicleData
  .map(
    (vehicle) =>
      `${vehicle.name}: ${categoryLabels[vehicle.category]}, ${vehicle.seats} seats, ${vehicle.luggage} bags, base fare INR ${vehicle.baseFare.toLocaleString(
        "en-IN"
      )}, rating ${vehicle.rating} from ${vehicle.reviewCount.toLocaleString("en-IN")} reviews, amenities ${vehicle.amenities.join(
        ", "
      )}, verified driver ${vehicle.verifiedDriver ? "yes" : "no"}`
  )
  .join("\n");

const routeSummary = popularRoutes.map((route) => `${route.route}: ${route.fare}, about ${route.time}`).join("\n");

function hasAny(text: string, words: string[]) {
  return words.some((word) => text.includes(word));
}

function contactLine() {
  return `For direct confirmation, please contact Shanvi Travels at ${supportContact.phone}, WhatsApp ${supportContact.whatsapp}, or ${supportContact.email}.`;
}

export function getLocalSupportReply(messages: Array<{ role: "user" | "assistant"; content: string }>, context?: { path?: string }) {
  const latestMessage = messages
    .filter((message) => message.role === "user")
    .at(-1)
    ?.content.trim();

  if (!latestMessage) {
    return `Namaste. I can assist you with Shanvi Travels bookings, fares, vehicle options, cancellation terms, driver verification, and support contacts. ${contactLine()}`;
  }

  const text = latestMessage.toLowerCase();
  const path = context?.path || "";

  if (path.startsWith("/vehicle/") && hasAny(text, ["this", "vehicle", "car", "cab", "book", "fare", "seat", "luggage"])) {
    return "You are viewing a vehicle detail page. Please review the displayed seats, luggage capacity, amenities, verified driver status, and estimated fare before selecting “Book this vehicle”.\n\nThe displayed fare is for comparison and final operator confirmation may vary for tolls, parking, route-specific changes, extra stops, and exact pickup requirements.";
  }

  if (path.startsWith("/booking") && hasAny(text, ["help", "note", "fill", "booking", "phone", "pickup", "flight", "luggage"])) {
    return "On the booking page, please enter the passenger name, phone number, email if available, exact pickup address, and useful trip notes. Trip notes can include flight or train number, luggage, extra stops, child seat, accessibility needs, or pickup landmarks.\n\nAfter submission, Shanvi Travels reviews the request, validates vehicle availability and fare details, and then shares confirmation and driver coordination details.";
  }

  if (hasAny(text, ["hi", "hello", "hey", "namaste"])) {
    return "Namaste. Thank you for contacting Shanvi Travels. I can assist you with bookings, fare estimates, vehicle selection, cancellation terms, safety checks, and support contact details based on the official website information.";
  }

  if (hasAny(text, ["cancel", "cancellation", "refund"])) {
    return "Shanvi Travels follows a fair slab-based cancellation and refund policy depending on the notice period. The exact cancellation terms are shown before payment confirmation.\n\nIf you already have an active or confirmed booking, please contact phone or WhatsApp support so the team can check the booking status and applicable refund slab.";
  }

  if (hasAny(text, ["fare", "price", "cost", "charge", "pricing", "estimate", "gst", "tax", "toll", "surge"])) {
    return `Fare estimates include base fare, distance or time charges, toll estimates, taxes, and applicable surcharges. The current application rules use INR ${defaultPricing.perKm}/km, INR ${defaultPricing.perHour}/hour, GST ${
      defaultPricing.gstRate * 100
    }%, toll and parking estimate ${defaultPricing.tollParkingRate * 100}%, night charge ${defaultPricing.nightRate * 100}%, and surge charge ${
      defaultPricing.surgeRate * 100
    }%.\n\nPlease treat website fares as estimates for comparison. Final operator confirmation may vary for route-specific tolls, parking, extra stops, exact pickup requirements, and vehicle availability.`;
  }

  if (hasAny(text, ["recommend", "suggest", "which", "choose", "best", "family", "kids", "senior", "business"])) {
    return "For 1-4 passengers with light luggage, a sedan is usually the most efficient choice. For families, senior passengers, or extra luggage, an SUV/MUV is more comfortable. For 7 or more passengers, group movement, weddings, or corporate travel, a tempo traveller, Urbania, premium van, or minibus should be considered.\n\nPlease compare seats, luggage capacity, amenities, rating, and estimated fare before booking. If the route involves hills, airport timing, or multiple stops, mention those details in trip notes for operator validation.";
  }

  if (hasAny(text, ["vehicle", "car", "cab", "fleet", "seat", "seats", "luggage", "bag", "sedan", "suv", "traveller", "tempo", "minibus", "urbania"])) {
    return `Shanvi Travels supports sedans, SUVs/MUVs, traveller vans, Urbania or premium vans, minibuses, and luxury cars. Current public sample vehicles include Swift Dzire with 4 seats and 2 bags, Maruti Ertiga with 6 seats and 4 bags, and Tempo Traveller 12-Seater with 12 seats and 10 bags.\n\nFor solo, couple, or business travel, a sedan is usually suitable. For families or more luggage, an SUV/MUV is more appropriate. For groups, weddings, or corporate movement, a tempo traveller, Urbania, or minibus should be considered.`;
  }

  if (hasAny(text, ["driver", "safe", "safety", "verified", "verification", "operator", "trust"])) {
    return "Safety is handled through verified driver assignment and driver and vehicle checks before trips. The website states that assigned driver and vehicle details are shared before pickup, and all rides are assigned to verified drivers only.\n\nFor any safety-sensitive or active trip concern, please contact Shanvi Travels immediately by phone or WhatsApp support.";
  }

  if (hasAny(text, ["book", "booking", "confirm", "payment", "dispatch", "pickup", "drop", "trip"])) {
    return "To book, the customer searches by pickup, destination, date, time, trip type, and passengers, then compares vehicle options, seating, luggage capacity, rating, inclusions, and estimated fare before submitting the booking request.\n\nAfter submission, Shanvi Travels reviews the request, validates vehicle availability and fare details for the exact pickup, and then shares confirmation and driver coordination details. Support remains available for timing, route, luggage changes, delays, and pickup coordination.";
  }

  if (hasAny(text, ["support", "contact", "phone", "whatsapp", "email", "call", "help", "urgent"])) {
    return `Shanvi Travels provides 24x7 support for active trips. You may contact phone support at ${supportContact.phone}, WhatsApp support at ${supportContact.whatsapp}, or email ${supportContact.email}.\n\nFor urgent active trip issues, phone or WhatsApp support is the fastest option.`;
  }

  if (hasAny(text, ["route", "delhi", "jaipur", "agra", "gurugram", "chandigarh", "dehradun", "manali", "noida", "city", "cities"])) {
    return `The website currently highlights routes such as Delhi to Jaipur from INR 2,999, Delhi to Agra from INR 2,499, Gurugram to Chandigarh from INR 3,699, and Delhi to Dehradun from INR 4,199. Popular city inputs shown include Delhi, Jaipur, Agra, Noida, Gurugram, Chandigarh, Dehradun, and Manali.\n\nRoute availability depends on the pickup, destination, travel date, time, passengers, and selected trip type. Final vehicle and fare confirmation is completed after operator validation.`;
  }

  if (hasAny(text, ["discount", "coupon", "offer", "deal", "promo"])) {
    return `The current website information does not list a public coupon or promotional discount. Shanvi Travels focuses on transparent fare estimates, verified driver assignment, and clear operator confirmation.\n\nFor any active offer or negotiated group quote, please contact support at ${supportContact.phone} or WhatsApp ${supportContact.whatsapp}.`;
  }

  if (hasAny(text, ["repeat", "again", "next time", "save", "fast"])) {
    return "For a faster repeat booking, use the same route, date, passenger count, preferred vehicle type, and trip notes when searching again. Popular route and service pages on the website keep important fare, policy, and booking details together for quick comparison.\n\nFor time-sensitive repeat trips, phone or WhatsApp support can also help confirm availability and coordination details.";
  }

  if (hasAny(text, ["airport", "outstation", "round", "local", "hourly", "group", "travel type"])) {
    return "Shanvi Travels supports one-way outstation trips, round trips, local hourly rentals, airport transfers, and group travel. The correct trip type should be selected while searching because pricing and vehicle suitability can change by trip type.\n\nFor airport, station, early morning, family, hill station, wedding, or corporate movement, please include timing, luggage, extra stops, and passenger count while booking so the team can validate the correct vehicle.";
  }

  return `I can answer only from the verified Shanvi Travels website information. Shanvi Travels provides India cab booking for outstation, airport transfer, local hourly rental, and group travel, with verified drivers, transparent fare estimates, clear policies, and 24x7 active trip support.\n\nPlease ask about fares, vehicle selection, booking flow, cancellation, safety, routes, or support contacts. ${contactLine()}`;
}

export const shanviSupportKnowledge = `
Company:
Shanvi Travels is an India cab booking service for outstation, airport transfer, local hourly rental, and group travel. The website positions the service around verified drivers, transparent fares, realistic fare estimates, clear policies, and 24x7 trip support.

Service facts:
- Supported trip types: ${tripTypes.join(", ")}.
- Popular cities shown on the website: Delhi, Jaipur, Agra, Noida, Gurugram, Chandigarh, Dehradun, Manali.
- Fleet options include sedans, SUVs/MUVs, traveller vans, Urbania/premium vans, minibuses, and luxury cars. Current public sample vehicles are:
${vehicleSummary}

Popular route examples:
${routeSummary}

Pricing and fare facts:
- Fare estimates include base fare, distance/time charges, toll estimates, taxes, and applicable surcharges.
- Default pricing rules in the application are INR ${defaultPricing.perKm}/km, INR ${defaultPricing.perHour}/hour, GST ${
  defaultPricing.gstRate * 100
}%, toll and parking estimate ${defaultPricing.tollParkingRate * 100}%, night charge ${defaultPricing.nightRate * 100}%, and surge charge ${
  defaultPricing.surgeRate * 100
}%.
- Trip multipliers are one-way outstation ${tripMultipliers["one-way-outstation"]}, round trip ${tripMultipliers["round-trip"]}, local hourly rental ${
  tripMultipliers["local-hourly-rental"]
}, airport transfer ${tripMultipliers["airport-transfer"]}, and group travel ${tripMultipliers["group-travel"]}.
- Fares shown by the website are estimates for comparison. Final operator confirmation can adjust route-specific tolls, parking, extra stops, vehicle availability, or exact pickup requirements.

Booking flow:
- Customers search by pickup, destination, date, time, trip type, and passengers.
- Customers compare seats, luggage capacity, rating, inclusions, and estimated fare before booking.
- A booking request is reviewed before final dispatch confirmation.
- Shanvi Travels validates vehicle availability and fare details for the exact pickup, then shares confirmation and driver coordination details.
- Support remains available for timing, route, luggage changes, delays, pickup coordination, and active trip issues.

Policies:
- Cancellation policy: fair slab-based refunds depending on notice period. Cancellation terms are shown before payment confirmation.
- Safety policy: rides are assigned to verified drivers only, with driver and vehicle checks before trips.
- Support policy: 24x7 support for active trips.

Support contacts:
- Phone: ${supportContact.phone}
- WhatsApp: ${supportContact.whatsapp}
- Email: ${supportContact.email}

Trust facts:
- Website states 10k+ completed trips, 4.8 average rating, verified drivers, clear fares, on-time pickup checks, and phone/WhatsApp support.
`.trim();

export function getSupportSystemPrompt() {
  return `
You are the official AI customer support assistant for Shanvi Travels.

Tone and conduct:
- Reply in a very formal, respectful, genuine, and concise customer-support style.
- Be helpful without sounding casual or exaggerated.
- Do not invent policies, prices, service coverage, confirmations, or guarantees.
- Base every factual answer on the Shanvi Travels knowledge below and the customer's current conversation.
- If the information is not present in the knowledge, say that Shanvi Travels support can confirm it and share the phone/WhatsApp/email contact.
- Make clear that website fares are estimates and final confirmation may vary for tolls, parking, route changes, extra stops, and vehicle availability.
- Do not collect sensitive payment details, government IDs, or passwords in chat.
- For urgent active trip issues, direct the customer to phone or WhatsApp support.
- When the customer is comparing options, guide them toward the next useful website step: search vehicles, review fare and seating, submit a booking request, or request support.
- Keep answers to 2-5 short paragraphs unless the customer asks for a detailed comparison.

Shanvi Travels knowledge:
${shanviSupportKnowledge}
`.trim();
}
