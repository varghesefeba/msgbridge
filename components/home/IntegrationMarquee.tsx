import Marquee from "@/components/motion/Marquee";

const SYSTEMS = [
  "Shopify",
  "WooCommerce",
  "Zoho CRM",
  "Salesforce",
  "HubSpot",
  "Tally",
  "Razorpay",
  "Freshworks",
  "Zapier",
  "Custom webhooks",
  "REST API",
  "Google Sheets",
];

export default function IntegrationMarquee() {
  return (
    <section className="border-y border-ink-line bg-ink py-7">
      <div className="container flex max-w-container flex-col items-center gap-6 md:flex-row md:gap-10">
        <p className="shrink-0 text-center font-mono text-[11.5px] uppercase leading-relaxed tracking-[0.14em] text-on-dark-5 md:max-w-[16ch] md:text-left">
          Connects to the systems you already run
        </p>

        <Marquee className="min-w-0 flex-1" duration={42} gap={40}>
          {SYSTEMS.map((s) => (
            <span
              key={s}
              className="group/sys flex shrink-0 items-center gap-2.5 font-display text-[15px] font-semibold text-on-dark-4 transition-colors duration-base hover:text-on-dark"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-ink-line transition-colors duration-base group-hover/sys:bg-lime" />
              {s}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
