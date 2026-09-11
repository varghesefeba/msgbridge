import type { Metadata } from "next";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Eyebrow from "@/components/ui/Eyebrow";
import CTABand from "@/components/ui/CTABand";
import TemplateLibrary, { type TemplateEntry } from "@/components/resources/TemplateLibrary";
import { industries, solutions } from "@/lib/content";

export const metadata: Metadata = {
  title: "SMS Templates Library",
  description: "DLT-format content templates by industry and use case, ready to register — copy and adapt.",
  alternates: { canonical: "/resources/templates" },
};

export default function TemplatesPage() {
  const entries: TemplateEntry[] = [
    ...industries.flatMap((ind) => ind.templatePack.map((t) => ({ ...t, group: ind.name }))),
    ...solutions.flatMap((sol) => sol.templates.map((t) => ({ ...t, group: sol.name }))),
  ];

  return (
    <div>
      <section className="relative overflow-hidden -mt-[var(--nav-h)] pt-[calc(var(--nav-h)+40px)] bg-paper-warm pb-16">
        <div className="container max-w-container">
          <Breadcrumb items={[{ label: "Resources", href: "/blog" }, { label: "SMS Templates" }]} />
          <Eyebrow index="00" label="SMS templates library" />
          <h1 className="font-display font-extrabold text-text-primary text-[30px] md:text-[48px] tracking-tight max-w-[22ch]">
            DLT-ready templates, by industry and use case.
          </h1>
          <p className="mt-4 text-[17px] text-text-secondary max-w-[56ch]">
            Copy, adapt the variables, and submit for DLT approval. Every template below follows the variable-in-curly-braces
            convention described in the <a href="/compliance" className="text-lime-forest underline">compliance guide</a>.
          </p>
        </div>
      </section>
      <section className="py-16 bg-paper">
        <div className="container max-w-container">
          <TemplateLibrary entries={entries} />
        </div>
      </section>
      <CTABand title="Want us to register these for you?" supporting="We handle drafting and submission end to end." href="/services/dlt-registration" cta="See DLT Registration Assistance" />
    </div>
  );
}
