import type { Metadata } from "next";
import Link from "next/link";
import { CarFront, Headphones, ShieldCheck } from "lucide-react";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export const metadata: Metadata = {
  title: "Shanvi Travels | Reliable India Cab Booking",
  description: "Book outstation, airport, local rental, and group vehicles across India."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <div className="min-h-screen">
            <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
              <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                <Link href="/" className="flex items-center gap-2 text-base font-extrabold tracking-tight text-blue-700 dark:text-blue-400">
                  <span className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-700 text-white">
                    <CarFront className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>Shanvi Travels</span>
                </Link>
                <nav className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 sm:gap-4">
                  <Link href="/search" className="hidden hover:text-slate-950 dark:hover:text-white sm:inline">
                    Fleet
                  </Link>
                  <Link href="/about" className="hover:text-slate-900 dark:hover:text-white">
                    About
                  </Link>
                  <Link href="/faqs" className="hidden hover:text-slate-900 dark:hover:text-white sm:inline">
                    FAQs
                  </Link>
                  <Link href="/contact" className="hover:text-slate-900 dark:hover:text-white">
                    Contact
                  </Link>
                  <ThemeToggle />
                </nav>
              </div>
            </header>
            <main>{children}</main>
            <footer className="mt-12 border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
              <div className="mx-auto grid max-w-6xl gap-4 px-4 py-6 text-sm text-slate-600 dark:text-slate-300 md:grid-cols-[1.2fr_1fr_1fr]">
                <div>
                  <p className="font-bold text-slate-950 dark:text-white">Shanvi Travels</p>
                  <p className="mt-1 max-w-md">Trusted India cab booking with verified drivers, transparent fares, and 24x7 trip support.</p>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                  <span>Driver and vehicle checks before every trip</span>
                </div>
                <div className="flex items-center gap-2">
                  <Headphones className="h-5 w-5 text-blue-700" aria-hidden="true" />
                  <span>Phone and WhatsApp support: +91-90000-00000</span>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
