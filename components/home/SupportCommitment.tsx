import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import CTABand from "@/components/ui/CTABand";

const POINTS = [
  {
    label: "First response",
    value: "Within 4 working hours",
    detail: "Usually sooner. Measured from your first message, not from a triage queue.",
  },
  {
    label: "Support channel",
    value: "WhatsApp, during business hours",
    detail: "The same channel we sell you. If it isn't good enough for us, it isn't good enough for you.",
  },
  {
    label: "Your contact",
    value: "A named person, not a queue",
    detail: "Assigned at your first qualified conversation and kept through onboarding.",
  },
];

export default function SupportCommitment() {
  return (
    <>
      <section className="bg-paper py-24 md:py-28">
        <div className="container max-w-container">
          <Eyebrow index="08" label="Support that replies" />
          <Reveal delay={60}>
            <h2 className="mb-12 max-w-[22ch] font-display text-[28px] font-extrabold tracking-tight text-text-primary md:text-[38px]">
              A named person answers. Not a ticket number.
            </h2>
          </Reveal>

          <Reveal stagger={80} className="grid gap-5 sm:grid-cols-3">
            {POINTS.map((p) => (
              <Reveal key={p.label}>
                <div className="group/point h-full rounded-lg border border-line bg-paper-warm p-7 transition-all duration-base ease-out hover:-translate-y-1 hover:border-lime-200 hover:bg-white hover:shadow-card-sm">
                  <p className="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-lime-forest">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-lime-deep opacity-60 motion-safe:group-hover/point:animate-ping" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime-deep" />
                    </span>
                    {p.label}
                  </p>
                  <p className="mb-2 font-display text-[18px] font-semibold text-text-primary">{p.value}</p>
                  <p className="text-[13.5px] leading-relaxed text-text-muted">{p.detail}</p>
                </div>
              </Reveal>
            ))}
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-8 font-mono text-[12.5px] text-text-muted">
              Published because it is operationally true — not because it reads well.
            </p>
          </Reveal>
        </div>
      </section>

      <CTABand
        title="Ready to send your first message?"
        supporting="Talk to us, or start building against the sandbox today."
        cta="Book a demo"
        href="/contact"
      />
    </>
  );
}
