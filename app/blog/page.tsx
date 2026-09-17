import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = { title: "Blog & Guides", description: "Guides on DLT compliance, channel strategy and messaging in India.", alternates: { canonical: "/blog" } };

const POSTS = [
  { slug: "/blog/dlt-registration-checklist", title: "The DLT registration checklist most teams miss", excerpt: "The five things that most often delay approval, and how to avoid each one." },
  { slug: "/blog/whatsapp-vs-sms-otp", title: "WhatsApp OTP vs SMS OTP: which should you use first?", excerpt: "Neither wins outright — here's how to decide, and why cascading both beats picking one." },
  { slug: "/blog/rcs-in-india", title: "Is RCS ready for Indian businesses yet?", excerpt: "What it gets you today, where its reach still falls short of SMS." },
];

export default function BlogIndex() {
  return (
    <div>
      <section className="relative overflow-hidden -mt-[var(--nav-h)] pt-[calc(var(--nav-h)+40px)] bg-paper-warm pb-16">
        <div className="container max-w-container">
          <Reveal variant="fall">
            <Breadcrumb items={[{ label: "Blog" }]} />
          </Reveal>
          <Reveal delay={60}>
            <Eyebrow index="00" label="Blog & guides" />
          </Reveal>
          <Reveal variant="blur" delay={120}>
            <h1 className="font-display font-extrabold text-text-primary text-[30px] md:text-[48px] tracking-tight max-w-[20ch]">
              Guides on compliance and channel strategy.
            </h1>
          </Reveal>
        </div>
      </section>
      <section className="py-16 bg-paper">
        <div className="container max-w-container-narrow grid gap-6">
          {POSTS.map((p, i) => (
            <Reveal key={p.slug} delay={i * 60}>
              <Link href={p.slug} className="group block rounded-md border border-line bg-white p-7 transition-all duration-base ease-out hover:-translate-y-1 hover:border-lime-200 hover:shadow-card-sm">
                <h2 className="font-display font-semibold text-[19px] text-text-primary mb-2 transition-colors group-hover:text-lime-forest">{p.title}</h2>
                <p className="text-[14.5px] text-text-secondary">{p.excerpt}</p>
                <span aria-hidden className="mt-4 block text-lime-forest transition-transform duration-base ease-out group-hover:translate-x-1">→</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
