"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BadgeCheck, CalendarCheck2, CheckCircle2, Headphones, Phone, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics/events";

function BookingPageContent() {
  const router = useRouter();
  const params = useSearchParams();
  const vehicle = params.get("vehicle") ?? "selected-vehicle";
  const [submitting, setSubmitting] = useState(false);
  const [requestingCallback, setRequestingCallback] = useState(false);
  const [message, setMessage] = useState("");
  const vehicleName = vehicle
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  async function onSubmit(formData: FormData) {
    setSubmitting(true);
    setMessage("");
    const phone = String(formData.get("phone") || "");
    const payload = {
      vehicleSlug: vehicle,
      name: String(formData.get("name") || ""),
      phone,
      email: String(formData.get("email") || ""),
      pickupAddress: String(formData.get("pickupAddress") || ""),
      notes: String(formData.get("notes") || "")
    };
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        setMessage("Booking failed. Please verify details and try again.");
        return;
      }
      trackEvent("booking_submitted", { vehicle, phone });
      router.push("/booking/success");
    } catch {
      setMessage("Booking failed. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function requestCallback(formData: FormData) {
    setRequestingCallback(true);
    setMessage("");
    const phone = String(formData.get("phone") || "");
    try {
      const res = await fetch("/api/callbacks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, context: `booking:${vehicle}` })
      });
      if (!res.ok) {
        setMessage("Callback request failed. Please try again.");
        return;
      }
      trackEvent("callback_requested", { vehicle, phone });
      router.push("/booking/success?type=callback");
    } catch {
      setMessage("Callback request failed. Please check your connection and try again.");
    } finally {
      setRequestingCallback(false);
    }
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-5 px-4 py-6 lg:grid-cols-[1fr_360px]">
      <Card className="space-y-5 p-5">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-400">Secure booking</p>
          <h1 className="mt-1 text-2xl font-black text-slate-950 dark:text-white">Confirm passenger and pickup details</h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Selected vehicle: {vehicleName}</p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-700">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" /> Protected request
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 font-semibold text-blue-700">
              <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" /> Fare confirmation
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 font-semibold text-amber-700">
              <Headphones className="h-3.5 w-3.5" aria-hidden="true" /> Human support
            </span>
          </div>
        </div>
        <form action={onSubmit} className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Full name</label>
            <Input id="name" name="name" placeholder="Passenger name" autoComplete="name" required />
          </div>
          <div>
            <label htmlFor="phone" className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Phone number</label>
            <Input id="phone" name="phone" type="tel" placeholder="+91 mobile number" autoComplete="tel" required />
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Email</label>
            <Input id="email" name="email" type="email" placeholder="Email for receipt" autoComplete="email" />
          </div>
          <div>
            <label htmlFor="pickupAddress" className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Exact pickup address</label>
            <Input id="pickupAddress" name="pickupAddress" placeholder="House, hotel, airport gate, or landmark" required />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="notes" className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Trip notes</label>
            <textarea
              id="notes"
              name="notes"
              placeholder="Flight/train number, luggage, extra stops, child seat, or accessibility needs"
              rows={4}
              className={cn(
                "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-brand transition placeholder:text-slate-400 focus:border-brand focus:ring-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
              )}
            />
          </div>
          <div className="md:col-span-2">
            <Button className="w-full" size="lg" disabled={submitting}>
              <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
              {submitting ? "Submitting..." : "Confirm booking request"}
            </Button>
          </div>
        </form>
        {message ? <p className="rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-800">{message}</p> : null}
        <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
          By confirming, you agree to fare and cancellation policies. Your booking request is reviewed before final dispatch confirmation.
        </p>
      </Card>

      <aside className="space-y-4">
        <Card className="p-5">
          <p className="font-bold text-slate-950 dark:text-white">What happens next</p>
          <ol className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <li className="flex gap-3">
              <CalendarCheck2 className="h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />
              <span>We validate vehicle availability and fare details for your exact pickup.</span>
            </li>
            <li className="flex gap-3">
              <Phone className="h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />
              <span>You receive confirmation and driver coordination details.</span>
            </li>
            <li className="flex gap-3">
              <ShieldCheck className="h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />
              <span>Support remains available for timing, route, or luggage changes.</span>
            </li>
          </ol>
        </Card>
        <Card className="p-5">
          <p className="font-bold text-slate-950 dark:text-white">Need help choosing?</p>
          <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">Share your phone number and our team can recommend the right vehicle for passengers, bags, and route conditions.</p>
          <form action={requestCallback} className="mt-4 grid gap-2">
            <Input name="phone" type="tel" placeholder="Phone for callback" required />
            <Button variant="outline" disabled={requestingCallback}>
              <Headphones className="h-4 w-4" aria-hidden="true" />
              {requestingCallback ? "Requesting..." : "Request callback"}
            </Button>
          </form>
        </Card>
      </aside>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<Card>Loading booking form...</Card>}>
      <BookingPageContent />
    </Suspense>
  );
}
