"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import Backdrop from "@/components/motion/Backdrop";
import { useReducedMotion } from "@/lib/motion";

const STAGES = [
  { title: "Entity registration", detail: "Your business registered as a Principal Entity.", owner: "We file it" },
  { title: "Header approval", detail: "A 6-character sender ID drafted and submitted.", owner: "We draft it" },
  { title: "Content templates", detail: "Variables declared correctly the first time.", owner: "We write them" },
  { title: "TM chain binding", detail: "Templates bound to your entity and header.", owner: "We confirm it" },
];

export default function DltHandled() {
  const listRef = useRef<HTMLOListElement>(null);
  const nodeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [progress, setProgress] = useState(0);
  const [fracs, setFracs] = useState<number[]>([]);
  const reduced = useReducedMotion();

  // Measure each node's vertical centre as a fraction of the spine, so the
  // fill lights a node exactly when it reaches it — regardless of row height.
  useEffect(() => {
    const measure = () => {
      const list = listRef.current;
      if (!list) return;
      const box = list.getBoundingClientRect();
      const h = box.height || 1;
      setFracs(
        nodeRefs.current.map((n) => {
          if (!n) return 1;
          const r = n.getBoundingClientRect();
          return (r.top + r.height / 2 - box.top) / h;
        })
      );
    };
    measure();
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 250); // after web fonts settle
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, []);

  // Drive the spine fill from scroll position.
  useEffect(() => {
    if (reduced) {
      setProgress(1);
      return;
    }
    const list = listRef.current;
    if (!list) return;
    let frame = 0;
    const compute = () => {
      frame = 0;
      const rect = list.getBoundingClientRect();
      const line = window.innerHeight * 0.62;
      const raw = (line - rect.top) / (rect.height || 1);
      setProgress(Math.max(0, Math.min(1, raw)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced]);

  const doneCount = fracs.filter((f) => progress >= f - 0.02).length;

  return (
    <section className="relative overflow-hidden bg-ink py-24 md:py-28">
      <Backdrop variant="grid" tone="dark" />

      <div className="container relative max-w-container">
        <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Eyebrow index="06" label="DLT, handled" dark />
            <Reveal delay={60}>
              <h2 className="max-w-[20ch] font-display text-[28px] font-extrabold tracking-tight text-on-dark md:text-[38px]">
                The paperwork that makes everyone switch providers.
              </h2>
            </Reveal>
            <Reveal delay={130}>
              <p className="mt-4 max-w-[52ch] text-[16.5px] text-on-dark-3">
                Entity, header, templates, TM chain binding — run in parallel with your build, not after you hit a wall.
              </p>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <Button
              href="/compliance"
              variant="secondary"
              arrow
              className="shrink-0 !border-ink-line !text-on-dark hover:!border-lime hover:!bg-white/[0.04]"
            >
              Read the guide
            </Button>
          </Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-[auto_1fr] md:items-start">
          {/* Progress counter — reads the same scroll state as the spine */}
          <Reveal className="hidden md:block">
            <div className="sticky top-28 w-[168px] rounded-lg border border-ink-line bg-white/[0.02] p-5">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-on-dark-5">Filed for you</p>
              <p className="mt-2 font-display text-[40px] font-extrabold leading-none text-on-dark tabular-nums">
                {doneCount}
                <span className="text-on-dark-6">/{STAGES.length}</span>
              </p>
              <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/10">
                <span
                  className="block h-full rounded-full bg-gradient-to-r from-lime-deep to-lime transition-[width] duration-300 ease-out"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
              <p className="mt-3 text-[12px] leading-relaxed text-on-dark-5">Every step handled before you go live.</p>
            </div>
          </Reveal>

          {/* Scroll-driven timeline */}
          <ol ref={listRef} className="relative max-w-[640px]">
            {/* faint full-height track */}
            <span aria-hidden className="absolute left-[21px] top-3 bottom-3 w-0.5 -translate-x-1/2 rounded-full bg-white/10" />
            {/* green fill grows with scroll */}
            <span
              aria-hidden
              className="absolute left-[21px] top-3 w-0.5 -translate-x-1/2 rounded-full bg-gradient-to-b from-lime via-lime to-lime-deep"
              style={{
                height: `calc((100% - 24px) * ${progress})`,
                boxShadow: progress > 0 ? "0 0 16px 1px rgba(175,255,73,0.45)" : "none",
              }}
            />
            {/* leading dot at the fill frontier */}
            {progress > 0.01 && progress < 0.99 && (
              <span
                aria-hidden
                className="absolute left-[21px] z-20 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime"
                style={{ top: `calc(12px + (100% - 24px) * ${progress})`, boxShadow: "0 0 14px 3px rgba(175,255,73,0.8)" }}
              />
            )}

            {STAGES.map((s, i) => {
              const done = i < doneCount;
              return (
                <li key={s.title} className="relative flex items-start gap-5 pb-11 last:pb-0">
                  <span
                    ref={(el) => {
                      nodeRefs.current[i] = el;
                    }}
                    className={`relative z-10 flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full border-2 transition-all duration-slow ease-out ${
                      done
                        ? "border-lime bg-lime shadow-[0_0_20px_-2px_rgba(175,255,73,0.7)]"
                        : "border-ink-line bg-ink"
                    }`}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden
                      className={`transition-all duration-slow ${done ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}
                    >
                      <path d="M3 8.4l3.4 3.3L13 5" stroke="#0A0B0D" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span
                      aria-hidden
                      className={`absolute h-1.5 w-1.5 rounded-full bg-on-dark-5 transition-opacity duration-slow ${done ? "opacity-0" : "opacity-100"}`}
                    />
                  </span>

                  <div className={`pt-1 transition-all duration-slow ease-out ${done ? "opacity-100" : "opacity-45"}`}>
                    <p className="mb-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-lime">
                      {String(i + 1).padStart(2, "0")} · {s.owner}
                    </p>
                    <h3 className="mb-1 font-display text-[17px] font-semibold text-on-dark">{s.title}</h3>
                    <p className="max-w-[46ch] text-[14px] leading-relaxed text-on-dark-4">{s.detail}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <Reveal delay={120}>
          <p className="mt-12 font-mono text-[12.5px] text-on-dark-5">
            Operator and regulator queues are outside anyone&rsquo;s control — we tell you the realistic wait, not the
            best case.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
