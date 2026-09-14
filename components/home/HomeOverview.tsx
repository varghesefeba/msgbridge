import Link from "next/link";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

const FAMILIES: { name: string; href: string; blurb: string }[] = [
  {
    name: "SMS API",
    href: "/sms/otp",
    blurb:
      "DLT-registered routes for OTP, transactional and promotional SMS, with delivery reports returned to your systems.",
  },
  {
    name: "WhatsApp Business API",
    href: "/whatsapp-business-api",
    blurb:
      "Send approved templates, run 24-hour service conversations and automate chats with a chatbot and live-agent handover.",
  },
  {
    name: "RCS Business Messaging",
    href: "/rcs",
    blurb:
      "Branded sender identity, rich cards, carousels and suggested actions, with fallback where RCS is unavailable.",
  },
  {
    name: "Voice API",
    href: "/voice/otp",
    blurb:
      "Automated voice OTP, text-to-speech alerts, IVR menus and Press-1 campaigns connected to your workflow.",
  },
  {
    name: "Verification",
    href: "/solutions/otp-verification",
    blurb:
      "One verification flow across SMS, WhatsApp and voice fallback so more users complete login and signup.",
  },
  {
    name: "DLT & TRAI compliance",
    href: "/compliance",
    blurb:
      "Entity registration, header approval, template registration and consent handling for messaging in India.",
  },
];

/**
 * Crawlable, plain-language overview of the platform's APIs with internal links
 * to every product family — the on-page text the SEO blueprint asks the homepage
 * to add around its visual sections.
 */
export default function HomeOverview() {
  return (
    <section className="py-20 md:py-24 bg-paper">
      <div className="container max-w-container">
        <Reveal>
          <Eyebrow index="01" label="Business messaging APIs for India" />
        </Reveal>
        <Reveal delay={80}>
          <h2 className="font-display font-extrabold text-text-primary text-[26px] md:text-[34px] tracking-tight max-w-[22ch] text-balance">
            One platform for SMS, WhatsApp, RCS, voice and verification
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-5 max-w-[68ch] text-[16px] md:text-[17px] leading-relaxed text-text-secondary">
            MsgBridge is a business messaging platform for Indian companies that need to send transactional messages,
            one-time passwords, alerts, reminders and customer conversations. Each channel is available through an API,
            so you can send the right message on the right channel — SMS for near-universal reach, WhatsApp for rich
            two-way conversations, RCS for branded interactive messages, and voice for reminders or verification
            fallback when a message goes unread.
          </p>
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FAMILIES.map((f, i) => (
            <Reveal key={f.href} delay={i * 60}>
              <Link
                href={f.href}
                className="group/card block h-full rounded-md border border-line bg-paper-warm p-6 transition-all duration-base ease-out hover:-translate-y-1 hover:border-lime-deep hover:bg-white hover:shadow-card-sm"
              >
                <h3 className="font-display font-semibold text-[16px] text-text-primary mb-2 flex items-center gap-2">
                  {f.name}
                  <span aria-hidden className="text-lime-forest transition-transform duration-base ease-out group-hover/card:translate-x-1">
                    →
                  </span>
                </h3>
                <p className="text-[14.5px] text-text-secondary leading-relaxed">{f.blurb}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
