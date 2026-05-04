import type { MetadataRoute } from "next";
import { vehicleData } from "@/lib/data/mock";
import { seoLandingPages } from "@/lib/seo/landing-pages";
import { absoluteUrl } from "@/lib/seo/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["/", "/search", "/booking", "/about", "/faqs", "/policies", "/contact"];
  const vehicleRoutes = vehicleData.map((vehicle) => `/vehicle/${vehicle.slug}`);
  const landingRoutes = seoLandingPages.map((page) => `/seo/${page.slug}`);

  return [...staticRoutes, ...vehicleRoutes, ...landingRoutes].map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/seo") ? 0.85 : 0.7
  }));
}
