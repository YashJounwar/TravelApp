"use client";

import { useRouter } from "next/navigation";
import { CalendarDays, Clock3, MapPin, Search, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

const tripTypes = [
  { value: "one-way-outstation", label: "One way" },
  { value: "round-trip", label: "Round trip" },
  { value: "local-hourly-rental", label: "Hourly rental" },
  { value: "airport-transfer", label: "Airport" },
  { value: "group-travel", label: "Group" }
];

const popularCities = ["Delhi", "Jaipur", "Agra", "Noida", "Gurugram", "Chandigarh", "Dehradun", "Manali"];

export function SearchForm() {
  const router = useRouter();

  function onSubmit(formData: FormData) {
    const params = new URLSearchParams({
      pickup: String(formData.get("pickup") || ""),
      destination: String(formData.get("destination") || ""),
      date: String(formData.get("date") || ""),
      time: String(formData.get("time") || ""),
      tripType: String(formData.get("tripType") || "one-way-outstation"),
      passengers: String(formData.get("passengers") || "1")
    });
    router.push(`/search?${params.toString()}`);
  }

  return (
    <Card className="w-full border-0 bg-white/95 p-4 shadow-xl shadow-slate-950/20 dark:bg-slate-950/95 sm:p-5">
      <div className="mb-4 flex flex-wrap gap-2 text-xs">
        <span className="rounded-full bg-blue-50 px-3 py-1 font-semibold text-blue-700">10k+ completed rides</span>
        <span className="rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-700">Fare before checkout</span>
        <span className="rounded-full bg-amber-50 px-3 py-1 font-semibold text-amber-700">Callback support</span>
      </div>
      <form action={onSubmit} className="grid gap-3 md:grid-cols-6">
        <fieldset className="md:col-span-6">
          <legend className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Trip type</legend>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
            {tripTypes.map((type) => (
              <label key={type.value} className="cursor-pointer">
                <input
                  className="peer sr-only"
                  type="radio"
                  name="tripType"
                  value={type.value}
                  defaultChecked={type.value === "one-way-outstation"}
                />
                <span className="flex h-10 items-center justify-center rounded-md border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-700 transition peer-checked:border-blue-700 peer-checked:bg-blue-700 peer-checked:text-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
                  {type.label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="md:col-span-2">
          <label htmlFor="pickup" className="mb-1 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> Pickup
          </label>
          <Input id="pickup" name="pickup" placeholder="City or pickup location" list="shanvi-cities" required />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="destination" className="mb-1 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> Destination
          </label>
          <Input id="destination" name="destination" placeholder="Where are you going?" list="shanvi-cities" required />
        </div>
        <div>
          <label htmlFor="date" className="mb-1 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" /> Date
          </label>
          <Input id="date" name="date" type="date" required />
        </div>
        <div>
          <label htmlFor="time" className="mb-1 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <Clock3 className="h-3.5 w-3.5" aria-hidden="true" /> Time
          </label>
          <Input id="time" name="time" type="time" required />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="passengers" className="mb-1 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <UsersRound className="h-3.5 w-3.5" aria-hidden="true" /> Passengers
          </label>
          <Select id="passengers" name="passengers" defaultValue="2">
            <option value="1">1 passenger</option>
            <option value="2">2 passengers</option>
            <option value="3">3 passengers</option>
            <option value="4">4 passengers</option>
            <option value="6">5-6 passengers</option>
            <option value="12">7-12 passengers</option>
            <option value="20">13+ passengers</option>
          </Select>
        </div>
        <div className="md:col-span-4 md:self-end">
          <Button className="h-11 w-full" size="lg">
            <Search className="h-5 w-5" aria-hidden="true" />
            Search vehicles
          </Button>
        </div>
        <datalist id="shanvi-cities">
          {popularCities.map((city) => (
            <option key={city} value={city} />
          ))}
        </datalist>
      </form>
    </Card>
  );
}
