import type { Metadata } from "next";
import { supportContact } from "@/lib/support/knowledge";

export const siteConfig = {
  name: "Shanvi Travels",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://shanvitravels.in",
  description:
    "Book verified cabs for outstation trips, airport transfers, local hourly rentals, and group travel across India with transparent fare estimates and 24x7 support.",
  keywords: [
    "outstation cab booking India",
    "one way cab booking",
    "airport taxi service",
    "local hourly cab rental",
    "tempo traveller booking",
    "Delhi to Jaipur cab",
    "Delhi to Agra taxi",
    "Gurugram to Chandigarh cab",
    "Delhi to Dehradun cab",
    "verified driver cab",
    "transparent cab fare",
    "group travel cab booking"
  ]
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export function createMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  keywords = []
}: {
  title: string;
  description?: string;
  path?: string;
  keywords?: string[];
}): Metadata {
  return {
    title,
    description,
    keywords: [...siteConfig.keywords, ...keywords],
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
      siteName: siteConfig.name,
      locale: "en_IN",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
    }
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "@id": `${siteConfig.url}/#organization`,
  name: siteConfig.name,
  url: siteConfig.url,
  email: supportContact.email,
  telephone: supportContact.phone,
  areaServed: "India",
  description: siteConfig.description,
  sameAs: []
};

export const taxiServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "TaxiService",
  "@id": `${siteConfig.url}/#taxi-service`,
  name: "Shanvi Travels cab booking service",
  provider: { "@id": `${siteConfig.url}/#organization` },
  areaServed: "India",
  serviceType: ["Outstation cab booking", "Airport taxi service", "Local hourly rental", "Group travel vehicle booking"],
  availableChannel: {
    "@type": "ServiceChannel",
    servicePhone: {
      "@type": "ContactPoint",
      telephone: supportContact.phone,
      contactType: "customer support",
      availableLanguage: ["English", "Hindi"]
    },
    serviceUrl: absoluteUrl("/")
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "10000"
  }
};
