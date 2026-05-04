import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { createMetadata } from "@/lib/seo/site";

export const metadata: Metadata = createMetadata({
  title: "About Shanvi Travels | Verified Cab Booking Across India",
  description:
    "Learn about Shanvi Travels, an India cab booking service focused on transparent pricing, verified drivers, and customer-first trip support.",
  path: "/about",
  keywords: ["about Shanvi Travels", "verified cab booking India", "transparent taxi fare"]
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <Card className="space-y-2">
        <h1 className="text-xl font-bold text-slate-950 dark:text-white">About Shanvi Travels</h1>
        <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">
          We provide reliable intercity and local travel across India with transparent pricing, verified drivers, and
          customer-first support.
        </p>
      </Card>
    </div>
  );
}
