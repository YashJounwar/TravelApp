# Shanvi Travels Booking Platform

Responsive India travel booking platform built with Next.js, React, TypeScript, Tailwind, and shadcn-style UI components.

## Features
- Search-first homepage flow: pickup, destination, date/time, trip type, passengers
- Search results with filters and vehicle categories
- Vehicle details with trust signals and fare breakdown
- Booking + callback request flow
- Admin dashboard modules for bookings, vehicles, pricing, routes, drivers, customers, and SEO pages
- Firebase-ready backend scaffold (Firestore rules/indexes + client/admin setup)

## Tech Stack
- Next.js App Router
- TypeScript
- Tailwind CSS
- Firebase (Firestore/Auth Admin setup stubs)

## Run
1. Install dependencies:
   - `npm install`
2. Configure environment variables for Firebase from `.env.example`.
3. Start dev server:
   - `npm run dev`

## Production Hardening Added
- Customer booking and callback now POST to Firestore-backed APIs:
  - `POST /api/bookings`
  - `POST /api/callbacks`
- Search now calls `POST /api/search` and uses Firestore vehicles when available.
- Admin APIs are role-protected using Firebase ID token custom claim `role=admin`:
  - `GET/POST /api/admin/vehicles`
  - `GET/PATCH /api/admin/bookings`
  - `GET/PUT /api/admin/pricing`
  - `GET/POST /api/admin/routes`
- For local development only, set `ALLOW_DEV_ADMIN_BYPASS=true` to bypass token verification.

## Core Pages
- `/` Home
- `/search` Search results
- `/vehicle/[slug]` Vehicle details
- `/booking` Booking form
- `/booking/success` Booking success
- `/contact` Contact
- `/about` About
- `/faqs` FAQs
- `/policies` Policies
- `/admin/*` Admin dashboard
