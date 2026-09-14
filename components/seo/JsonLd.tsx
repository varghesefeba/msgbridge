import type { FAQ } from "@/lib/types";

const BASE = "https://msgbridge.in";

/** Emit a JSON-LD script tag. Server-rendered so it is in the initial HTML. */
function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** BreadcrumbList matching the visible breadcrumb. Items: [{name, slug?}]. */
export function BreadcrumbJsonLd({ items }: { items: { name: string; slug?: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((it, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: it.name,
          ...(it.slug ? { item: `${BASE}${it.slug}` } : {}),
        })),
      }}
    />
  );
}

/** FAQPage structured data — only render where the visible FAQ is genuine. */
export function FaqJsonLd({ items }: { items: FAQ[] }) {
  if (!items?.length) return null;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }}
    />
  );
}

export default JsonLd;
