"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import Eyebrow from "@/components/ui/Eyebrow";
import { useInView, useReducedMotion } from "@/lib/motion";

type Rung = {
  key: string;
  label: string;
  short: string;
  note: string;
  color: string;
  logo: string;
  sender: string;
  body: string;
  buttons: string[];
  pos: string;
  rot: string;
};

const RUNGS: Rung[] = [
  {
    key: "sms",
    label: "Plain SMS",
    short: "SMS",
    note: "Works on every handset in India.",
    color: "#53BDEB",
    logo: "/logos/sms.svg",
    sender: "MSGBRG",
    body: "Your order #4821 has shipped. Track: msgb.in/t/4821",
    buttons: [],
    pos: "top-10 -right-14",
    rot: "rotate-2",
  },
  {
    key: "whatsapp",
    label: "WhatsApp template",
    short: "WhatsApp",
    note: "Buttons, media, and a reply that comes back to you.",
    color: "#25D366",
    logo: "/logos/whatsapp.jpg",
    sender: "MsgBridge",
    body: "Your order #4821 has shipped and is on its way.",
    buttons: ["Track order", "Contact support"],
    pos: "top-1/2 -left-16 -translate-y-1/2",
    rot: "-rotate-2",
  },
  {
    key: "rcs",
    label: "RCS rich card",
    short: "RCS",
    note: "Verified sender, branded card, native inbox.",
    color: "#3D82F5",
    logo: "/logos/sms.jpg",
    sender: "MsgBridge ✓",
    body: "Order #4821 shipped\nArriving in 2 days",
    buttons: ["Track order", "Reschedule"],
    pos: "bottom-10 -right-14",
    rot: "rotate-1",
  },
];

const DWELL = 4200;

/** A floating channel card — the active channel is highlighted, the rest are dimmed. */
function LadderCard({ rung, isActive, className = "" }: { rung: Rung; isActive: boolean; className?: string }) {
  return (
    <div
      className={`w-[210px] rounded-2xl bg-white p-3.5 transition-all duration-500 ${
        isActive ? "shadow-[0_30px_60px_-16px_rgba(0,0,0,0.4)]" : "shadow-card-sm"
      } ${className}`}
      style={{ opacity: isActive ? 1 : 0.4, borderLeft: `3px solid ${rung.color}` }}
    >
      <div className="mb-1.5 flex items-center gap-2">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-black/5">
          <img src={rung.logo} alt={`${rung.short} logo`} className="h-full w-full object-contain p-0.5 mix-blend-multiply" />
        </span>
        <span className="font-display text-[11px] font-bold uppercase tracking-wide" style={{ color: rung.color }}>
          {rung.short}
        </span>
      </div>
      <p className="whitespace-pre-line text-[12.5px] leading-snug text-text-primary">{rung.body}</p>
      {rung.buttons.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5 border-t border-black/[0.06] pt-2">
          {rung.buttons.map((b) => (
            <span key={b} className="rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ background: `${rung.color}1a`, color: rung.color }}>
              {b}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

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

        <div>
          <div className="relative mx-auto w-[280px]">
            <div
              aria-hidden
              className="absolute -inset-10 rounded-full blur-3xl transition-colors duration-700"
              style={{ background: `radial-gradient(circle, ${rung.color}26, transparent 65%)` }}
            />

            {/* Silver phone */}
            <div className="relative aspect-[9/19] rounded-[48px] bg-gradient-to-br from-[#f4f5f7] via-[#c6cad0] to-[#989ea6] p-[11px] shadow-[0_46px_90px_-28px_rgba(0,0,0,0.55)]">
              <span aria-hidden className="pointer-events-none absolute inset-0 rounded-[48px] ring-1 ring-white/50" />
              <span aria-hidden className="absolute left-1/2 top-[16px] z-30 h-[20px] w-[80px] -translate-x-1/2 rounded-full bg-black" />
              <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[38px] border border-black/50 bg-gradient-to-b from-[#f5f2ec] to-[#eae6dd]">
                <div className="flex items-center gap-2.5 border-b border-black/[0.06] bg-white/70 px-4 pb-2.5 pt-9 backdrop-blur">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full font-display text-[12px] font-bold text-white transition-colors duration-500"
                    style={{ background: rung.color }}
                  >
                    M
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-display text-[11.5px] font-semibold text-text-primary">{rung.sender}</p>
                    <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-text-muted transition-colors duration-500" style={{ color: rung.color }}>
                      {rung.short}
                    </p>
                  </div>
                </div>

                {/* Minimal body — a decorative watermark only, so the floating cards never cover readable text */}
                <div className="relative flex-1">
                  <span aria-hidden className="absolute inset-0 flex items-center justify-center opacity-[0.13] transition-colors duration-500">
                    <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke={rung.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 11.5a8.4 8.4 0 0 1-11.9 7.6L3 21l1.9-5.6A8.4 8.4 0 1 1 21 11.5Z" />
                    </svg>
                  </span>
                </div>

                <div aria-hidden className="mx-auto mb-2 h-1 w-24 rounded-full bg-black/25" />
              </div>
            </div>

            {/* Channel cards floating out around the phone (desktop) */}
            {RUNGS.map((r, i) => (
              <LadderCard key={r.key} rung={r} isActive={active === i} className={`absolute z-20 hidden lg:block ${r.pos} ${r.rot}`} />
            ))}
          </div>

          {/* Same cards stacked below the phone on smaller screens */}
          <div className="mt-6 flex flex-col items-center gap-3 lg:hidden">
            {RUNGS.map((r, i) => (
              <LadderCard key={r.key} rung={r} isActive={active === i} />
            ))}
          </div>
        </div>
      </div>

      <style>{`@keyframes mb-ladder{from{transform:scaleX(0)}to{transform:scaleX(1)}}`}</style>
    </section>
  );
}
