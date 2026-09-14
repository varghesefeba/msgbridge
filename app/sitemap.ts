import type { MetadataRoute } from "next";
import { products, solutions, industries, services } from "@/lib/content";

const STATIC_ROUTES = [
  "/", "/verify", "/pricing", "/pricing/sms", "/pricing/whatsapp", "/pricing/voice", "/pricing/rcs",
  "/compliance", "/industries", "/about", "/why-msgbridge", "/contact", "/partners", "/careers",
  "/blog", "/blog/dlt-registration-checklist", "/blog/whatsapp-vs-sms-otp", "/blog/rcs-in-india",
  "/case-studies", "/resources/templates",
  "/developers/quickstart", "/developers/sandbox", "/developers/postman", "/developers/sms-api",
  "/developers/whatsapp-api", "/developers/voice-api", "/developers/rcs-api", "/developers/verify-api",
  "/developers/webhooks", "/developers/errors", "/developers/limits",
  "/legal/terms", "/legal/privacy", "/legal/aup", "/legal/sla", "/legal/refunds",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://msgbridge.in";
  const dynamic = [
    ...products.map((p) => p.slug),
    ...solutions.map((s) => s.slug),
    ...industries.map((i) => i.slug),
    ...services.map((s) => s.slug),
  ];
  const all = [...new Set([...STATIC_ROUTES, ...dynamic])];
  return all.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
