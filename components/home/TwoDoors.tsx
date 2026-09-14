import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";

const DOORS = [
  {
    href: "/developers/quickstart",
    eyebrow: "For developers",
    title: "Quickstart, docs, sandbox",
    body: "Signup to a delivered test message in under five minutes. Six languages, real delivery reports.",
    cta: "Start building",
    dark: true,
    items: ["POST /v1/messages", "DLR webhooks", "Sandbox keys"],
  },
  {
    href: "/solutions/marketing",
    eyebrow: "For business teams",
    title: "Campaigns, templates, reports",
    body: "Ready-to-register DLT templates, campaign tooling, and a named person who answers the phone.",
    cta: "Explore solutions",
    dark: false,
    items: ["Template library", "Delivery reports", "Book a demo"],
  },
];

export default function TwoDoors() {
  return (
    <section className="bg-paper py-24 md:py-28">
      <div className="container max-w-container">
        <Eyebrow index="07" label="Two doors" />
        <Reveal delay={60}>
          <h2 className="mb-12 max-w-[24ch] font-display text-[28px] font-extrabold tracking-tight text-text-primary md:text-[38px]">
            Building the integration, or running the campaigns?
          </h2>
        </Reveal>

        <div className="group/doors grid gap-5 md:grid-cols-2">
          {DOORS.map((door, i) => (
            <Reveal key={door.href} variant={i === 0 ? "left" : "right"} delay={i * 90}>
              <Link
                href={door.href}
                className={`group/door relative flex h-full flex-col overflow-hidden rounded-lg border p-8 transition-all duration-slow ease-out hover:-translate-y-1 md:group-hover/doors:opacity-55 md:hover:!opacity-100 ${
                  door.dark ? "border-ink-line bg-ink shine-host" : "border-line bg-paper-warm"
                }`}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-0 blur-3xl transition-opacity duration-slow group-hover/door:opacity-100"
                  style={{ background: door.dark ? "rgba(175,255,73,0.20)" : "rgba(175,255,73,0.35)" }}
                />

                <p
                  className={`mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] ${
                    door.dark ? "text-lime" : "text-lime-forest"
                  }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${door.dark ? "bg-lime" : "bg-lime-deep"}`} />
                  {door.eyebrow}
                </p>

                <h3 className={`mb-3 font-display text-[22px] font-bold ${door.dark ? "text-on-dark" : "text-text-primary"}`}>
                  {door.title}
                </h3>
                <p className={`mb-7 max-w-[40ch] text-[15px] leading-relaxed ${door.dark ? "text-on-dark-3" : "text-text-secondary"}`}>
                  {door.body}
                </p>

                <ul className="mb-8 flex flex-wrap gap-2">
                  {door.items.map((item) => (
                    <li
                      key={item}
                      className={`rounded-pill px-3 py-1 font-mono text-[11.5px] transition-transform duration-base ease-out group-hover/door:-translate-y-0.5 ${
                        door.dark ? "bg-white/[0.06] text-on-dark-3" : "bg-white text-text-secondary"
                      }`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                <span
                  className={`mt-auto inline-flex items-center gap-2 font-display text-[13px] font-bold uppercase tracking-[0.05em] ${
                    door.dark ? "text-lime" : "text-lime-forest"
                  }`}
                >
                  {door.cta}
                  <span aria-hidden className="transition-transform duration-base ease-out group-hover/door:translate-x-1.5">
                    →
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
