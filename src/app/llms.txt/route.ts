import { seoLandingPages } from "@/lib/seo/landing-pages";
import { absoluteUrl, siteConfig } from "@/lib/seo/site";

export const dynamic = "force-static";

export function GET() {
  const landingLinks = seoLandingPages.map((page) => `- ${page.h1}: ${absoluteUrl(`/seo/${page.slug}`)}`).join("\n");
  const body = `# ${siteConfig.name}

${siteConfig.description}

## Important Pages
- Home and cab search: ${absoluteUrl("/")}
- Fleet search: ${absoluteUrl("/search")}
- FAQs: ${absoluteUrl("/faqs")}
- Policies: ${absoluteUrl("/policies")}
- Contact: ${absoluteUrl("/contact")}

## Route and Service Pages
${landingLinks}

## Verified Service Facts
- Trip types: outstation cab booking, airport taxi service, local hourly cab rental, round trip cab booking, and group travel.
- Support: phone and WhatsApp +91-90000-00000, email support@shanvitravels.in.
- Fares are estimates until operator confirmation; tolls, parking, extra stops, route conditions, and vehicle availability can change final confirmation.
- Safety policy: rides are assigned to verified drivers only.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
    }
  });
}
