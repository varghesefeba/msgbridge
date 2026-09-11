import type { Metadata } from "next";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import CodeCard from "@/components/ui/CodeCard";
import Accordion from "@/components/ui/Accordion";
import CTABand from "@/components/ui/CTABand";
import Chip from "@/components/ui/Chip";
import VerifyDemo from "@/components/home/VerifyDemo";

export const metadata: Metadata = {
  title: "MsgBridge Verify — cascading OTP delivery",
  description:
    "SMS, then WhatsApp, then a voice call — one API call, until the code lands. MsgBridge Verify is cascading OTP delivery for fintech, e-commerce and healthcare.",
  alternates: { canonical: "/verify" },
};

const CONFIG_ROWS = [
  { label: "Channel order", value: "SMS → WhatsApp → Voice (configurable)" },
  { label: "Per-step timeout", value: "12–20 seconds, set per channel" },
  { label: "Retry count", value: "Up to 2 retries per channel before falling back" },
  { label: "Code length & TTL", value: "4–8 digits, 5–10 minute expiry" },
  { label: "Voice language", value: "en-IN, hi-IN and regional languages" },
];

const FAQ = [
  {
    q: "Is this one API call or three?",
    a: "One call. You send a single verification request and MsgBridge orchestrates the cascade — you don't call SMS, then WhatsApp, then Voice yourself.",
  },
  {
    q: "How do I know which channel actually delivered the code?",
    a: "The completion webhook tells you which channel succeeded, along with timestamps for every attempt in the cascade.",
  },
  {
    q: "Can I skip a channel, like WhatsApp?",
    a: "Yes. Channel order and count are configurable per project — run SMS → Voice only, or WhatsApp-first if that suits your user base.",
  },
  {
    q: "What happens if all channels fail?",
    a: "You get an exhausted-cascade webhook so your product can offer an alternative path, such as a support callback.",
  },
  {
    q: "Does this replace our existing OTP SMS integration?",
    a: "It sits alongside it. Point verification traffic at the Verify endpoint and keep using OTP SMS directly for flows that don't need failover.",
  },
  {
    q: "How is it billed?",
    a: "Per successful verification. Pricing is confirmed on your rate card — see the Pricing page for current rates.",
  },
];

export default function VerifyPage() {
  return (
    <div>
      <section className="relative overflow-hidden -mt-[var(--nav-h)] pt-[calc(var(--nav-h)+40px)] bg-ink pb-20">
        <div className="container max-w-container">
          <Breadcrumb tone="dark" items={[{ label: "Products", href: "/" }, { label: "MsgBridge Verify" }]} />
          <Eyebrow index="00" label="Flagship product" dark />
          <h1 className="font-display font-extrabold text-on-dark text-[32px] md:text-[56px] tracking-tight max-w-[18ch] leading-[1.02]">
            One API call. Three channels. Until the code lands.
          </h1>
          <p className="mt-5 text-[18px] text-on-dark-3 max-w-[54ch]">
            MsgBridge Verify cascades a one-time code across SMS, WhatsApp and voice — so a stuck OTP never costs
            you a signup.
          </p>
        </div>
      </section>

      <VerifyDemo />

      <section className="py-20 bg-paper">
        <div className="container max-w-container-narrow">
          <Eyebrow index="02" label="The problem" />
          <h2 className="font-display font-extrabold text-text-primary text-[26px] md:text-[32px] mb-4">
            SMS OTP delivery doesn&rsquo;t always land.
          </h2>
          <p className="text-[16px] text-text-secondary leading-relaxed max-w-[62ch]">
            Network congestion, DND misconfiguration, a handset with a full inbox, a user roaming abroad — any one
            of these turns a one-time password into an abandoned signup. Every channel has a failure mode. Verify&rsquo;s
            answer is to not depend on just one.
          </p>
        </div>
      </section>

      <section className="py-20 bg-paper-warm">
        <div className="container max-w-container grid lg:grid-cols-2 gap-12">
          <Reveal>
            <Eyebrow index="04" label="The API" />
            <p className="text-[15px] text-text-secondary mb-6 max-w-[46ch]">One request starts the cascade. One webhook tells you how it ended.</p>
            <CodeCard
              code={{
                curl: `curl https://api.msgbridge.in/v1/verify/start \\\n  -H "Authorization: Bearer $API_KEY" \\\n  -d to="+91XXXXXXXXXX" \\\n  -d channels="sms,whatsapp,voice" \\\n  -d code_length="6" \\\n  -d ttl_seconds="300"`,
                node: `const verification = await msgbridge.verify.start({\n  to: "+91XXXXXXXXXX",\n  channels: ["sms", "whatsapp", "voice"],\n  codeLength: 6,\n  ttlSeconds: 300,\n});`,
                python: `verification = msgbridge.verify.start(\n    to="+91XXXXXXXXXX",\n    channels=["sms", "whatsapp", "voice"],\n    code_length=6,\n    ttl_seconds=300,\n)`,
              }}
            />
          </Reveal>
          <Reveal delay={80}>
            <Eyebrow index="05" label="Configuration" />
            <div className="rounded-lg border border-line bg-white divide-y divide-line">
              {CONFIG_ROWS.map((row) => (
                <div key={row.label} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 px-5 py-4">
                  <span className="text-[13.5px] font-display font-semibold uppercase tracking-wide text-text-muted">{row.label}</span>
                  <span className="text-[14.5px] text-text-primary text-right">{row.value}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 bg-paper">
        <div className="container max-w-container">
          <Eyebrow index="06" label="What it costs" />
          <p className="font-display font-extrabold text-text-primary text-[32px] mb-2">Charged per successful verification</p>
          <p className="text-[15px] text-text-secondary max-w-[56ch]">
            Not per attempt — a cascade that tries all three channels costs the same as one that succeeds on SMS.
            See the <a className="text-lime-forest font-medium underline" href="/pricing">pricing page</a> for the
            current rate.
          </p>
        </div>
      </section>

      <section className="py-20 bg-paper-warm">
        <div className="container max-w-container">
          <Eyebrow index="07" label="Who it's for" />
          <div className="flex flex-wrap gap-3">
            {["Fintech", "Banking", "E-commerce", "Healthcare", "Education", "Delivery apps"].map((s) => (
              <Chip key={s} label={s} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-paper">
        <div className="container max-w-container-narrow">
          <Eyebrow index="09" label="FAQ" />
          <Accordion items={FAQ} />
        </div>
      </section>

      <CTABand title="Stop losing signups to a stuck OTP" supporting="Get sandbox credentials for MsgBridge Verify today." cta="Book a demo" />
    </div>
  );
}
