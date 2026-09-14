import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getIndustry, resolveLabel } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import IndustryTemplate from "@/components/templates/IndustryTemplate";

const SLUG = "/industries/logistics";

export const generateMetadata = (): Metadata => buildMetadata(SLUG);

export default function Page() {
  const data = getIndustry(SLUG);
  if (!data) return notFound();
  return <IndustryTemplate data={data} resolveLabel={resolveLabel} />;
}
