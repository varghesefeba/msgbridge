import type { Metadata } from "next";
import { PAGE_SEO, type PageSeo } from "./page-seo";

export type { PageSeo };

/** Look up the blueprint SEO record for a route slug ("/" for home). */
export function getPageSeo(slug: string): PageSeo | undefined {
  return PAGE_SEO[slug];
}

/**
 * Build Next.js Metadata for a route from the SEO blueprint.
 *
 * - `title` is applied absolutely so the layout's "%s | MsgBridge" template
 *   does not double-append the brand (the blueprint titles already end with it).
 * - Falls back to the supplied name/description when a slug has no blueprint row.
 * - Sets a self-referencing canonical and Open Graph fields for every page.
 */
export function buildMetadata(
  slug: string,
  fallback?: { title?: string; description?: string }
): Metadata {
  const seo = getPageSeo(slug);
  const title = seo?.title ?? (fallback?.title ? `${fallback.title} | MsgBridge` : "MsgBridge");
  const description = seo?.description ?? fallback?.description ?? "";
  const canonical = slug === "/" ? "/" : slug;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "MsgBridge",
      type: "website",
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
