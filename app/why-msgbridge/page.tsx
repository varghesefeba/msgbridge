import type { Metadata } from "next";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import CTABand from "@/components/ui/CTABand";

export const metadata: Metadata = {
  title: "Why MsgBridge",
  description: "One contract across five channels, DLT handled, transparent pricing, and a named person who answers.",
  alternates: { canonical: "/why-msgbridge" },
};

const REASONS = [
  { title: "One contract, five channels", detail: "SMS, WhatsApp, RCS, Voice and AI under a single integration and invoice, not five separate vendor relationships." },
  { title: "DLT, handled", detail: "Entity registration, header, content templates and TM chain binding run in parallel with your build, not after you hit a wall." },
  { title: "Delivery you can prove", detail: "Carrier-grade delivery through our operator partners, with operator-end delivery reports available over the API." },
  { title: "Transparent pricing", detail: "Every rate is published on the pricing page. No wall, no mandatory sales call to see a number." },
  { title: "A named person answers", detail: "Support on WhatsApp with a stated response-time commitment — not a ticket number." },
  { title: "MsgBridge Verify", detail: "Cascading OTP delivery across SMS, WhatsApp and voice, in one API call — the one thing in this catalogue a competitor can't match by shaving a paisa off an SMS rate." },
];

export default function WhyPage() {
  return (
    <div>
      <section className="relative overflow-hidden -mt-[var(--nav-h)] pt-[calc(var(--nav-h)+40px)] bg-paper-warm pb-16">
        <div className="container max-w-container">
          <Breadcrumb items={[{ label: "Why MsgBridge" }]} />
          <Eyebrow index="00" label="Why MsgBridge" />
          <h1 className="font-display font-extrabold text-text-primary text-[30px] md:text-[48px] tracking-tight max-w-[20ch]">
            Six reasons teams switch to us.
          </h1>
        </div>
      </section>
      <section className="py-16 bg-paper">
        <div className="container max-w-container grid sm:grid-cols-2 gap-6">
          {REASONS.map((r, i) => (
            <Reveal key={r.title} delay={i * 60} className="rounded-md border border-line bg-white p-7">
              <h2 className="font-display font-semibold text-[18px] text-text-primary mb-2">{r.title}</h2>
              <p className="text-[15px] text-text-secondary leading-relaxed">{r.detail}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <CTABand title="See it for yourself" supporting="Book a demo or start building against the sandbox." />
    </div>
  );
}
