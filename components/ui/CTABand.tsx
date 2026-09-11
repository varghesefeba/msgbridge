import Link from "next/link";
import Reveal from "./Reveal";
import Magnetic from "@/components/motion/Magnetic";

export default function CTABand({
  title,
  supporting,
  cta = "Talk to us",
  href = "/contact",
  variant = "lime",
}: {
  title: string;
  supporting?: string;
  cta?: string;
  href?: string;
  variant?: "lime" | "dark";
}) {
  const isLime = variant === "lime";

  return (
    <section className={`relative overflow-hidden ${isLime ? "bg-lime" : "bg-ink"}`}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 surface-grid opacity-70"
        style={{ ["--grid-color" as string]: isLime ? "rgba(10,11,13,0.06)" : "rgba(255,255,255,0.045)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-28 h-[380px] w-[380px] rounded-full blur-3xl animate-drift"
        style={{ background: isLime ? "rgba(255,255,255,0.45)" : "radial-gradient(circle, rgba(175,255,73,0.18), transparent 65%)" }}
      />

      <div className="container relative flex max-w-container flex-col items-center justify-between gap-7 py-16 text-center md:flex-row md:py-20 md:text-left">
        <div>
          <Reveal>
            <h2
              className={`max-w-[24ch] font-display text-[26px] font-extrabold leading-tight tracking-tight md:text-[36px] ${
                isLime ? "text-ink" : "text-on-dark"
              }`}
            >
              {title}
            </h2>
          </Reveal>
          {supporting && (
            <Reveal delay={80}>
              <p className={`mt-3 max-w-[52ch] text-[16px] ${isLime ? "text-ink/70" : "text-on-dark-3"}`}>{supporting}</p>
            </Reveal>
          )}
        </div>

        <Reveal variant="scale" delay={140} className="shrink-0">
          <Magnetic>
            <Link
              href={href}
              className={`shine-host group/cta inline-flex items-center gap-2.5 rounded-pill px-8 py-4 font-display text-[15px] font-bold uppercase tracking-[0.06em] transition-all duration-fast ease-out active:scale-[0.97] ${
                isLime
                  ? "bg-ink text-lime hover:shadow-[0_18px_40px_-16px_rgba(10,11,13,0.75)]"
                  : "bg-lime text-ink hover:shadow-[0_18px_40px_-14px_rgba(175,255,73,0.85)]"
              }`}
            >
              <span className="relative z-10">{cta}</span>
              <span aria-hidden className="relative z-10 transition-transform duration-base ease-out group-hover/cta:translate-x-1">
                →
              </span>
            </Link>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
