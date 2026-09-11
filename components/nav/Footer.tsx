import Link from "next/link";
import { primaryMenus, footerLegal } from "@/lib/nav";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink pt-20 pb-10 text-on-dark-3">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 surface-grid mask-fade-b"
        style={{ ["--grid-color" as string]: "rgba(255,255,255,0.035)" }}
      />

      <div className="container relative max-w-container">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 border-b border-ink-line pb-14 md:grid-cols-6">
          <div className="col-span-2">
            <Link href="/" className="group/foot inline-flex items-center gap-2.5">
              <svg width="30" height="19" viewBox="0 0 100 62" aria-hidden>
                <path d="M6 56C6 30 30 8 50 8C70 8 94 30 94 56" fill="none" stroke="#AFFF49" strokeWidth="12" strokeLinecap="round" />
                <circle cx="50" cy="8" r="9" fill="#FFFFFF" className="origin-center transition-transform duration-base group-hover/foot:scale-125" />
              </svg>
              <span className="font-display text-[21px] font-extrabold text-white">
                msg<span className="text-lime">bridge</span>
              </span>
            </Link>
            <p className="mt-4 max-w-[28ch] text-[14px] leading-relaxed">
              Reach every customer, on every channel — compliance handled.
            </p>
            <Link
              href="/contact"
              className="group/cta mt-6 inline-flex items-center gap-2 rounded-pill border border-ink-line px-5 py-2.5 font-display text-[12.5px] font-semibold uppercase tracking-wide text-on-dark-2 transition-all duration-base hover:border-lime hover:text-lime"
            >
              Talk to us
              <span aria-hidden className="transition-transform duration-base group-hover/cta:translate-x-1">
                →
              </span>
            </Link>
          </div>

          {primaryMenus.slice(0, 4).map((menu) => (
            <div key={menu.label}>
              <p className="mb-4 font-mono text-[10.5px] uppercase tracking-[0.16em] text-on-dark-5">{menu.label}</p>
              <ul className="space-y-2.5">
                {menu.columns[0].links.slice(0, 5).map((l) => (
                  <li key={`${l.href}|${l.label}`}>
                    <Link
                      href={l.href}
                      className="group/fl inline-flex items-center gap-1.5 text-[13.5px] transition-colors duration-fast hover:text-lime"
                    >
                      <span className="transition-transform duration-base ease-out group-hover/fl:translate-x-0.5">{l.label}</span>
                      <span
                        aria-hidden
                        className="-translate-x-1 text-lime opacity-0 transition-all duration-base group-hover/fl:translate-x-0 group-hover/fl:opacity-100"
                      >
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-7 text-[12.5px] md:flex-row">
          <p>© {new Date().getFullYear()} MsgBridge. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {footerLegal.map((l) => (
              <Link key={l.href} href={l.href} className="underline-grow transition-colors duration-fast hover:text-lime">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <p className="mt-6 max-w-[70ch] font-mono text-[11.5px] leading-relaxed text-on-dark-6">
          MsgBridge delivers messaging through licensed operator and platform partners.
        </p>
      </div>
    </footer>
  );
}
