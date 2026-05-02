import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Briefcase, CalendarClock, CarFront, CheckCircle2, Headphones, MapPinned, ShieldCheck, Star, UsersRound } from "lucide-react";
import { FareBreakdownView } from "@/components/booking/fare-breakdown";
import { TrustSignals } from "@/components/trust/trust-signals";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { vehicleData, categoryLabels } from "@/lib/data/mock";
import { calculateFare } from "@/lib/pricing/calculateFare";

export default async function VehicleDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const vehicle = vehicleData.find((v) => v.slug === slug);
  if (!vehicle) return notFound();

  const fare = calculateFare(
    {
      pickup: "Delhi",
      destination: "Jaipur",
      date: "2026-05-05",
      time: "10:00",
      tripType: "one-way-outstation",
      passengers: 2
    },
    vehicle
  );

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-6">
      <MotionReveal>
        <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative min-h-[320px] bg-slate-200">
              <img
                src={`${vehicle.image}?auto=format&fit=crop&w=1200&q=85`}
                alt={vehicle.name}
                className="h-full min-h-[320px] w-full object-cover"
              />
              <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-slate-900 shadow-sm">
                {categoryLabels[vehicle.category]}
              </span>
            </div>
            <div className="p-5 lg:p-6">
              <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                <BadgeCheck className="h-4 w-4" aria-hidden="true" /> Verified driver and operator checks
              </div>
              <h1 className="mt-3 text-3xl font-black text-slate-950 dark:text-white">{vehicle.name}</h1>
              <p className="mt-2 flex items-center gap-1 text-sm text-slate-600 dark:text-slate-300">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                {vehicle.rating} from {vehicle.reviewCount.toLocaleString("en-IN")} reviews
              </p>
              <div className="mt-5 grid grid-cols-3 gap-2 text-sm text-slate-700 dark:text-slate-300">
                <span className="rounded-md bg-slate-50 p-3 dark:bg-slate-950">
                  <UsersRound className="mb-2 h-5 w-5 text-blue-700" aria-hidden="true" />
                  {vehicle.seats} seats
                </span>
                <span className="rounded-md bg-slate-50 p-3 dark:bg-slate-950">
                  <Briefcase className="mb-2 h-5 w-5 text-blue-700" aria-hidden="true" />
                  {vehicle.luggage} bags
                </span>
                <span className="rounded-md bg-slate-50 p-3 dark:bg-slate-950">
                  <CarFront className="mb-2 h-5 w-5 text-blue-700" aria-hidden="true" />
                  AC cab
                </span>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {vehicle.amenities.map((item) => (
                  <span key={item} className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 dark:border-slate-700 dark:text-slate-300">
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                <Button asChild>
                  <Link href={`/booking?vehicle=${vehicle.slug}`}>
                    Book this vehicle <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/contact">
                    <Headphones className="h-4 w-4" aria-hidden="true" /> Need help?
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </MotionReveal>
      <MotionReveal delay={0.06}>
        <section className="grid gap-3 md:grid-cols-3">
          <Card>
            <MapPinned className="h-5 w-5 text-blue-700" aria-hidden="true" />
            <p className="mt-3 font-bold text-slate-950 dark:text-white">Example route</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Delhi to Jaipur outstation fare estimate for quick comparison.</p>
          </Card>
          <Card>
            <CalendarClock className="h-5 w-5 text-blue-700" aria-hidden="true" />
            <p className="mt-3 font-bold text-slate-950 dark:text-white">Flexible coordination</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Pickup time, route stops, and luggage needs can be confirmed before dispatch.</p>
          </Card>
          <Card>
            <ShieldCheck className="h-5 w-5 text-blue-700" aria-hidden="true" />
            <p className="mt-3 font-bold text-slate-950 dark:text-white">Trip safeguards</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Driver assignment, support access, and cancellation help are surfaced early.</p>
          </Card>
        </section>
      </MotionReveal>
      <MotionReveal delay={0.08}>
        <FareBreakdownView fare={fare} />
      </MotionReveal>
      <MotionReveal delay={0.12}>
        <TrustSignals />
      </MotionReveal>
      <div className="fixed bottom-4 left-0 right-0 z-40 mx-auto w-[calc(100%-2rem)] max-w-3xl rounded-lg border border-slate-200 bg-white p-3 shadow-2xl dark:border-slate-800 dark:bg-slate-900 md:hidden">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500">Starting from</p>
            <p className="text-sm font-semibold">INR {fare.total.toLocaleString("en-IN")}</p>
          </div>
          <Button asChild>
            <Link href={`/booking?vehicle=${vehicle.slug}`}>
              Book now <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
