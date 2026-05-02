import { BadgeCheck, Clock3, CreditCard, Headphones, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";

export function TrustSignals() {
  const items = [
    { icon: BadgeCheck, title: "4.8 average rating", text: "Review-backed service quality across intercity and local rides." },
    { icon: ShieldCheck, title: "Verified drivers", text: "Assigned driver and vehicle details before pickup." },
    { icon: CreditCard, title: "Clear fares", text: "Fare estimate, inclusions, and taxes shown before booking." },
    { icon: Clock3, title: "On-time pickups", text: "Operational checks for airport, station, and early morning trips." },
    { icon: Headphones, title: "24x7 help", text: "Phone and WhatsApp support: +91-90000-00000." }
  ];

  return (
    <Card className="border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-400">Why book with us</p>
          <h3 className="text-xl font-bold text-slate-950 dark:text-white">Built for trips where reliability matters</h3>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300">No surprise handoffs, unclear fare math, or hard-to-reach support.</p>
      </div>
      <ul className="grid gap-3 text-sm text-slate-700 md:grid-cols-5 dark:text-slate-300">
        {items.map((item) => (
          <li key={item.title} className="rounded-md border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950">
            <item.icon className="mb-3 h-5 w-5 text-emerald-600" aria-hidden="true" />
            <p className="font-semibold text-slate-950 dark:text-white">{item.title}</p>
            <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">{item.text}</p>
          </li>
        ))}
      </ul>
    </Card>
  );
}
