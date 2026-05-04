import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Accordion } from "@/components/ui/accordion";
import { createMetadata } from "@/lib/seo/site";

const faqs = [
  ["How is fare calculated?", "Fare includes base, distance/time, toll estimates, taxes, and applicable surcharges."],
  ["Can I cancel a booking?", "Yes, cancellation terms are shown before payment confirmation."],
  ["Is driver verified?", "Yes, we assign verified and trained drivers."],
  ["Do you support WhatsApp updates?", "Yes, trip updates and support are available through WhatsApp and call support."],
  ["Can I book group travel?", "Yes, choose group travel and select tempo traveller, urbania, or minibus options."]
];

export const metadata: Metadata = createMetadata({
  title: "Cab Booking FAQs | Shanvi Travels",
  description: "Answers about Shanvi Travels fare calculation, cancellation terms, verified drivers, WhatsApp updates, and group travel.",
  path: "/faqs",
  keywords: ["cab booking FAQs", "outstation taxi support", "verified driver cab questions"]
});

export default function FaqsPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([title, content]) => ({
      "@type": "Question",
      name: title,
      acceptedAnswer: { "@type": "Answer", text: content }
    }))
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Card className="space-y-3">
        <h1 className="text-xl font-bold text-slate-950 dark:text-white">FAQs</h1>
        <Accordion items={faqs.map(([title, content]) => ({ title, content }))} />
      </Card>
    </div>
  );
}
