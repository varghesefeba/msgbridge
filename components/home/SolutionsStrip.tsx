import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";

const CHANNEL_TONE: Record<string, { bg: string; fg: string; dot: string }> = {
  sms: { bg: "rgba(83,189,235,0.14)", fg: "#027EB5", dot: "#53BDEB" },
  whatsapp: { bg: "rgba(37,211,102,0.13)", fg: "#1b9950", dot: "#25D366" },
  rcs: { bg: "rgba(61,130,245,0.12)", fg: "#3D82F5", dot: "#3D82F5" },
  voice: { bg: "rgba(255,154,62,0.15)", fg: "#b95f00", dot: "#FF9A3E" },
  ai: { bg: "rgba(124,92,255,0.12)", fg: "#7C5CFF", dot: "#7C5CFF" },
};

const ITEMS = [
  { name: "OTP & Verification", href: "/solutions/otp-verification", chips: ["sms", "whatsapp", "voice"] },
  { name: "Alerts & Notifications", href: "/solutions/alerts", chips: ["sms", "whatsapp"] },
  { name: "Marketing Campaigns", href: "/solutions/marketing", chips: ["whatsapp", "sms", "rcs"] },
  { name: "Customer Support", href: "/solutions/support", chips: ["whatsapp", "ai"] },
  { name: "Conversational Commerce", href: "/solutions/commerce", chips: ["whatsapp", "rcs"] },
  { name: "Payment Reminders", href: "/solutions/payment-reminders", chips: ["sms", "voice"] },
];

export default function SolutionsStrip() {
  return (
    <section className="bg-paper-warm py-24 md:py-28">
      <div className="container max-w-container">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow index="08" label="Solutions" />
            <Reveal delay={60}>
              <h2 className="max-w-[22ch] font-display text-[28px] font-extrabold tracking-tight text-text-primary md:text-[38px]">
                Six moments, matched to the right channel.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={130}>
            <Link
              href="/industries"
              className="group/link inline-flex items-center gap-2 font-display text-[13px] font-semibold uppercase tracking-wide text-lime-forest"
            >
              <span className="underline-grow">Browse by industry</span>
              <span aria-hidden className="transition-transform duration-base group-hover/link:translate-x-1">
                →
              </span>
            </Link>
          </Reveal>
        </div>

        <Reveal stagger={60} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item) => (
            <Reveal key={item.name}>
              <Link
                href={item.href}
                className="group/sol flex h-full flex-col justify-between rounded-lg border border-line bg-white p-6 transition-all duration-base ease-out hover:-translate-y-1 hover:border-lime-200 hover:shadow-card-sm"
              >
                <h3 className="mb-4 flex items-start justify-between gap-3 font-display text-[16px] font-semibold text-text-primary">
                  <span className="transition-colors duration-base group-hover/sol:text-lime-forest">{item.name}</span>
                  <span
                    aria-hidden
                    className="shrink-0 translate-x-[-4px] text-lime-forest opacity-0 transition-all duration-base group-hover/sol:translate-x-0 group-hover/sol:opacity-100"
                  >
                    →
                  </span>
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {item.chips.map((c, i) => {
                    const tone = CHANNEL_TONE[c];
                    return (
                      <span
                        key={c}
                        className="inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 font-display text-[11.5px] font-semibold uppercase tracking-wide transition-transform duration-base ease-out group-hover/sol:-translate-y-0.5"
                        style={{ background: tone.bg, color: tone.fg, transitionDelay: `${i * 40}ms` }}
                      >
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: tone.dot }} />
                        {c}
                      </span>
                    );
                  })}
                </div>
              </Link>
            </Reveal>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
