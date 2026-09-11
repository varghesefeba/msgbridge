import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getService } from "@/lib/content";
import ServiceTemplate from "@/components/templates/ServiceTemplate";

const SLUG = "/services/chatbot-development";

export function generateMetadata(): Metadata {
  const data = getService(SLUG);
  if (!data) return {};
  return {
    title: data.name,
    description: data.summary,
    alternates: { canonical: SLUG },
  };
}

export default function Page() {
  const data = getService(SLUG);
  if (!data) return notFound();
  return <ServiceTemplate data={data} />;
}
