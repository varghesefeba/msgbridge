import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProduct, resolveLabel } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import ProductTemplate from "@/components/templates/ProductTemplate";

const SLUG = "/whatsapp-chatbot";

export const generateMetadata = (): Metadata => buildMetadata(SLUG);

export default function Page() {
  const data = getProduct(SLUG);
  if (!data) return notFound();
  return <ProductTemplate data={data} resolveLabel={resolveLabel} />;
}
