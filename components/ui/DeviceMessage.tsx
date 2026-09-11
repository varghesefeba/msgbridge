"use client";

import { useEffect, useRef, useState } from "react";
import type { LiveExample } from "@/lib/types";
import { useInView, useReducedMotion } from "@/lib/motion";

const BUBBLE: Record<LiveExample["channel"], string> = {
  sms: "#FFFFFF",
  whatsapp: "#D9FDD3",
  rcs: "#FFFFFF",
  voice: "#FFFFFF",
};

const ACCENT: Record<LiveExample["channel"], string> = {
  sms: "#53BDEB",
  whatsapp: "#25D366",
  rcs: "#3D82F5",
  voice: "#FF9A3E",
};

export default function DeviceMessage({ example }: { example: LiveExample }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.4);
  const reduced = useReducedMotion();
  const [stage, setStage] = useState(0); // 0 idle · 1 composed · 2 sent · 3 delivered

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setStage(3);
      return;
    }
    const timers = [
      setTimeout(() => setStage(1), 120),
      setTimeout(() => setStage(2), 620),
      setTimeout(() => setStage(3), 1180),
    ];
    return () => timers.forEach(clearTimeout);
  }, [inView, reduced]);

  const accent = ACCENT[example.channel];

  return (
    <div ref={ref} className="relative mx-auto w-[280px]">
      <div
        aria-hidden
        className="absolute -inset-6 rounded-[52px] blur-3xl"
        style={{ background: `radial-gradient(circle, ${accent}1f, transparent 68%)` }}
      />

      <div className="relative overflow-hidden rounded-[38px] border-[7px] border-device-bezel bg-device-bezel shadow-device">
        <div className="relative bg-device-ground">
          <div className="flex items-center justify-between px-5 pb-1 pt-3 font-mono text-[9.5px] font-medium text-text-primary/70">
            <span>9:41</span>
            <span className="flex items-center gap-1" aria-hidden>
              <svg width="13" height="9" viewBox="0 0 13 9" fill="none">
                {[0, 1, 2, 3].map((i) => (
                  <rect key={i} x={i * 3.4} y={8 - (i + 1) * 1.9} width="2.2" height={(i + 1) * 1.9} rx="0.6" fill="currentColor" opacity={i > 2 ? 0.35 : 1} />
                ))}
              </svg>
              <svg width="11" height="9" viewBox="0 0 12 9" fill="none">
                <path d="M6 7.6 0.8 2.6a7.4 7.4 0 0 1 10.4 0Z" fill="currentColor" />
              </svg>
              <svg width="17" height="9" viewBox="0 0 18 9" fill="none">
                <rect x="0.5" y="0.5" width="14" height="8" rx="2" stroke="currentColor" opacity="0.5" />
                <rect x="2" y="2" width="9" height="5" rx="1" fill="currentColor" />
                <rect x="15.5" y="3" width="1.8" height="3" rx="0.9" fill="currentColor" opacity="0.5" />
              </svg>
            </span>
          </div>

          <div className="flex items-center gap-2.5 border-b border-black/[0.07] px-4 py-2.5">
            <span
              className="flex h-7 w-7 items-center justify-center rounded-full font-display text-[10px] font-bold text-white"
              style={{ background: accent }}
              aria-hidden
            >
              {example.sender.slice(0, 2).toUpperCase()}
            </span>
            <span>
              <span className="block font-display text-[11.5px] font-semibold text-text-primary">{example.sender}</span>
              <span className="block font-mono text-[8.5px] uppercase tracking-wide text-text-muted">{example.channel}</span>
            </span>
          </div>

          <div className="flex min-h-[214px] flex-col justify-end px-3 pb-4 pt-3">
            <div
              className="max-w-[94%] rounded-2xl rounded-tl-md px-3.5 py-2.5 shadow-sm transition-all duration-500 ease-out"
              style={{
                background: BUBBLE[example.channel],
                opacity: stage >= 1 ? 1 : 0,
                transform: stage >= 1 ? "translateY(0) scale(1)" : "translateY(10px) scale(0.94)",
              }}
            >
              {example.channel === "rcs" && (
                <div
                  aria-hidden
                  className="mb-2 h-16 rounded-lg"
                  style={{ background: `linear-gradient(120deg, ${accent}30, ${accent}10)` }}
                />
              )}

              <p className="whitespace-pre-line text-[12.5px] leading-snug text-text-primary">{example.body}</p>

              {example.buttons && example.buttons.length > 0 && (
                <div className="mt-2.5 flex flex-col gap-1 border-t border-black/10 pt-2">
                  {example.buttons.map((b, i) => (
                    <span
                      key={b}
                      className="py-1 text-center text-[11.5px] font-semibold transition-all duration-300"
                      style={{
                        color: accent,
                        opacity: stage >= 2 ? 1 : 0,
                        transform: stage >= 2 ? "none" : "translateY(4px)",
                        transitionDelay: `${i * 90}ms`,
                      }}
                    >
                      {b}
                    </span>
                  ))}
                </div>
              )}

              <p className="mt-1.5 flex items-center justify-end gap-1 text-[9px] text-text-muted">
                <span>9:41</span>
                <span
                  className="transition-colors duration-300"
                  style={{ color: stage >= 3 ? "#53BDEB" : "#9CA3AF", opacity: stage >= 2 ? 1 : 0 }}
                  aria-label={stage >= 3 ? "Delivered" : "Sent"}
                >
                  {stage >= 3 ? "✓✓" : "✓"}
                </span>
              </p>
            </div>
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent"
          />
        </div>
      </div>
    </div>
  );
}
