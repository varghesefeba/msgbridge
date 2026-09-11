import { productsA } from "./products-a";
import { productsB } from "./products-b";
import { solutions } from "./solutions";
import { services } from "./services";
import { industries, longTailSectors } from "./industries";
import type { ProductPage, SolutionPage, IndustryPage, ServicePage } from "@/lib/types";

export const products: ProductPage[] = [...productsA, ...productsB];
export { solutions, services, industries, longTailSectors };

const specialLabels: Record<string, string> = {
  "/verify": "MsgBridge Verify",
  "/compliance": "DLT & TRAI Compliance Guide",
  "/pricing": "Pricing",
  "/contact": "Contact",
  "/developers/quickstart": "Developer Quickstart",
};

export function getProduct(slug: string): ProductPage | undefined {
  return products.find((p) => p.slug === slug);
}
export function getSolution(slug: string): SolutionPage | undefined {
  return solutions.find((s) => s.slug === slug);
}
export function getIndustry(slug: string): IndustryPage | undefined {
  return industries.find((i) => i.slug === slug);
}
export function getService(slug: string): ServicePage | undefined {
  return services.find((s) => s.slug === slug);
}

export function resolveLabel(slug: string): string {
  return (
    specialLabels[slug] ??
    getProduct(slug)?.name ??
    getSolution(slug)?.name ??
    getIndustry(slug)?.name ??
    getService(slug)?.name ??
    slug
  );
}
