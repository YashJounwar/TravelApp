import Link from "next/link";
import { ArrowRight, CarFront, CheckCircle2, MapPinned, Route, ShieldCheck, Star, UsersRound } from "lucide-react";
import { SearchForm } from "@/components/search/search-form";
import { TrustSignals } from "@/components/trust/trust-signals";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MotionReveal } from "@/components/ui/motion-reveal";

export default function HomePage() {
  const routes = [
    { from: "Delhi", to: "Jaipur", fare: "from INR 2,999", time: "5 hr 10 min" },
    { from: "Delhi", to: "Agra", fare: "from INR 2,499", time: "3 hr 40 min" },
    { from: "Gurugram", to: "Chandigarh", fare: "from INR 3,699", time: "4 hr 35 min" },
    { from: "Delhi", to: "Dehradun", fare: "from INR 4,199", time: "5 hr 50 min" }
  ];

  const fleet = [
    { icon: CarFront, title: "Sedans", text: "Economy and comfort cars for solo, couple, and business travel." },
    { icon: UsersRound, title: "SUVs and MUVs", text: "Roomier options for families, luggage, and hill station routes." },
    { icon: Route, title: "Traveller vans", text: "12+ seater vehicles for groups, weddings, and corporate movement." }
  ];

  return (
    <div className="space-y-12">
      <MotionReveal>
        <section
          className="relative isolate min-h-[720px] overflow-hidden bg-slate-950 text-white"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(2, 6, 23, 0.88), rgba(15, 23, 42, 0.64), rgba(15, 23, 42, 0.28)), url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80')",
            backgroundPosition: "center",
            backgroundSize: "cover"
          }}
        >
          <div className="mx-auto grid max-w-6xl gap-8 px-4 pb-8 pt-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:pt-16">
            <div className="max-w-2xl">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-50 ring-1 ring-white/20">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" /> India-wide cab booking
              </p>
              <h1 className="text-4xl font-black leading-tight text-white md:text-6xl">
                Book verified cabs for outstation, airport, local, and group travel
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-100 md:text-lg">
                Compare vehicle options, see realistic fare estimates, and book with driver verification, support, and clear trip policies.
              </p>
              <div className="mt-6 grid max-w-xl grid-cols-3 gap-3 text-sm">
                <div className="rounded-md bg-white/12 p-3 ring-1 ring-white/15">
                  <p className="text-2xl font-black">10k+</p>
                  <p className="mt-1 text-xs text-slate-200">Trips completed</p>
                </div>
                <div className="rounded-md bg-white/12 p-3 ring-1 ring-white/15">
                  <p className="text-2xl font-black">4.8</p>
                  <p className="mt-1 text-xs text-slate-200">Average rating</p>
                </div>
                <div className="rounded-md bg-white/12 p-3 ring-1 ring-white/15">
                  <p className="text-2xl font-black">24x7</p>
                  <p className="mt-1 text-xs text-slate-200">Trip support</p>
                </div>
              </div>
            </div>
            <div className="lg:pt-14">
              <SearchForm />
            </div>
          </div>
        </section>
      </MotionReveal>

      <MotionReveal delay={0.12}>
        <section className="mx-auto max-w-6xl px-4">
          <TrustSignals />
        </section>
      </MotionReveal>

      <MotionReveal delay={0.16}>
        <section className="mx-auto max-w-6xl px-4">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-400">Popular routes</p>
              <h2 className="text-2xl font-bold text-slate-950 dark:text-white">Frequent intercity routes with upfront estimates</h2>
            </div>
            <Button variant="outline" asChild>
              <Link href="/search">
                View fleet <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-3 md:grid-cols-4">
            {routes.map((route) => (
              <Card key={`${route.from}-${route.to}`} className="p-4">
                <MapPinned className="h-5 w-5 text-blue-700" aria-hidden="true" />
                <p className="mt-3 font-bold text-slate-950 dark:text-white">
                  {route.from} to {route.to}
                </p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{route.time}</p>
                <p className="mt-3 text-sm font-semibold text-emerald-700 dark:text-emerald-400">{route.fare}</p>
              </Card>
            ))}
          </div>
        </section>
      </MotionReveal>

      <MotionReveal delay={0.2}>
        <section className="bg-white py-10 dark:bg-slate-900">
          <div className="mx-auto grid max-w-6xl gap-6 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-400">Fleet coverage</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-950 dark:text-white">Right-sized vehicles for real Indian travel use cases</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Business airport transfers, family weekend trips, hill station routes, event shuttles, and premium arrivals need different seating, luggage, and comfort levels.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {fleet.map((item) => (
                <Card key={item.title} className="h-full p-4">
                  <item.icon className="h-6 w-6 text-emerald-600" aria-hidden="true" />
                  <p className="mt-3 font-bold text-slate-950 dark:text-white">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.text}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </MotionReveal>

      <MotionReveal delay={0.24}>
        <section className="mx-auto max-w-6xl px-4">
          <div className="grid gap-3 md:grid-cols-3">
            {["Search and compare", "Confirm details", "Ride with support"].map((step, index) => (
              <div key={step} className="flex gap-3 rounded-md border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-blue-700 text-sm font-bold text-white">{index + 1}</div>
                <div>
                  <p className="font-bold text-slate-950 dark:text-white">{step}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {index === 0
                      ? "Use route, time, passengers, and trip type to see suitable vehicle options."
                      : index === 1
                        ? "Review fare, seating, driver verification, and cancellation support before booking."
                        : "Get confirmation and support access for changes, delays, or pickup coordination."}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3 rounded-md bg-slate-900 p-4 text-white">
            <Star className="h-5 w-5 text-amber-300" aria-hidden="true" />
            <p className="text-sm font-semibold">Transparent pricing, verified operators, and clear support are visible before users commit.</p>
            <CheckCircle2 className="h-5 w-5 text-emerald-400" aria-hidden="true" />
          </div>
        </section>
      </MotionReveal>
    </div>
  );
}
