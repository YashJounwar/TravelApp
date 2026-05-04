export interface SeoLandingPage {
  slug: string;
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  route?: {
    from: string;
    to: string;
    fare: string;
    time: string;
  };
  bullets: string[];
  faqs: Array<{ question: string; answer: string }>;
}

export const seoLandingPages: SeoLandingPage[] = [
  {
    slug: "delhi-to-jaipur-cab",
    title: "Delhi to Jaipur Cab Booking | Verified Outstation Taxi",
    description:
      "Book Delhi to Jaipur cabs with verified drivers, transparent fare estimates from INR 2,999, seating options, and 24x7 trip support.",
    h1: "Delhi to Jaipur cab booking",
    eyebrow: "Popular outstation route",
    primaryKeyword: "Delhi to Jaipur cab",
    secondaryKeywords: ["Delhi Jaipur taxi", "one way cab Delhi to Jaipur", "outstation cab to Jaipur"],
    route: { from: "Delhi", to: "Jaipur", fare: "from INR 2,999", time: "5 hr 10 min" },
    bullets: [
      "Choose sedans, SUVs/MUVs, or traveller vehicles based on passengers and luggage.",
      "Review estimated fare, seating, inclusions, and driver verification before booking.",
      "Support is available for pickup coordination, timing changes, and active trip issues."
    ],
    faqs: [
      {
        question: "Is the Delhi to Jaipur fare final?",
        answer:
          "The website fare is an estimate for comparison. Final confirmation may change for tolls, parking, extra stops, pickup requirements, or vehicle availability."
      },
      {
        question: "Can I book a family SUV for Delhi to Jaipur?",
        answer: "Yes. SUV/MUV options are suitable for families, luggage, and longer outstation routes."
      }
    ]
  },
  {
    slug: "delhi-to-agra-cab",
    title: "Delhi to Agra Taxi Booking | One Way Outstation Cab",
    description:
      "Compare Delhi to Agra taxi options with verified drivers, estimated fares from INR 2,499, clear inclusions, and support before pickup.",
    h1: "Delhi to Agra taxi booking",
    eyebrow: "Same-day and outstation travel",
    primaryKeyword: "Delhi to Agra taxi",
    secondaryKeywords: ["Delhi Agra cab", "one way cab Delhi to Agra", "Agra outstation taxi"],
    route: { from: "Delhi", to: "Agra", fare: "from INR 2,499", time: "3 hr 40 min" },
    bullets: [
      "Compare compact sedans and family vehicles with fare estimates before checkout.",
      "Use trip notes for hotel pickup, railway station pickup, luggage, and extra stops.",
      "Driver and vehicle details are shared before pickup after confirmation."
    ],
    faqs: [
      {
        question: "Do you show Delhi to Agra cab pricing before booking?",
        answer: "Yes. Shanvi Travels shows fare estimates before booking, with final operator confirmation after route validation."
      },
      {
        question: "Are Delhi to Agra drivers verified?",
        answer: "Yes. The safety policy states rides are assigned to verified drivers only."
      }
    ]
  },
  {
    slug: "airport-taxi-service",
    title: "Airport Taxi Service in India | Verified Pickup Cabs",
    description:
      "Book airport transfer cabs with pickup coordination, on-time checks, verified drivers, transparent fare estimates, and phone or WhatsApp support.",
    h1: "Airport taxi service with verified pickup support",
    eyebrow: "Flight and station transfers",
    primaryKeyword: "airport taxi service",
    secondaryKeywords: ["airport transfer cab", "airport pickup taxi", "verified airport cab"],
    bullets: [
      "Add flight number, terminal, gate, pickup time, and luggage needs in trip notes.",
      "Airport transfer pricing uses the relevant trip multiplier and route-specific validation.",
      "Operational checks support airport, station, and early morning pickups."
    ],
    faqs: [
      {
        question: "Can I add flight details to my airport booking?",
        answer: "Yes. The booking form accepts trip notes such as flight number, luggage, extra stops, and pickup details."
      },
      {
        question: "Is support available for airport pickup coordination?",
        answer: "Yes. Shanvi Travels provides phone and WhatsApp support for pickup coordination and active trip concerns."
      }
    ]
  },
  {
    slug: "tempo-traveller-booking",
    title: "Tempo Traveller Booking | Group Travel Cabs in India",
    description:
      "Book tempo traveller and group travel vehicles for weddings, corporate movement, families, and events with verified operators and clear fare estimates.",
    h1: "Tempo traveller booking for group travel",
    eyebrow: "Groups, events, and corporate movement",
    primaryKeyword: "tempo traveller booking",
    secondaryKeywords: ["group travel cab booking", "12 seater traveller booking", "minibus rental India"],
    bullets: [
      "Tempo Traveller 12-Seater options support larger groups and luggage needs.",
      "Group travel can also use Urbania, premium vans, or minibuses based on availability.",
      "Mention passenger count, luggage, route stops, and event timing for accurate coordination."
    ],
    faqs: [
      {
        question: "Can I book group travel from Shanvi Travels?",
        answer: "Yes. Choose group travel and select tempo traveller, Urbania, premium van, or minibus options where available."
      },
      {
        question: "What should I share for a group booking?",
        answer: "Share passenger count, luggage, pickup point, destination, extra stops, date, time, and any timing constraints."
      }
    ]
  },
  {
    slug: "local-hourly-cab-rental",
    title: "Local Hourly Cab Rental | City Car Rental with Driver",
    description:
      "Book local hourly rental cabs for city travel, business visits, errands, and flexible stops with driver verification and transparent estimates.",
    h1: "Local hourly cab rental",
    eyebrow: "Flexible city travel",
    primaryKeyword: "local hourly cab rental",
    secondaryKeywords: ["city cab rental with driver", "hourly taxi booking", "local car rental India"],
    bullets: [
      "Suitable for city errands, business visits, local sightseeing, and multiple stops.",
      "Hourly rental fare estimates consider time, route, and vehicle suitability.",
      "Support can help with timing, route changes, and luggage or accessibility needs."
    ],
    faqs: [
      {
        question: "Can I use hourly rental for multiple stops?",
        answer: "Yes. Local hourly rental is intended for flexible city travel. Add route stops in trip notes for confirmation."
      },
      {
        question: "Are hourly rental fares estimates?",
        answer: "Yes. Final confirmation may vary for time, parking, extra stops, and vehicle availability."
      }
    ]
  }
];

export function getSeoLandingPage(slug: string) {
  return seoLandingPages.find((page) => page.slug === slug);
}
