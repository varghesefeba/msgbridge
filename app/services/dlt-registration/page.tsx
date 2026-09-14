import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getService } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import ServiceTemplate from "@/components/templates/ServiceTemplate";

const SLUG = "/services/dlt-registration";

export const generateMetadata = (): Metadata => buildMetadata(SLUG);

export default function Page() {
  const data = getService(SLUG);
  if (!data) return notFound();
  return <ServiceTemplate data={data} />;
}
