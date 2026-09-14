import Link from "next/link";
import type { SolutionPage } from "@/lib/types";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Accordion from "@/components/ui/Accordion";
import CTABand from "@/components/ui/CTABand";
import Backdrop from "@/components/motion/Backdrop";
import Spotlight from "@/components/motion/Spotlight";
import { getPageSeo } from "@/lib/seo";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";

export default function SolutionTemplate({ data, resolveLabel }: { data: SolutionPage; resolveLabel: (slug: string) => string }) {
  const seo = getPageSeo(data.slug);
  const flow = [
    { label: "Trigger", value: data.flow.trigger },
    { label: "Primary channel", value: data.flow.primary },
    { label: "Fallback", value: data.flow.fallback },
    { label: "Outcome", value: data.flow.outcome },
  ];

  return (
    <div>
      <BreadcrumbJsonLd items={[{ name: "Home", slug: "/" }, { name: "Solutions" }, { name: data.name, slug: data.slug }]} />
      {data.faq && data.faq.length > 0 && <FaqJsonLd items={data.faq} />}
      <section className="relative overflow-hidden bg-ink -mt-[var(--nav-h)] pt-[calc(var(--nav-h)+40px)] pb-16 md:pb-24">
        <Backdrop tone="dark" variant="grid" />
        <Spotlight border={false} className="relative">
          <div className="container max-w-container relative">
            <Reveal variant="fall">
              <Breadcrumb tone="dark" items={[{ label: "Solutions", href: "/" }, { label: data.name }]} />
            </Reveal>
            <Reveal delay={60}>
              <Eyebrow index="01" label="The problem" dark />
            </Reveal>
            <Reveal delay={120}>
              <h1 className="font-display font-extrabold text-on-dark text-[28px] md:text-[44px] tracking-tight max-w-[24ch] text-balance">
                {data.problem}
              </h1>
            </Reveal>
            {seo?.intro && (
              <Reveal delay={180}>
                <p className="mt-6 max-w-[62ch] text-[16px] md:text-[17px] leading-relaxed text-on-dark-3">{seo.intro}</p>
              </Reveal>
            )}
          </div>
        </Spotlight>
      </section>

      <section className="py-20 md:py-24 bg-paper">
        <div className="container max-w-container">
          <Reveal>
            <Eyebrow index="02" label="Channel recommendation" />
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.channels.map((c, i) => (
              <Reveal key={c.name} delay={i * 70}>
                <div
                  className={`group/card h-full rounded-md border p-6 transition-all duration-base ease-out hover:-translate-y-1 hover:shadow-card-sm ${
                    c.recommended
                      ? "shine-host border-lime-deep bg-lime-050"
                      : "border-line bg-white hover:border-lime-200"
                  }`}
                >
                  {c.recommended && (
                    <span className="inline-flex items-center gap-1.5 mb-3 text-[11px] font-display font-bold uppercase tracking-wide bg-ink text-lime px-2 py-1 rounded-xs">
                      <span className="h-1.5 w-1.5 rounded-full bg-lime motion-safe:animate-pulse" aria-hidden />
                      Recommended
                    </span>
                  )}
                  <h3 className="font-display font-semibold text-[17px] text-text-primary mb-2">{c.name}</h3>
                  <p className="text-[14.5px] text-text-secondary leading-relaxed">{c.why}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-paper-warm">
        <div className="container max-w-container">
          <Reveal>
            <Eyebrow index="03" label="Message flow" />
          </Reveal>
          <Reveal delay={80} className="rounded-lg border border-line bg-white p-8 overflow-x-auto">
            <div className="flex items-center gap-3 min-w-[640px] text-[14px]">
              {flow.map((step, i) => (
                <Reveal key={step.label} variant="left" delay={i * 110} className="flex items-center gap-3 flex-1">
                  <div className="group/step flex-1 rounded-md border border-line bg-paper-warm p-4 transition-all duration-base ease-out hover:-translate-y-0.5 hover:border-lime-200 hover:bg-white hover:shadow-card-sm">
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-lime-forest mb-1.5">{step.label}</p>
                    <p className="font-medium text-text-primary">{step.value}</p>
                  </div>
                  {i < flow.length - 1 && (
                    <span aria-hidden className="text-text-muted shrink-0 transition-transform duration-base ease-out group-hover/step:translate-x-0.5">
                      →
                    </span>
                  )}
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-paper">
        <div className="container max-w-container">
          <Reveal>
            <Eyebrow index="04" label="Sample templates" />
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.templates.map((t, i) => (
              <Reveal key={t.title} delay={i * 70}>
                <div className="group/tpl h-full rounded-md border border-line bg-paper-warm p-5 transition-all duration-base ease-out hover:-translate-y-1 hover:border-lime-200 hover:bg-white hover:shadow-card-sm">
                  <p className="font-display font-semibold text-[14px] text-text-primary mb-2">{t.title}</p>
                  <p className="font-mono text-[13px] text-text-secondary leading-relaxed">{t.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-paper-warm">
        <div className="container max-w-container-narrow">
          <Reveal>
            <Eyebrow index="05" label="Setup steps" />
          </Reveal>
          <Reveal delay={80} className="rounded-lg border border-line bg-white divide-y divide-line overflow-hidden">
            {data.setup.map((s, i) => (
              <Reveal
                key={s.step}
                variant="left"
                delay={i * 80}
                className="group/row flex items-center justify-between gap-4 px-6 py-4 transition-colors duration-fast hover:bg-paper-warm"
              >
                <p className="text-[15px] text-text-primary">{s.step}</p>
                <span
                  className={`shrink-0 text-[12px] font-display font-semibold uppercase tracking-wide px-2.5 py-1 rounded-pill transition-transform duration-base ease-out group-hover/row:scale-105 ${
                    s.owner === "MsgBridge" ? "bg-lime-100 text-lime-forest" : "bg-ink text-lime"
                  }`}
                >
                  {s.owner}
                </span>
              </Reveal>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-paper">
        <div className="container max-w-container">
          <Reveal>
            <Eyebrow index="06" label="Related" />
          </Reveal>
          <div className="flex flex-wrap gap-3">
            {[...data.relatedProducts, ...data.relatedIndustries].map((slug, i) => (
              <Reveal key={slug} variant="scale" delay={i * 60}>
                <Link
                  href={slug}
                  className="group/pill inline-flex items-center gap-2 rounded-pill border border-line bg-white px-5 py-2.5 text-[14px] font-medium text-text-primary transition-all duration-base ease-out hover:-translate-y-0.5 hover:border-lime-deep hover:shadow-card-sm"
                >
                  {resolveLabel(slug)}
                  <span aria-hidden className="text-lime-forest transition-transform duration-base ease-out group-hover/pill:translate-x-1">
                    →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {(data.integration || (data.metrics && data.metrics.length > 0)) && (
        <section className="py-20 md:py-24 bg-paper-warm">
          <div className="container max-w-container grid md:grid-cols-2 gap-12">
            {data.integration && (
              <Reveal variant="left">
                <Eyebrow index="07" label="How to integrate" />
                <p className="text-[15.5px] text-text-secondary leading-relaxed max-w-[48ch]">{data.integration}</p>
              </Reveal>
            )}
            {data.metrics && data.metrics.length > 0 && (
              <Reveal variant="right" delay={80}>
                <Eyebrow index="08" label="Metrics to monitor" />
                <ul className="space-y-3">
                  {data.metrics.map((m, i) => (
                    <Reveal as="li" key={m} delay={i * 60} className="group/item flex gap-3.5 text-[15px] text-text-secondary">
                      <span
                        aria-hidden
                        className="mt-[0.62em] h-px w-5 shrink-0 origin-left rounded-full bg-lime-deep transition-transform duration-base ease-out group-hover/item:scale-x-150"
                      />
                      <span className="transition-colors duration-fast group-hover/item:text-text-primary">{m}</span>
                    </Reveal>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {data.faq && data.faq.length > 0 && (
        <section className="py-20 md:py-24 bg-paper">
          <div className="container max-w-container-narrow">
            <Reveal>
              <Eyebrow index="09" label="FAQ" />
            </Reveal>
            <Reveal delay={80}>
              <Accordion items={data.faq} />
            </Reveal>
          </div>
        </section>
      )}

      <CTABand title={`Ready to solve this with ${data.name}?`} supporting="Talk to us about your volumes and we'll recommend the right mix." />
    </div>
  );
}
