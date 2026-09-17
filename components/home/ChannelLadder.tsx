"use client";

import { useEffect, useRef, useState } from "react";
import Eyebrow from "@/components/ui/Eyebrow";
import { useInView, useReducedMotion } from "@/lib/motion";

const RUNGS = [
  {
    key: "sms",
    label: "Plain SMS",
    note: "Works on every handset in India.",
    color: "#53BDEB",
    sender: "MSGBRG",
    body: "Your order #4821 has shipped. Track: msgb.in/t/4821",
    buttons: [] as string[],
  },
  {
    key: "whatsapp",
    label: "WhatsApp template",
    note: "Buttons, media, and a reply that comes back to you.",
    color: "#25D366",
    sender: "MsgBridge",
    body: "Your order #4821 has shipped and is on its way.",
    buttons: ["Track order", "Contact support"],
  },
  {
    key: "rcs",
    label: "RCS rich card",
    note: "Verified sender, branded card, native inbox.",
    color: "#3D82F5",
    sender: "MsgBridge ✓",
    body: "Order #4821 shipped\nArriving in 2 days",
    buttons: ["Track order", "Reschedule"],
  },
];

const DWELL = 4200;

export default function ChannelLadder() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.3);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!inView || reduced || paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % RUNGS.length), DWELL);
    return () => clearInterval(id);
  }, [inView, reduced, paused]);

  const rung = RUNGS[active];

  return (
    <section ref={ref} className="bg-paper-warm py-24 md:py-28">
      <div className="container grid max-w-container items-center gap-14 md:grid-cols-2">
        <div>
          <Eyebrow index="05" label="The channel ladder" />
          <h2 className="mb-4 max-w-[18ch] font-display text-[28px] font-extrabold tracking-tight text-text-primary md:text-[38px]">
            The same message, three ways.
          </h2>
          <p className="mb-9 max-w-[46ch] text-[16.5px] leading-relaxed text-text-secondary">
            Start on SMS. Upgrade to WhatsApp for buttons and media. Move to RCS for a fully branded card — without
            changing your integration.
          </p>

          <div
            className="flex flex-col gap-2"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {RUNGS.map((r, i) => {
              const isActive = active === i;
              return (
                <button
                  key={r.key}
                  onClick={() => setActive(i)}
                  aria-pressed={isActive}
                  className={`group/rung relative overflow-hidden rounded-md border px-5 py-4 text-left transition-all duration-base ease-out ${
                    isActive
                      ? "border-transparent bg-white shadow-card-sm"
                      : "border-line bg-white/50 hover:border-ink-line/30 hover:bg-white"
                  }`}
                >
                  <span
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-[3px] origin-top transition-transform duration-base ease-out"
                    style={{ background: r.color, transform: `scaleY(${isActive ? 1 : 0})` }}
                  />
                  <span className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="h-2 w-2 shrink-0 rounded-full transition-all duration-base"
                      style={{ background: isActive ? r.color : "#D3D7CE", transform: isActive ? "scale(1.3)" : "scale(1)" }}
                    />
                    <span className="font-display text-[15px] font-semibold text-text-primary">{r.label}</span>
                  </span>
                  <span
                    className="mt-1 block pl-5 text-[13.5px] text-text-muted transition-all duration-base"
                    style={{ opacity: isActive ? 1 : 0.65 }}
                  >
                    {r.note}
                  </span>

                  {isActive && !reduced && !paused && (
                    <span aria-hidden className="absolute inset-x-0 bottom-0 h-[2px] bg-line">
                      <span
                        key={active}
                        className="block h-full origin-left"
                        style={{ background: r.color, animation: `mb-ladder ${DWELL}ms linear forwards` }}
                      />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative w-[280px]">
            <div
              aria-hidden
              className="absolute -inset-10 rounded-full blur-3xl transition-colors duration-700"
              style={{ background: `radial-gradient(circle, ${rung.color}26, transparent 65%)` }}
            />

            {/* Phone */}
            <div className="relative aspect-[9/19] rounded-[48px] border-[11px] border-[#0c0e12] bg-[#0c0e12] shadow-[0_46px_90px_-30px_rgba(0,0,0,0.7)]">
              <span aria-hidden className="absolute left-1/2 top-[10px] z-20 h-[22px] w-[84px] -translate-x-1/2 rounded-full bg-black" />
              <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[36px] bg-gradient-to-b from-[#f5f2ec] to-[#eae6dd]">
                {/* app header */}
                <div className="flex items-center gap-2.5 border-b border-black/[0.06] bg-white/70 px-4 pb-2.5 pt-9 backdrop-blur">
                  <span
                    key={`${rung.key}-av`}
                    className="animate-fade-up flex h-8 w-8 items-center justify-center rounded-full font-display text-[12px] font-bold text-white"
                    style={{ background: rung.color }}
                  >
                    M
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-display text-[11.5px] font-semibold text-text-primary">{rung.sender}</p>
                    <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-text-muted">{rung.label}</p>
                  </div>
                </div>

                {/* thread */}
                <div className="flex-1 px-4 pt-4">
                  <div key={rung.key} className="animate-fade-up max-w-[85%]">
                    <div
                      className="rounded-2xl rounded-tl-md px-3 py-2.5 shadow-[0_12px_26px_-12px_rgba(0,0,0,0.55)]"
                      style={{ background: rung.key === "whatsapp" ? "#D9FDD3" : "#FFFFFF" }}
                    >
                      {rung.key === "rcs" && (
                        <div
                          aria-hidden
                          className="mb-2 h-20 rounded-lg"
                          style={{ background: `linear-gradient(120deg, ${rung.color}38, ${rung.color}12)` }}
                        />
                      )}
                      <p className="whitespace-pre-line text-[12px] leading-snug text-text-primary">{rung.body}</p>

                      {rung.buttons.length > 0 && (
                        <div className="mt-2 flex flex-col gap-1 border-t border-black/[0.08] pt-2">
                          {rung.buttons.map((b, i) => (
                            <span
                              key={b}
                              className="animate-fade-up py-1 text-center text-[11px] font-semibold"
                              style={{ color: rung.color, animationDelay: `${120 + i * 90}ms` }}
                            >
                              {b}
                            </span>
                          ))}
                        </div>
                      )}

                      <p className="mt-1.5 text-right text-[8.5px] text-text-muted">
                        <span className="text-ch-sms">✓✓</span> delivered
                      </p>
                    </div>
                  </div>
                </div>

                {/* home indicator */}
                <div aria-hidden className="mx-auto mb-2 h-1 w-24 rounded-full bg-black/25" />
              </div>
            </div>

            {/* Text floating over the phone */}
            <div
              key={`${rung.key}-tag`}
              className="animate-fade-up absolute -left-7 top-28 hidden rounded-pill border border-line bg-white px-3.5 py-2 shadow-card sm:block"
            >
              <span className="flex items-center gap-2 text-[12px] font-semibold text-text-primary">
                <span className="h-2 w-2 rounded-full" style={{ background: rung.color }} />
                {rung.label}
              </span>
            </div>
            <div
              className="absolute -right-6 bottom-28 hidden rounded-pill border border-line bg-white px-3.5 py-2 text-[12px] font-semibold shadow-card sm:block"
              style={{ color: rung.color }}
            >
              Delivered ✓✓
            </div>
          </div>
        </div>
      </div>

      <style>{`@keyframes mb-ladder{from{transform:scaleX(0)}to{transform:scaleX(1)}}`}</style>
    </section>
  );
}
