import type { ServicePage } from "@/lib/types";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Accordion from "@/components/ui/Accordion";
import Callout from "@/components/ui/Callout";
import CTABand from "@/components/ui/CTABand";
import Backdrop from "@/components/motion/Backdrop";
import Spotlight from "@/components/motion/Spotlight";
import { getPageSeo } from "@/lib/seo";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";

export default function ServiceTemplate({ data }: { data: ServicePage }) {
  const seo = getPageSeo(data.slug);
  return (
    <div>
      <BreadcrumbJsonLd items={[{ name: "Home", slug: "/" }, { name: "Services" }, { name: data.name, slug: data.slug }]} />
      <FaqJsonLd items={data.faq} />
      <section className="relative overflow-hidden bg-ink -mt-[var(--nav-h)] pt-[calc(var(--nav-h)+40px)] pb-16 md:pb-24">
        <Backdrop tone="dark" variant="grid" />
        <div className="container max-w-container relative">
          <Reveal variant="fall">
            <Breadcrumb tone="dark" items={[{ label: "Services", href: "/" }, { label: data.name }]} />
          </Reveal>

          {data.draft && (
            <Reveal delay={60} className="mb-6">
              <Callout variant="note">
                <span className="text-on-dark">
                  This service is confirmed with our onboarding partner before we take bookings for it.
                </span>
              </Callout>
            </Reveal>
          )}

          <Reveal delay={80}>
            <Eyebrow index="01" label="What we do for you" dark />
          </Reveal>
          <Reveal delay={140}>
            <h1 className="font-display font-extrabold text-on-dark text-[28px] md:text-[44px] tracking-tight max-w-[26ch] mb-6 text-balance">
              {data.summary}
            </h1>
          </Reveal>

          {seo?.intro && (
            <Reveal delay={180}>
              <p className="max-w-[62ch] text-[16px] md:text-[17px] leading-relaxed text-on-dark-3 mb-8">{seo.intro}</p>
            </Reveal>
          )}

          <Reveal variant="scale" delay={220}>
            <Spotlight className="shine-host max-w-3xl rounded-lg border border-ink-line bg-white/[0.03] p-6 md:p-7">
              <ul className="grid sm:grid-cols-2 gap-3.5">
                {data.deliverables.map((d, i) => (
                  <Reveal as="li" key={d} delay={260 + i * 70} className="group/item flex gap-3 text-[15px] text-on-dark-2">
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden className="mt-[0.28em] shrink-0 text-lime">
                      <path d="M3 8.4l3.4 3.3L13 5" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="transition-colors duration-fast group-hover/item:text-on-dark">{d}</span>
                  </Reveal>
                ))}
              </ul>
            </Spotlight>
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-paper">
        <div className="container max-w-container-narrow">
          <Reveal>
            <Eyebrow index="02" label="What you provide" />
          </Reveal>
          <ul className="space-y-3.5">
            {data.whatYouProvide.map((item, i) => (
              <Reveal as="li" key={item} variant="left" delay={i * 70} className="group/item flex gap-3.5 text-[15.5px] text-text-secondary">
                <span
                  aria-hidden
                  className="mt-[0.62em] h-px w-5 shrink-0 origin-left rounded-full bg-lime-deep transition-transform duration-base ease-out group-hover/item:scale-x-150"
                />
                <span className="transition-colors duration-fast group-hover/item:text-text-primary">{item}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-paper-warm">
        <div className="container max-w-container">
          <Reveal>
            <Eyebrow index="03" label="Process & timeline" />
          </Reveal>
          <Reveal delay={80} className="rounded-lg border border-line bg-white divide-y divide-line overflow-hidden">
            {data.process.map((p, i) => (
              <Reveal
                key={p.stage}
                variant="left"
                delay={i * 80}
                className="group/stage flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-6 py-5 transition-colors duration-fast hover:bg-paper-warm"
              >
                <div className="flex items-center gap-4">
                  <span className="w-7 h-7 rounded-full bg-ink text-lime font-display font-bold text-[12px] flex items-center justify-center shrink-0 transition-transform duration-base ease-out group-hover/stage:scale-110">
                    {i + 1}
                  </span>
                  <p className="font-display font-medium text-[15.5px] text-text-primary">{p.stage}</p>
                </div>
                <div className="flex items-center gap-3 pl-11 sm:pl-0">
                  <span className="font-mono text-[12.5px] text-text-muted">{p.timeline}</span>
                  {p.outsideControl && (
                    <span className="text-[11px] font-display font-semibold uppercase tracking-wide bg-[#FFF6E9] text-[#b95f00] px-2 py-0.5 rounded-xs">
                      Regulator/platform queue
                    </span>
                  )}
                </div>
              </Reveal>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-paper">
        <div className="container max-w-container-narrow">
          <Reveal variant="left">
            <Eyebrow index="04" label="If it's rejected" />
            <p className="text-[15px] text-text-secondary leading-relaxed max-w-[56ch]">{data.rejectionPolicy}</p>
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-paper-warm">
        <div className="container max-w-container-narrow">
          <Reveal>
            <Eyebrow index="05" label="FAQ" />
          </Reveal>
          <Reveal delay={80}>
            <Accordion items={data.faq} />
          </Reveal>
        </div>
      </section>

      <CTABand title={`Get started with ${data.name}`} supporting="Tell us where you are today and we'll scope the work." />
    </div>
  );
}
