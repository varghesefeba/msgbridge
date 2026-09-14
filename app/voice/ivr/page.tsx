import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProduct, resolveLabel } from "@/lib/content";
import ProductTemplate from "@/components/templates/ProductTemplate";

const SLUG = "/voice/ivr";

export function generateMetadata(): Metadata {
  const data = getProduct(SLUG);
  if (!data) return {};
  return {
    title: data.name,
    description: data.oneLiner,
    alternates: { canonical: SLUG },
  };
}

export default function Page() {
  const data = getProduct(SLUG);
  if (!data) return notFound();
  return <ProductTemplate data={data} resolveLabel={resolveLabel} />;
}
