import type { CSSProperties, ReactNode } from "react";
import Marquee from "@/components/motion/Marquee";

/** Each system: brand accent + a monoline (stroke) icon. The icon reads as a
 *  line drawing at rest and turns its brand colour on hover (pure CSS). */
type System = { name: string; color: string; icon: ReactNode };

const SYSTEMS: System[] = [
  {
    name: "Shopify",
    color: "#95BF47",
    icon: (
      <>
        <path d="M6 8h12l-1 12H7L6 8Z" />
        <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
      </>
    ),
  },
  {
    name: "WooCommerce",
    color: "#9B5C8F",
    icon: (
      <>
        <circle cx="9.5" cy="20" r="1.1" />
        <circle cx="17" cy="20" r="1.1" />
        <path d="M3 4h2l2.2 11h10l1.8-7H6.5" />
      </>
    ),
  },
  {
    name: "Zoho CRM",
    color: "#E42527",
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <circle cx="9" cy="11" r="2" />
        <path d="M6 16c.6-1.7 2-2.5 3-2.5s2.4.8 3 2.5" />
        <path d="M14.5 10.5h3.5M14.5 13.5h2.5" />
      </>
    ),
  },
  {
    name: "Salesforce",
    color: "#00A1E0",
    icon: <path d="M8 17h8a3 3 0 0 0 .4-5.97A4.5 4.5 0 0 0 8 10.2 3.4 3.4 0 0 0 8 17Z" />,
  },
  {
    name: "HubSpot",
    color: "#FF7A59",
    icon: (
      <>
        <circle cx="7" cy="12" r="2.5" />
        <circle cx="16" cy="7" r="1.8" />
        <circle cx="16" cy="17" r="1.8" />
        <path d="M9.2 10.9 14.4 8M9.2 13.1 14.4 16" />
      </>
    ),
  },
  {
    name: "Tally",
    color: "#4C6EF5",
    icon: (
      <>
        <path d="M7 4h7l3.5 3.5V20H7Z" />
        <path d="M14 4v4h3.5" />
        <path d="M9.5 12h5M9.5 15h5" />
      </>
    ),
  },
  {
    name: "Razorpay",
    color: "#3395FF",
    icon: (
      <>
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <path d="M3 10h18" />
        <path d="M12.6 12.4 10.6 15.4h2.2L11.2 18" />
      </>
    ),
  },
  {
    name: "Freshworks",
    color: "#FF5B2E",
    icon: <path d="M12 4c3.6 1.8 5.5 4.6 5.5 8.2A5.5 5.5 0 1 1 6.5 12.2C6.5 8.6 8.4 5.8 12 4Z" />,
  },
  {
    name: "Zapier",
    color: "#FF4A00",
    icon: <path d="M12 3.5v17M3.5 12h17M6.2 6.2l11.6 11.6M17.8 6.2 6.2 17.8" />,
  },
  {
    name: "Custom webhooks",
    color: "#AFFF49",
    icon: (
      <>
        <path d="M10 14a3.5 3.5 0 0 0 5 0l2-2a3.5 3.5 0 0 0-5-5l-1 1" />
        <path d="M14 10a3.5 3.5 0 0 0-5 0l-2 2a3.5 3.5 0 0 0 5 5l1-1" />
      </>
    ),
  },
  {
    name: "REST API",
    color: "#7C5CFF",
    icon: (
      <>
        <path d="M8.5 6 4 12l4.5 6" />
        <path d="M15.5 6 20 12l-4.5 6" />
        <path d="M13.5 5 10.5 19" />
      </>
    ),
  },
  {
    name: "Google Sheets",
    color: "#34A853",
    icon: (
      <>
        <path d="M7 3h7l4 4v14H7Z" />
        <path d="M14 3v4h4" />
        <rect x="9.5" y="11" width="6" height="6" rx="0.5" />
        <path d="M9.5 14h6M12.5 11v6" />
      </>
    ),
  },
];

function SystemChip({ name, color, icon }: System) {
  return (
    <span
      className="group/sys flex shrink-0 items-center gap-3 rounded-md border border-ink-line bg-white/[0.02] px-4 py-3 text-on-dark-4 transition-colors duration-base hover:border-[color:var(--brand)] hover:bg-white/[0.05] hover:text-on-dark"
      style={{ ["--brand" as string]: color } as CSSProperties}
    >
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        className="shrink-0 text-on-dark-5 transition-all duration-base ease-out group-hover/sys:-translate-y-px group-hover/sys:scale-110 group-hover/sys:text-[color:var(--brand)]"
      >
        {icon}
      </svg>
      <span className="font-display text-[15px] font-semibold">{name}</span>
    </span>
  );
}

export default function IntegrationMarquee() {
  return (
    <section className="border-y border-ink-line bg-ink py-12 md:py-16">
      <div className="container flex max-w-container flex-col gap-8 md:flex-row md:items-center md:gap-12">
        <p className="shrink-0 text-center font-mono text-[12px] uppercase leading-relaxed tracking-[0.14em] text-on-dark-5 md:max-w-[15ch] md:text-left">
          Connects to the systems you already run
        </p>

        <Marquee className="min-w-0 flex-1" duration={46} gap={16}>
          {SYSTEMS.map((s) => (
            <SystemChip key={s.name} {...s} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
