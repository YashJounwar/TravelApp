"use client";

import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, BadgeCheck, Briefcase, CarFront, CheckCircle2, Star, UsersRound } from "lucide-react";
import { ResultsFilters } from "@/components/search/results-filters";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { vehicleData, categoryLabels } from "@/lib/data/mock";
import { SearchQuery, Vehicle } from "@/lib/types/domain";

function SearchPageContent() {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState("");
  const [maxFare, setMaxFare] = useState(0);
  const [results, setResults] = useState<Array<Vehicle & { fare?: { total: number } }>>(vehicleData);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const pickup = searchParams.get("pickup") || "Pickup";
  const destination = searchParams.get("destination") || "Destination";
  const tripDate = searchParams.get("date") || "Flexible date";

  useEffect(() => {
    const payload: SearchQuery = {
      pickup: searchParams.get("pickup") || "",
      destination: searchParams.get("destination") || "",
      date: searchParams.get("date") || "",
      time: searchParams.get("time") || "",
      tripType: (searchParams.get("tripType") as SearchQuery["tripType"]) || "one-way-outstation",
      passengers: Number(searchParams.get("passengers") || 1)
    };

    if (!payload.pickup || !payload.destination) return;

    setLoading(true);
    setMessage("");
    fetch("/api/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(async (res) => {
        if (!res.ok) {
          setMessage("No vehicles available for this route/date.");
          return null;
        }
        return (await res.json()) as { vehicles: Array<Vehicle & { fare: { total: number } }> };
      })
      .then((data) => {
        if (data?.vehicles?.length) {
          setResults(data.vehicles);
        } else if (data?.vehicles && data.vehicles.length === 0) {
          setMessage("No matching vehicles found.");
          setResults([]);
        }
      })
      .catch(() => setMessage("Search failed. Please try again."))
      .finally(() => setLoading(false));
  }, [searchParams]);

  const filtered = useMemo(
    () =>
      results.filter(
        (vehicle) =>
          (!category || vehicle.category === category) &&
          (!maxFare || (vehicle.fare?.total ?? vehicle.baseFare) <= maxFare)
      ),
    [category, maxFare, results]
  );

  return (
    <div className="mx-auto max-w-6xl space-y-5 px-4 py-6">
      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-400">Available vehicles</p>
            <h1 className="mt-1 text-2xl font-bold text-slate-950 dark:text-white">
              {pickup} to {destination}
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              {tripDate} | Compare seats, luggage, rating, inclusions, and estimated fare before booking.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/">Modify search</Link>
          </Button>
        </div>
      </section>
      <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <ResultsFilters onCategoryChange={setCategory} onMaxFareChange={setMaxFare} />
          <Card className="mt-3 hidden p-4 lg:block">
            <p className="font-bold text-slate-950 dark:text-white">Booking confidence</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden="true" /> Verified driver assignment</li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden="true" /> Fare estimate before payment</li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden="true" /> Support for route changes</li>
            </ul>
          </Card>
        </aside>
        <section className="space-y-3">
          <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
            <p>{filtered.length} vehicle{filtered.length === 1 ? "" : "s"} found</p>
            {loading ? <p>Searching vehicles...</p> : null}
            {message ? <p>{message}</p> : null}
          </div>
          <div className="grid gap-3">
            {filtered.map((vehicle, index) => (
              <MotionReveal key={vehicle.id} delay={index * 0.03}>
                <Card className="overflow-hidden p-0 transition hover:-translate-y-0.5 hover:shadow-lg">
                  <div className="grid md:grid-cols-[220px_1fr_240px]">
                    <div className="relative min-h-48 bg-slate-200 md:min-h-full">
                      <img
                        src={`${vehicle.image}?auto=format&fit=crop&w=700&q=80`}
                        alt={vehicle.name}
                        className="h-full min-h-48 w-full object-cover"
                      />
                      <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2 py-1 text-xs font-bold text-slate-900 shadow-sm">
                        {categoryLabels[vehicle.category]}
                      </span>
                    </div>
                    <div className="p-4">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h2 className="text-lg font-bold text-slate-950 dark:text-white">{vehicle.name}</h2>
                          <p className="mt-1 flex items-center gap-1 text-sm text-slate-600 dark:text-slate-300">
                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                            {vehicle.rating} | {vehicle.reviewCount.toLocaleString("en-IN")} reviews
                          </p>
                        </div>
                        {vehicle.verifiedDriver ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
                            <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" /> Verified
                          </span>
                        ) : null}
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-slate-700 dark:text-slate-300 sm:grid-cols-3">
                        <span className="flex items-center gap-2 rounded-md bg-slate-50 p-2 dark:bg-slate-950">
                          <UsersRound className="h-4 w-4 text-blue-700" aria-hidden="true" /> {vehicle.seats} seats
                        </span>
                        <span className="flex items-center gap-2 rounded-md bg-slate-50 p-2 dark:bg-slate-950">
                          <Briefcase className="h-4 w-4 text-blue-700" aria-hidden="true" /> {vehicle.luggage} bags
                        </span>
                        <span className="flex items-center gap-2 rounded-md bg-slate-50 p-2 dark:bg-slate-950">
                          <CarFront className="h-4 w-4 text-blue-700" aria-hidden="true" /> AC cab
                        </span>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {vehicle.amenities.map((amenity) => (
                          <span key={amenity} className="rounded-full border border-slate-200 px-2 py-1 text-xs text-slate-600 dark:border-slate-700 dark:text-slate-300">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="border-t border-slate-200 bg-slate-50 p-4 md:border-l md:border-t-0 dark:border-slate-800 dark:bg-slate-950">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Estimated fare</p>
                      <p className="mt-1 text-2xl font-black text-slate-950 dark:text-white">
                        INR {(vehicle.fare?.total ?? vehicle.baseFare).toLocaleString("en-IN")}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">Includes estimated route pricing. Final confirmation follows operator validation.</p>
                      <div className="mt-4 grid gap-2">
                        <Button asChild>
                          <Link href={`/booking?vehicle=${vehicle.slug}`}>
                            Book now <ArrowRight className="h-4 w-4" aria-hidden="true" />
                          </Link>
                        </Button>
                        <Button variant="outline" asChild>
                          <Link href={`/vehicle/${vehicle.slug}`}>View details</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </MotionReveal>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<Card>Loading search...</Card>}>
      <SearchPageContent />
    </Suspense>
  );
}
