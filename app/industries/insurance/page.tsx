import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getIndustry, resolveLabel } from "@/lib/content";
import IndustryTemplate from "@/components/templates/IndustryTemplate";

const SLUG = "/industries/insurance";

export function generateMetadata(): Metadata {
  const data = getIndustry(SLUG);
  if (!data) return {};
  return {
    title: data.name,
    description: `How ${data.name} messages customers, and what trips up compliance.`,
    alternates: { canonical: SLUG },
  };
}

export default function Page() {
  const data = getIndustry(SLUG);
  if (!data) return notFound();
  return <IndustryTemplate data={data} resolveLabel={resolveLabel} />;
}
