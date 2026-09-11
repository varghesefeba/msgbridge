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
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-8 rounded-full blur-3xl transition-colors duration-700"
              style={{ background: `radial-gradient(circle, ${rung.color}26, transparent 65%)` }}
            />

            <div className="relative w-[268px] overflow-hidden rounded-[36px] border-[7px] border-device-bezel bg-device-bezel shadow-device">
              <div className="relative min-h-[300px] bg-device-ground px-3 pb-5 pt-3">
                <div className="mb-3 flex items-center justify-between px-1 font-mono text-[9px] text-text-muted">
                  <span>9:41</span>
                  <span className="flex items-center gap-1">
                    <span className="h-1 w-1 rounded-full bg-text-muted" />
                    <span className="h-1 w-1 rounded-full bg-text-muted" />
                    <span className="h-1.5 w-3.5 rounded-[2px] border border-text-muted" />
                  </span>
                </div>

                <div key={rung.key} className="animate-fade-up">
                  <p className="mb-2 flex items-center gap-1.5 px-1 font-display text-[9.5px] font-bold uppercase tracking-wide text-text-muted">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: rung.color }} />
                    {rung.sender}
                  </p>

                  <div
                    className="rounded-xl rounded-tl-sm px-3 py-2.5 shadow-sm"
                    style={{ background: rung.key === "whatsapp" ? "#D9FDD3" : "#FFFFFF" }}
                  >
                    {rung.key === "rcs" && (
                      <div
                        aria-hidden
                        className="mb-2 h-16 rounded-lg"
                        style={{ background: `linear-gradient(120deg, ${rung.color}33, ${rung.color}12)` }}
                      />
                    )}
                    <p className="whitespace-pre-line text-[11.5px] leading-snug text-text-primary">{rung.body}</p>

                    {rung.buttons.length > 0 && (
                      <div className="mt-2 flex flex-col gap-1 border-t border-black/10 pt-2">
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

                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/35 via-transparent to-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`@keyframes mb-ladder{from{transform:scaleX(0)}to{transform:scaleX(1)}}`}</style>
    </section>
  );
}
