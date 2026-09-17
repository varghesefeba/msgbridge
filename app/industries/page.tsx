import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import CTABand from "@/components/ui/CTABand";
import { industries, longTailSectors } from "@/lib/content";

export const metadata: Metadata = {
  title: "Industries",
  description: "How every kind of Indian business messages its customers, on the right channel, without tripping over DLT.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesIndex() {
  return (
    <div>
      <section className="relative overflow-hidden -mt-[var(--nav-h)] pt-[calc(var(--nav-h)+40px)] bg-paper-warm pb-16">
        <div className="container max-w-container">
          <Reveal variant="fall">
            <Breadcrumb items={[{ label: "Industries" }]} />
          </Reveal>
          <Reveal delay={60}>
            <Eyebrow index="00" label="All industries" />
          </Reveal>
          <Reveal variant="blur" delay={120}>
            <h1 className="font-display font-extrabold text-text-primary text-[30px] md:text-[48px] tracking-tight max-w-[20ch]">
              Built for how your sector actually messages.
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="py-16 bg-paper">
        <div className="container max-w-container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {industries.map((ind, i) => (
              <Reveal key={ind.slug} delay={i * 40}>
                <Link href={ind.slug} className="group block h-full rounded-md border border-line bg-white p-6 transition-all duration-base ease-out hover:-translate-y-1 hover:border-lime-200 hover:shadow-card-sm">
                  <span className="text-[11px] font-display font-semibold uppercase tracking-wide text-lime-forest bg-lime-100 px-2 py-0.5 rounded-xs">
                    {ind.group}
                  </span>
                  <h2 className="font-display font-semibold text-[17px] text-text-primary mt-3 mb-1.5 group-hover:text-lime-forest transition-colors">
                    {ind.name}
                  </h2>
                  <p className="text-[13.5px] text-text-muted">{ind.scenarios[0]?.moment}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-paper-warm">
        <div className="container max-w-container">
          <Reveal>
            <Eyebrow index="01" label="More sectors" />
          </Reveal>
          <Reveal delay={80}>
            <p className="text-[15px] text-text-secondary max-w-[60ch] mb-8">
              Don&rsquo;t see yours above? These sectors run on the same channels — here&rsquo;s the closest deep page for
              each.
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {longTailSectors.map((s, i) => (
              <Reveal key={s.name} delay={i * 40}>
                <Link href={s.nearest} className="group block h-full rounded-md border border-line bg-white p-5 transition-all duration-base ease-out hover:-translate-y-0.5 hover:border-lime-deep hover:shadow-card-sm">
                  <p className="font-display font-semibold text-[15px] text-text-primary mb-1 transition-colors group-hover:text-lime-forest">{s.name}</p>
                  <p className="text-[13px] text-text-muted">{s.note}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand title="Don't see your exact sector?" supporting="Tell us how you message customers today and we'll map the channels." />
    </div>
  );
}
