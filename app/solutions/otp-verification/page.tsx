import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSolution, resolveLabel } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import SolutionTemplate from "@/components/templates/SolutionTemplate";

const SLUG = "/solutions/otp-verification";

export const generateMetadata = (): Metadata => buildMetadata(SLUG);

export default function Page() {
  const data = getSolution(SLUG);
  if (!data) return notFound();
  return <SolutionTemplate data={data} resolveLabel={resolveLabel} />;
}
