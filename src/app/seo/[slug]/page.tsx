import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BadgeCheck, CalendarClock, CarFront, MapPinned, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getSeoLandingPage, seoLandingPages } from "@/lib/seo/landing-pages";
import { absoluteUrl, createMetadata } from "@/lib/seo/site";

export function generateStaticParams() {
  return seoLandingPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getSeoLandingPage(slug);
  if (!page) return {};

  return createMetadata({
    title: page.title,
    description: page.description,
    path: `/seo/${page.slug}`,
    keywords: [page.primaryKeyword, ...page.secondaryKeywords]
  });
}

export default async function SeoLandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getSeoLandingPage(slug);
  if (!page) return notFound();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.h1,
    serviceType: page.primaryKeyword,
    provider: { "@id": `${absoluteUrl("/")}#organization` },
    areaServed: "India",
    description: page.description,
    url: absoluteUrl(`/seo/${page.slug}`)
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([faqJsonLd, serviceJsonLd]) }} />
      <section className="grid gap-5 rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:grid-cols-[1fr_360px]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-400">{page.eyebrow}</p>
          <h1 className="mt-2 text-3xl font-black leading-tight text-slate-950 dark:text-white md:text-5xl">{page.h1}</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">{page.description}</p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold">
            {[page.primaryKeyword, ...page.secondaryKeywords].map((keyword) => (
              <span key={keyword} className="rounded-full bg-slate-100 px-3 py-1 text-slate-700 dark:bg-slate-950 dark:text-slate-300">
                {keyword}
              </span>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <Button asChild>
              <Link href="/">
                Search vehicles <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">Speak to support</Link>
            </Button>
          </div>
        </div>
        <Card className="border-blue-100 bg-blue-50 shadow-none dark:border-blue-950 dark:bg-blue-950/40">
          <CarFront className="h-6 w-6 text-blue-700 dark:text-blue-300" aria-hidden="true" />
          <p className="mt-3 font-bold text-slate-950 dark:text-white">Booking confidence</p>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
            <li className="flex gap-2">
              <ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" /> Verified driver assignment
            </li>
            <li className="flex gap-2">
              <BadgeCheck className="mt-1 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" /> Fare estimate before booking
            </li>
            <li className="flex gap-2">
              <CalendarClock className="mt-1 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" /> Pickup coordination support
            </li>
          </ul>
        </Card>
      </section>

      {page.route ? (
        <section className="grid gap-3 md:grid-cols-3">
          <Card>
            <MapPinned className="h-5 w-5 text-blue-700" aria-hidden="true" />
            <p className="mt-3 font-bold text-slate-950 dark:text-white">
              {page.route.from} to {page.route.to}
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Estimated travel time: {page.route.time}</p>
          </Card>
          <Card>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Starting estimate</p>
            <p className="mt-3 text-2xl font-black text-slate-950 dark:text-white">{page.route.fare}</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Final operator confirmation can vary by tolls, parking, stops, and vehicle availability.</p>
          </Card>
          <Card>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Best fit</p>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">Select sedans for compact trips, SUVs/MUVs for families and luggage, and traveller vehicles for groups.</p>
          </Card>
        </section>
      ) : null}

      <section className="grid gap-3 md:grid-cols-3">
        {page.bullets.map((bullet) => (
          <Card key={bullet}>
            <BadgeCheck className="h-5 w-5 text-emerald-600" aria-hidden="true" />
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{bullet}</p>
          </Card>
        ))}
      </section>

      <section className="grid gap-3 md:grid-cols-2">
        {page.faqs.map((faq) => (
          <Card key={faq.question}>
            <h2 className="font-bold text-slate-950 dark:text-white">{faq.question}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{faq.answer}</p>
          </Card>
        ))}
      </section>
    </div>
  );
}
