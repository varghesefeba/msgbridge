import type { Metadata } from "next";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Eyebrow from "@/components/ui/Eyebrow";
import CTABand from "@/components/ui/CTABand";

export const metadata: Metadata = { title: "Careers", description: "Open roles at MsgBridge.", alternates: { canonical: "/careers" } };

export default function CareersPage() {
  return (
    <div>
      <section className="relative overflow-hidden -mt-[var(--nav-h)] pt-[calc(var(--nav-h)+40px)] bg-paper-warm pb-16">
        <div className="container max-w-container-prose">
          <Breadcrumb items={[{ label: "Careers" }]} />
          <Eyebrow index="00" label="Careers" />
          <h1 className="font-display font-extrabold text-text-primary text-[28px] md:text-[40px] tracking-tight">
            We&rsquo;re not hiring at scale — but we&rsquo;re always listening.
          </h1>
          <p className="mt-4 text-[17px] text-text-secondary max-w-[58ch]">
            No open roles are posted right now. If you want to build compliance-first messaging infrastructure for
            Indian businesses, write to us and tell us what you&rsquo;d want to work on.
          </p>
        </div>
      </section>
      <CTABand title="Introduce yourself" supporting="Send us a note — we read every one." cta="Get in touch" />
    </div>
  );
}
