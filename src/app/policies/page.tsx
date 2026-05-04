import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { createMetadata } from "@/lib/seo/site";

export const metadata: Metadata = createMetadata({
  title: "Cab Booking Policies | Shanvi Travels Cancellation, Safety and Support",
  description:
    "Review Shanvi Travels cancellation, safety, verified driver, and 24x7 active trip support policies before booking a cab.",
  path: "/policies",
  keywords: ["cab cancellation policy", "verified driver policy", "taxi booking support policy"]
});

export default function PoliciesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <Card className="space-y-2">
        <h1 className="text-xl font-bold text-slate-950 dark:text-white">Policies</h1>
        <p className="text-sm text-slate-700 dark:text-slate-300">Cancellation policy: fair slab-based refunds depending on notice period.</p>
        <p className="text-sm text-slate-700 dark:text-slate-300">Safety policy: all rides are assigned to verified drivers only.</p>
        <p className="text-sm text-slate-700 dark:text-slate-300">Support policy: 24x7 support for active trips.</p>
      </Card>
    </div>
  );
}
