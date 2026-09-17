"use client";

import { useEffect, useRef, useState } from "react";
import type { LiveExample } from "@/lib/types";
import { useInView, useReducedMotion } from "@/lib/motion";
import PhoneFrame, { type PhoneTone } from "@/components/ui/PhoneFrame";

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

/** Readable text color (near-black or white) for a given solid background hex. */
function readableOn(hex: string) {
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.62 ? "#0A0B0D" : "#ffffff";
}

export default function DeviceMessage({ example, tone = "black" }: { example: LiveExample; tone?: PhoneTone }) {
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
  const headerText = readableOn(accent);

  return (
    <div ref={ref} className="relative mx-auto w-[280px]">
      <div
        aria-hidden
        className="absolute -inset-6 rounded-[52px] blur-3xl"
        style={{ background: `radial-gradient(circle, ${accent}1f, transparent 68%)` }}
      />

      <PhoneFrame tone={tone} className="relative">
        {/* Colored app header, clearing the notch */}
        <div
          className="flex items-center gap-2.5 border-b border-black/10 px-4 pb-2.5 pt-9 transition-colors duration-500"
          style={{ background: accent, color: headerText }}
        >
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white font-display text-[11px] font-bold shadow-sm"
            style={{ color: accent }}
            aria-hidden
          >
            {example.sender.slice(0, 2).toUpperCase()}
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-[11.5px] font-semibold">{example.sender}</span>
            <span className="block font-mono text-[8px] uppercase tracking-[0.12em] opacity-80">{example.channel}</span>
          </span>
        </div>

        {/* Chat body — one message, sitting at the bottom like a real thread */}
        <div className="flex flex-1 flex-col justify-end px-3 pb-3 pt-3">
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

        {/* Home indicator */}
        <div aria-hidden className="mx-auto mb-2 h-1 w-24 rounded-full bg-black/25" />
      </PhoneFrame>
    </div>
  );
}
