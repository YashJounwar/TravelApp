import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { createMetadata } from "@/lib/seo/site";
import { supportContact } from "@/lib/support/knowledge";

export const metadata: Metadata = createMetadata({
  title: "Contact Shanvi Travels | Phone, WhatsApp and Email Support",
  description: "Contact Shanvi Travels for cab booking support, callback help, fare confirmation, pickup coordination, and active trip assistance.",
  path: "/contact",
  keywords: ["Shanvi Travels contact", "cab booking WhatsApp support", "taxi booking phone support"]
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <Card className="space-y-2">
        <h1 className="text-xl font-bold text-slate-950 dark:text-white">Contact us</h1>
        <p className="text-sm text-slate-700 dark:text-slate-300">Support: {supportContact.phone}</p>
        <p className="text-sm text-slate-700 dark:text-slate-300">WhatsApp: {supportContact.whatsapp}</p>
        <p className="text-sm text-slate-700 dark:text-slate-300">Email: {supportContact.email}</p>
      </Card>
    </div>
  );
}
