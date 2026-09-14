import Link from "next/link";
import type { ProductPage } from "@/lib/types";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import DeviceMessage from "@/components/ui/DeviceMessage";
import CodeCard from "@/components/ui/CodeCard";
import Stepper from "@/components/ui/Stepper";
import Accordion from "@/components/ui/Accordion";
import CTABand from "@/components/ui/CTABand";
import Callout from "@/components/ui/Callout";
import Backdrop from "@/components/motion/Backdrop";
import { getPageSeo } from "@/lib/seo";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";

const channelColor: Record<string, string> = {
  WhatsApp: "#25D366",
  SMS: "#53BDEB",
  Voice: "#FF9A3E",
  RCS: "#3D82F5",
  Numbers: "#7C5CFF",
  Verify: "#AFFF49",
};

export default function ProductTemplate({ data, resolveLabel }: { data: ProductPage; resolveLabel: (slug: string) => string }) {
  const color = channelColor[data.category] ?? "#AFFF49";
  const fileSlug = data.slug.replace(/^\//, "").replace(/\//g, "-");
  const seo = getPageSeo(data.slug);

  return (
    <div>
      <BreadcrumbJsonLd
        items={[{ name: "Home", slug: "/" }, { name: data.category }, { name: data.name, slug: data.slug }]}
      />
      <FaqJsonLd items={data.faq} />
      <section className="relative overflow-hidden bg-paper-warm -mt-[var(--nav-h)] pt-[calc(var(--nav-h)+40px)] pb-16 md:pb-24">
        <Backdrop tone="light" variant="grid" />
        <div className="container max-w-container relative">
          <Reveal variant="fall">
            <Breadcrumb items={[{ label: "Products", href: "/" }, { label: data.category }, { label: data.name }]} />
          </Reveal>

          {data.draft && (
            <Reveal delay={60}>
              <Callout variant="note">
                This page describes MsgBridge&rsquo;s intended offering for {data.name.toLowerCase()}. Some operational details are
                confirmed with our platform partner before go-live.
              </Callout>
            </Reveal>
          )}

          <div className="mt-6">
            <Reveal variant="clip">
              <span className="block h-[3px] w-14 mb-5 rounded-full" style={{ background: color }} />
            </Reveal>
            <Reveal delay={80}>
              <h1 className="font-display font-extrabold text-text-primary text-[30px] md:text-[48px] tracking-tight max-w-[22ch] text-balance">
                {data.oneLiner}
              </h1>
            </Reveal>
            {seo?.intro && (
              <Reveal delay={140}>
                <p className="mt-6 max-w-[62ch] text-[16px] md:text-[17px] leading-relaxed text-text-secondary">
                  {seo.intro}
                </p>
              </Reveal>
            )}
            <Reveal delay={200}>
              <p className="mt-6 flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.14em] text-text-muted">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
                {data.category}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-paper">
        <div className="container max-w-container grid lg:grid-cols-2 gap-12 items-center">
          <Reveal variant="left">
            <Eyebrow index="02" label="Live example" />
            <p className="text-[15px] text-text-secondary mb-8 max-w-[46ch]">
              This is what {data.name.toLowerCase()} looks like when it lands on a customer&rsquo;s phone.
            </p>
            <Reveal variant="scale" delay={120}>
              <DeviceMessage example={data.example} />
            </Reveal>
          </Reveal>

          <Reveal variant="right" delay={80}>
            <Eyebrow index="03" label="The API call" />
            <p className="text-[15px] text-text-secondary mb-8 max-w-[46ch]">One request. Copy it, drop in your key, and send.</p>
            <CodeCard code={data.api} filename={`${fileSlug}.sh`} />
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-paper-warm">
        <div className="container max-w-container grid md:grid-cols-2 gap-12">
          <Reveal variant="left">
            <Eyebrow index="04" label="When to use it" />
            <ul className="space-y-3.5">
              {data.whenToUse.map((item, i) => (
                <Reveal as="li" key={item} delay={i * 70} className="group/item flex gap-3.5 text-[15.5px] text-text-secondary">
                  <span
                    aria-hidden
                    className="mt-[0.62em] h-px w-5 shrink-0 origin-left rounded-full bg-lime-deep transition-transform duration-base ease-out group-hover/item:scale-x-150"
                  />
                  <span className="transition-colors duration-fast group-hover/item:text-text-primary">{item}</span>
                </Reveal>
              ))}
            </ul>
          </Reveal>

          <Reveal variant="right" delay={70}>
            <Eyebrow index="05" label="What's required" />
            <ul className="space-y-0">
              {data.requirements.map((r, i) => (
                <Reveal
                  as="li"
                  key={r.item}
                  delay={i * 70}
                  className="group/req flex flex-col border-b border-line py-3.5 first:pt-0 last:border-0 transition-colors duration-fast hover:border-lime-200"
                >
                  <span className="font-display font-medium text-[15px] text-text-primary">{r.item}</span>
                  <span className="mt-0.5 font-mono text-[12.5px] text-text-muted">{r.leadTime}</span>
                </Reveal>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-paper">
        <div className="container max-w-container">
          <Reveal>
            <Eyebrow index="06" label="How to go live" />
          </Reveal>
          <Reveal delay={80}>
            <Stepper steps={data.goLive} />
          </Reveal>
        </div>
      </section>

      {data.category === "RCS" && (
        <div className="container max-w-container py-10">
          <Reveal>
            <Callout variant="warning">RCS availability varies by device, network, operator and RCS support.</Callout>
          </Reveal>
        </div>
      )}

      <section className="py-20 md:py-24 bg-paper-warm">
        <div className="container max-w-container">
          <Reveal>
            <Eyebrow index="07" label="Related channels" />
          </Reveal>
          <div className="flex flex-wrap gap-3">
            {data.related.map((slug, i) => (
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

      <section className="py-20 md:py-24 bg-paper">
        <div className="container max-w-container-narrow">
          <Reveal>
            <Eyebrow index="08" label="FAQ" />
          </Reveal>
          <Reveal delay={80}>
            <Accordion items={data.faq} />
          </Reveal>
        </div>
      </section>

      <CTABand title={`Ready to send with ${data.name}?`} supporting="Talk to us, or start building against the sandbox today." />
    </div>
  );
}
