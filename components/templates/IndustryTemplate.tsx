import Link from "next/link";
import type { IndustryPage } from "@/lib/types";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Callout from "@/components/ui/Callout";
import CTABand from "@/components/ui/CTABand";
import Backdrop from "@/components/motion/Backdrop";
import { getPageSeo } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export default function IndustryTemplate({ data, resolveLabel }: { data: IndustryPage; resolveLabel: (slug: string) => string }) {
  const seo = getPageSeo(data.slug);
  return (
    <div>
      <BreadcrumbJsonLd items={[{ name: "Home", slug: "/" }, { name: "Industries", slug: "/industries" }, { name: data.name, slug: data.slug }]} />
      <section className="relative overflow-hidden bg-paper-warm -mt-[var(--nav-h)] pt-[calc(var(--nav-h)+40px)] pb-16 md:pb-24">
        <Backdrop tone="light" variant="grid" />
        <div className="container max-w-container relative">
          <Reveal variant="fall">
            <Breadcrumb items={[{ label: "Industries", href: "/industries" }, { label: data.name }]} />
          </Reveal>
          <Reveal delay={60}>
            <span className="inline-flex items-center gap-1.5 mb-4 text-[12px] font-display font-semibold uppercase tracking-wide text-lime-forest bg-lime-100 px-2.5 py-1 rounded-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-lime-deep" aria-hidden />
              {data.group}
            </span>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="font-display font-extrabold text-text-primary text-[28px] md:text-[44px] tracking-tight max-w-[22ch] text-balance">
              How {data.name.toLowerCase()} messages customers
            </h1>
          </Reveal>
          {seo?.intro && (
            <Reveal delay={180}>
              <p className="mt-6 max-w-[62ch] text-[16px] md:text-[17px] leading-relaxed text-text-secondary">{seo.intro}</p>
            </Reveal>
          )}
        </div>
      </section>

      <section className="py-20 md:py-24 bg-paper">
        <div className="container max-w-container">
          <Reveal>
            <Eyebrow index="01" label="Real scenarios" />
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-5">
            {data.scenarios.map((s, i) => (
              <Reveal
                key={s.moment}
                delay={i * 70}
                className="group/card rounded-md border border-line bg-paper-warm p-6 transition-all duration-base ease-out hover:-translate-y-1 hover:border-lime-200 hover:bg-white hover:shadow-card-sm"
              >
                <h3 className="font-display font-semibold text-[16px] text-text-primary mb-1.5 flex items-center gap-2">
                  <span
                    aria-hidden
                    className="h-px w-4 origin-left rounded-full bg-lime-deep transition-transform duration-base ease-out group-hover/card:scale-x-150"
                  />
                  {s.moment}
                </h3>
                <p className="text-[14.5px] text-text-secondary leading-relaxed">{s.detail}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-paper-warm">
        <div className="container max-w-container">
          <Reveal>
            <Eyebrow index="02" label="Channel mix" />
          </Reveal>
          <Reveal delay={80} className="rounded-lg border border-line overflow-x-auto bg-white">
            <table className="w-full text-left min-w-[560px]">
              <thead className="sticky top-0 z-10 bg-paper-warm/95 backdrop-blur">
                <tr className="border-b border-line">
                  {["Moment", "Channel", "Why"].map((h) => (
                    <th key={h} className="px-6 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-text-muted">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {data.channelMix.map((row) => (
                  <tr key={row.moment} className="group/row transition-colors duration-fast hover:bg-lime-050">
                    <td className="px-6 py-4 text-[14.5px] font-medium text-text-primary">{row.moment}</td>
                    <td className="px-6 py-4 text-[14px] text-lime-forest font-display font-semibold">{row.channel}</td>
                    <td className="px-6 py-4 text-[14px] text-text-secondary">{row.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-paper">
        <div className="container max-w-container-narrow">
          <Reveal>
            <Eyebrow index="03" label="Sector compliance notes" />
          </Reveal>
          <div className="space-y-4">
            {data.complianceNotes.map((note, i) => (
              <Reveal key={note} variant="left" delay={i * 80}>
                <Callout variant="compliance">{note}</Callout>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-paper-warm">
        <div className="container max-w-container">
          <Reveal>
            <Eyebrow index="04" label="Template pack" />
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.templatePack.map((t, i) => (
              <Reveal
                key={t.title}
                delay={i * 60}
                className="group/tpl rounded-md border border-line bg-white p-5 transition-all duration-base ease-out hover:-translate-y-1 hover:border-lime-200 hover:shadow-card-sm"
              >
                <p className="font-display font-semibold text-[14px] text-text-primary mb-2">{t.title}</p>
                <p className="font-mono text-[13px] text-text-secondary leading-relaxed">{t.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-paper">
        <div className="container max-w-container-narrow">
          <Reveal>
            <Eyebrow index="05" label="Integration notes" />
          </Reveal>
          <ul className="grid sm:grid-cols-2 gap-3.5">
            {data.integrations.map((item, i) => (
              <Reveal as="li" key={item} delay={i * 60} className="group/item flex gap-3.5 text-[15px] text-text-secondary">
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

      <section className="py-16 md:py-20 bg-paper-warm">
        <div className="container max-w-container">
          <Reveal>
            <Eyebrow index="06" label="Related solutions" />
          </Reveal>
          <div className="flex flex-wrap gap-3">
            {data.relatedSolutions.map((slug, i) => (
              <Reveal key={slug} variant="scale" delay={i * 70}>
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

      <CTABand title={`Talk to us about ${data.name.toLowerCase()}`} supporting="We'll map your moments to the right channel mix." />
    </div>
  );
}
