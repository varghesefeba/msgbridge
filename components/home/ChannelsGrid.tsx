import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";

type Channel = {
  name: string;
  href: string;
  color: string;
  desc: string;
  glyph: React.ReactNode;
};

const CHANNELS: Channel[] = [
  {
    name: "WhatsApp",
    href: "/whatsapp-business-api",
    color: "#25D366",
    desc: "Templates, sessions and a team inbox on the official Business API.",
    glyph: (
      <path d="M4 16.5 4.9 13A6.6 6.6 0 1 1 7.6 15.6L4 16.5Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    ),
  },
  {
    name: "SMS",
    href: "/sms/otp",
    color: "#53BDEB",
    desc: "OTP, transactional and promotional routes, DLT-registered.",
    glyph: <path d="M3.5 5.5h13v8h-7l-3.5 3v-3h-2.5Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />,
  },
  {
    name: "RCS",
    href: "/rcs",
    color: "#3D82F5",
    desc: "Rich cards and carousels in the native messages app.",
    glyph: (
      <path
        d="M10 3.4c4.2 0 7.6 2.5 7.6 5.8 0 3.2-3.4 5.8-7.6 5.8-.8 0-1.6-.1-2.4-.3L4 16.6l1-3.3C3.6 12.1 2.4 10.6 2.4 9.2 2.4 5.9 5.8 3.4 10 3.4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    ),
  },
  {
    name: "Voice & IVR",
    href: "/voice/tts",
    color: "#FF9A3E",
    desc: "Text-to-speech calls, press-1 campaigns and IVR trees.",
    glyph: (
      <path
        d="M6 3.8c.7 0 1 .4 1.3 1l.7 1.6c.2.6.1 1-.3 1.4l-.7.6a8 8 0 0 0 3.6 3.6l.6-.7c.4-.4.8-.5 1.4-.3l1.6.7c.6.3 1 .6 1 1.3 0 1.6-1.3 2.8-2.9 2.6A11.4 11.4 0 0 1 3.4 6.7 2.7 2.7 0 0 1 6 3.8Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    ),
  },
];

export default function ChannelsGrid() {
  return (
    <section className="relative bg-paper py-24 md:py-28">
      <div className="container max-w-container">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow index="04" label="Channels" />
            <Reveal delay={60}>
              <h2 className="max-w-[22ch] font-display text-[28px] font-extrabold tracking-tight text-text-primary md:text-[38px]">
                Four channels. One contract, one invoice, one team to call.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <Link
              href="/contact"
              className="group/link inline-flex items-center gap-2 font-display text-[13px] font-semibold uppercase tracking-wide text-lime-forest"
            >
              <span className="underline-grow">Talk to us</span>
              <span aria-hidden className="transition-transform duration-base group-hover/link:translate-x-1">
                →
              </span>
            </Link>
          </Reveal>
        </div>

        <Reveal stagger={70} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CHANNELS.map((c) => (
            <Reveal key={c.name}>
              <Link
                href={c.href}
                className="group/card relative flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white p-6 transition-all duration-base ease-out hover:-translate-y-1 hover:border-transparent hover:shadow-card"
                style={{ ["--ch" as string]: c.color }}
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[3px] w-10 origin-left transition-transform duration-base ease-out group-hover/card:scale-x-[10]"
                  style={{ background: c.color }}
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-slow group-hover/card:opacity-100"
                  style={{ background: c.color }}
                />

                <span
                  className="mb-5 mt-1 flex h-11 w-11 items-center justify-center rounded-md transition-transform duration-base ease-out group-hover/card:-translate-y-0.5 group-hover/card:scale-105"
                  style={{ background: `${c.color}1A`, color: c.color }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
                    {c.glyph}
                  </svg>
                </span>

                <h3 className="mb-1.5 font-display text-[16px] font-semibold text-text-primary">{c.name}</h3>
                <p className="mb-6 text-[13.5px] leading-relaxed text-text-muted">{c.desc}</p>

                <span className="mt-auto inline-flex items-center gap-1.5 font-display text-[12px] font-semibold uppercase tracking-wide text-text-muted transition-colors duration-base group-hover/card:text-lime-forest">
                  Learn more
                  <span aria-hidden className="transition-transform duration-base ease-out group-hover/card:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
