import type { Metadata } from "next";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import CTABand from "@/components/ui/CTABand";
import Estimator from "@/components/pricing/Estimator";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Transparent per-message, per-conversation and per-second rates for SMS, WhatsApp, Voice and RCS — published, not hidden behind a sales call.",
  alternates: { canonical: "/pricing" },
};

const RATE_CARD = [
  { channel: "SMS — Transactional", unit: "per SMS", rate: "₹0.18" },
  { channel: "SMS — OTP", unit: "per SMS", rate: "₹0.14" },
  { channel: "SMS — Promotional", unit: "per SMS (160 chars / segment)", rate: "₹0.12" },
  { channel: "WhatsApp — Utility", unit: "per conversation", rate: "₹0.30" },
  { channel: "WhatsApp — Marketing", unit: "per conversation", rate: "₹0.78" },
  { channel: "WhatsApp — Authentication", unit: "per conversation", rate: "₹0.35" },
  { channel: "Voice", unit: "per second", rate: "₹0.09" },
  { channel: "RCS", unit: "per message", rate: "₹0.28" },
  { channel: "MsgBridge Verify", unit: "per successful verification", rate: "₹0.60" },
];

const EXTRAS = [
  { item: "DLT registration assistance", price: "Included with onboarding" },
  { item: "WhatsApp business verification support", price: "One-off fee, quoted on the service page" },
  { item: "Chatbot design & build", price: "Quoted per project" },
  { item: "Dedicated short code", price: "One-off setup + monthly rental" },
];

export default function PricingPage() {
  return (
    <div>
      <section className="relative overflow-hidden -mt-[var(--nav-h)] pt-[calc(var(--nav-h)+40px)] bg-paper-warm pb-16">
        <div className="container max-w-container">
          <Breadcrumb items={[{ label: "Pricing" }]} />
          <Eyebrow index="00" label="Pricing" />
          <h1 className="font-display font-extrabold text-text-primary text-[30px] md:text-[48px] tracking-tight max-w-[20ch]">
            Every rate, on the page.
          </h1>
          <p className="mt-4 text-[17px] text-text-secondary max-w-[54ch]">
            No &ldquo;contact sales&rdquo; wall. See what you&rsquo;ll pay, then talk to us about volume pricing if you need it.
          </p>
        </div>
      </section>

      <section className="py-16 bg-paper">
        <div className="container max-w-container">
          <Eyebrow index="01" label="Rate card" />
          <Reveal className="rounded-lg border border-line overflow-hidden overflow-x-auto">
            <table className="w-full text-left min-w-[560px]">
              <thead className="bg-paper-warm">
                <tr>
                  {["Channel", "Billing unit", "Rate"].map((h) => (
                    <th key={h} className="px-6 py-4 text-[13px] font-display font-semibold uppercase tracking-wide text-text-muted">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {RATE_CARD.map((r) => (
                  <tr key={r.channel} className="hover:bg-paper-warm transition-colors duration-instant">
                    <td className="px-6 py-4 font-display font-medium text-[15px] text-text-primary">{r.channel}</td>
                    <td className="px-6 py-4 text-[14px] text-text-muted">{r.unit}</td>
                    <td className="px-6 py-4 font-mono text-[16px] font-medium text-lime-forest">{r.rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
          <p className="mt-4 text-[13px] text-text-muted">
            Rates as of {new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })}. Subject to operator pass-through changes.
            Enterprise volumes get a custom rate — <a href="/contact" className="text-lime-forest underline">talk to us</a>.
          </p>
        </div>
      </section>

      <section className="py-16 bg-paper-warm">
        <div className="container max-w-container grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <Eyebrow index="02" label="Estimate your cost" />
            <h2 className="font-display font-extrabold text-text-primary text-[24px] mb-3">What would this cost you?</h2>
            <p className="text-[15px] text-text-secondary max-w-[46ch]">
              Move the slider and pick your channels. This is indicative — talk to us for a quote matched to your
              actual template categories and volume tier.
            </p>
          </div>
          <Estimator />
        </div>
      </section>

      <section className="py-16 bg-paper">
        <div className="container max-w-container-narrow">
          <Eyebrow index="03" label="What else you might pay for" />
          <div className="rounded-lg border border-line divide-y divide-line bg-white">
            {EXTRAS.map((e) => (
              <div key={e.item} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 px-6 py-4">
                <span className="text-[15px] text-text-primary">{e.item}</span>
                <span className="text-[13.5px] text-text-muted">{e.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand title="Need volume pricing?" supporting="Enterprise and high-volume accounts get a custom rate." cta="Talk to us" />
    </div>
  );
}
