import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSolution, resolveLabel } from "@/lib/content";
import SolutionTemplate from "@/components/templates/SolutionTemplate";

const SLUG = "/solutions/lead-generation";

export function generateMetadata(): Metadata {
  const data = getSolution(SLUG);
  if (!data) return {};
  return {
    title: data.name,
    description: data.problem,
    alternates: { canonical: SLUG },
  };
}

export default function Page() {
  const data = getSolution(SLUG);
  if (!data) return notFound();
  return <SolutionTemplate data={data} resolveLabel={resolveLabel} />;
}
