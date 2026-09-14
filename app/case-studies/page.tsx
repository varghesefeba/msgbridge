import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Eyebrow from "@/components/ui/Eyebrow";
import CTABand from "@/components/ui/CTABand";

export const metadata: Metadata = buildMetadata("/case-studies");

export default function CaseStudiesPage() {
  return (
    <div>
      <section className="relative overflow-hidden -mt-[var(--nav-h)] pt-[calc(var(--nav-h)+40px)] bg-paper-warm pb-16">
        <div className="container max-w-container-prose">
          <Breadcrumb items={[{ label: "Case Studies" }]} />
          <Eyebrow index="00" label="Case studies" />
          <h1 className="font-display font-extrabold text-text-primary text-[28px] md:text-[40px] tracking-tight">
            Our first case studies are in progress.
          </h1>
          <p className="mt-4 text-[17px] text-text-secondary max-w-[58ch]">
            We publish results only with a customer&rsquo;s written sign-off — no borrowed logos, no invented numbers. In
            the meantime, see <a href="/why-msgbridge" className="text-lime-forest underline">why teams switch to MsgBridge</a> and
            how a typical integration plays out on our <a href="/" className="text-lime-forest underline">homepage</a>.
          </p>
        </div>
      </section>
      <CTABand title="Want to be our next case study?" supporting="Run a pilot with us and we'll write it up together." />
    </div>
  );
}
