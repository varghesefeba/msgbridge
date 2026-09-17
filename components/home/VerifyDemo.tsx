"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import Backdrop from "@/components/motion/Backdrop";
import { useReducedMotion, useScrollProgress } from "@/lib/motion";

type Stage = {
  key: string;
  label: string;
  detail: string;
  color: string;
  log: string;
  fail?: boolean;
};

const STAGES: Stage[] = [
  { key: "start", label: "Request received", detail: "One call to /v1/verify/start", color: "#8A9080", log: "POST /v1/verify/start → 202 accepted" },
  { key: "sms", label: "SMS", detail: "Code sent on the transactional route", color: "#53BDEB", log: "channel=sms status=sent" },
  { key: "sms-fail", label: "No delivery", detail: "Nothing confirmed in 12 seconds", color: "#7E8474", log: "channel=sms status=undelivered t=12s", fail: true },
  { key: "whatsapp", label: "WhatsApp", detail: "Falling back to the template message", color: "#25D366", log: "channel=whatsapp status=sent" },
  { key: "wa-fail", label: "Not read", detail: "No read receipt in 15 seconds", color: "#7E8474", log: "channel=whatsapp status=unread t=15s", fail: true },
  { key: "voice", label: "Voice call", detail: "Automated call reads the code aloud", color: "#FF9A3E", log: "channel=voice status=answered" },
  { key: "verified", label: "Verified", detail: "Code entered — one webhook, one charge", color: "#AFFF49", log: "verification=complete via=voice" },
];

/** Message cards (logo + name + text) that float out around the phone, one per channel. */
type Card = { key: string; label: string; color: string; logo: string; text: string; pos: string; rot: string };
const CARDS: Card[] = [
  { key: "sms", label: "SMS", color: "#53BDEB", logo: "/logos/sms.jpg", text: "482913 is your MsgBridge code.", pos: "top-10 -right-14", rot: "rotate-2" },
  { key: "whatsapp", label: "WhatsApp", color: "#25D366", logo: "/logos/whatsapp.jpg", text: "482913 is your MsgBridge code.", pos: "top-1/2 -left-16 -translate-y-1/2", rot: "-rotate-2" },
  { key: "voice", label: "Voice", color: "#FF9A3E", logo: "/logos/voice.png", text: "Automated call: your code is 482913.", pos: "bottom-10 -right-14", rot: "rotate-1" },
];

/** A floating message card — reveals when the cascade reaches its channel. */
function VerifyCard({ card, reached, className = "" }: { card: Card; reached: boolean; className?: string }) {
  return (
    <div
      className={`w-[204px] rounded-2xl bg-white p-3.5 shadow-[0_28px_56px_-16px_rgba(0,0,0,0.65)] transition-opacity duration-500 ${className}`}
      style={{ opacity: reached ? 1 : 0, borderLeft: `3px solid ${card.color}` }}
    >
      <div className="mb-1.5 flex items-center gap-2">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-black/5">
          <img src={card.logo} alt={`${card.label} logo`} className="h-full w-full object-contain p-0.5 mix-blend-multiply" />
        </span>
        <span className="font-display text-[11px] font-bold uppercase tracking-wide" style={{ color: card.color }}>
          {card.label}
        </span>
      </div>
      <p className="text-[12.5px] leading-snug text-text-primary">{card.text}</p>
    </div>
  );
}

export default function VerifyDemo() {
  const outerRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(outerRef);
  const reduced = useReducedMotion();
  const [manual, setManual] = useState<number | null>(null);

  const scrubbed = Math.min(STAGES.length - 1, Math.floor(progress * STAGES.length));
  const stage = reduced ? STAGES.length - 1 : (manual ?? scrubbed);
  const current = STAGES[stage];

  // Manual replay for reduced-motion users and anyone who wants it again.
  useEffect(() => {
    if (manual === null) return;
    if (manual >= STAGES.length - 1) return;
    const id = setTimeout(() => setManual((m) => (m === null ? null : m + 1)), 850);
    return () => clearTimeout(id);
  }, [manual]);

  return (
    <div ref={outerRef} className={reduced ? "relative" : "relative h-[240vh]"}>
      <section
        className={`overflow-hidden bg-ink ${reduced ? "py-24" : "sticky top-0 flex min-h-screen items-center py-20"}`}
      >
        <Backdrop variant="dots" tone="dark" glow={false} />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl transition-colors duration-700"
          style={{ background: `radial-gradient(circle, ${current.color}22, transparent 62%)` }}
        />

        <div className="container relative max-w-container">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)]">
            <div>
              <Eyebrow index="02" label="MsgBridge Verify" dark />
              <h2 className="max-w-[17ch] font-display text-[30px] font-extrabold leading-[1.04] tracking-tight text-on-dark md:text-[46px]">
                SMS, then WhatsApp, then a voice call.
              </h2>
              <p className="mt-4 max-w-[54ch] text-[17px] text-on-dark-3">
                One API call runs the whole cascade until the code lands — SMS first, then WhatsApp, then a voice
                call — so more users finish signup and login.
              </p>

              <ol className="mt-10 space-y-0">
                {STAGES.map((s, i) => {
                  const done = i < stage;
                  const active = i === stage;
                  return (
                    <li key={s.key} className="relative flex items-start gap-4 pb-5 last:pb-0">
                      {i < STAGES.length - 1 && (
                        <span aria-hidden className="absolute bottom-0 left-[13px] top-7 w-px overflow-hidden bg-ink-line">
                          <span
                            className="block w-full origin-top transition-transform duration-500 ease-out"
                            style={{ height: "100%", background: s.color, transform: `scaleY(${done ? 1 : 0})` }}
                          />
                        </span>
                      )}
                      <span
                        className="relative z-10 mt-0.5 flex h-[27px] w-[27px] shrink-0 items-center justify-center rounded-full border transition-all duration-300 ease-out"
                        style={{
                          borderColor: done || active ? s.color : "#1C1F24",
                          background: done || active ? `${s.color}1f` : "transparent",
                          transform: active ? "scale(1.12)" : "scale(1)",
                          boxShadow: active ? `0 0 20px 2px ${s.color}44` : "none",
                        }}
                      >
                        {done ? (
                          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
                            <path d="M3 8.4l3.4 3.3L13 5" stroke={s.color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        ) : (
                          <span className="h-1.5 w-1.5 rounded-full" style={{ background: active ? s.color : "#3A3F45" }} />
                        )}
                      </span>
                      <div
                        className="transition-all duration-300"
                        style={{ opacity: done || active ? 1 : 0.35, transform: active ? "translateX(2px)" : "none" }}
                      >
                        <p className="font-display text-[15.5px] font-semibold text-on-dark">
                          {s.label}
                          {s.fail && <span className="ml-2 font-mono text-[10.5px] uppercase tracking-wide text-on-dark-6">timeout</span>}
                        </p>
                        <p className="text-[13.5px] text-on-dark-4">{s.detail}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button href="/verify" variant="secondary" className="!border-ink-line !text-on-dark hover:!border-lime hover:!bg-white/[0.04]" arrow>
                  Explore Verify
                </Button>
                <button
                  onClick={() => setManual(0)}
                  className="font-display text-[12.5px] font-semibold uppercase tracking-wide text-lime transition-opacity duration-fast hover:opacity-75"
                >
                  ↻ Replay the cascade
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="relative mx-auto w-[280px]">
                <div
                  aria-hidden
                  className="absolute -inset-8 rounded-full blur-3xl transition-colors duration-700"
                  style={{ background: `radial-gradient(circle, ${current.color}30, transparent 66%)` }}
                />

                {/* Silver phone — stands out on the dark section */}
                <div className="relative aspect-[9/19] rounded-[48px] bg-gradient-to-br from-[#f4f5f7] via-[#c6cad0] to-[#989ea6] p-[11px] shadow-[0_46px_90px_-28px_rgba(0,0,0,0.85)]">
                  <span aria-hidden className="pointer-events-none absolute inset-0 rounded-[48px] ring-1 ring-white/50" />
                  <span aria-hidden className="absolute left-1/2 top-[16px] z-30 h-[20px] w-[80px] -translate-x-1/2 rounded-full bg-black" />
                  <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[38px] border border-black/50 bg-gradient-to-b from-[#f5f2ec] to-[#eae6dd]">
                    <div className="flex items-center gap-2.5 border-b border-black/[0.06] bg-white/70 px-4 pb-2.5 pt-9 backdrop-blur">
                      <span
                        className="flex h-8 w-8 items-center justify-center rounded-full font-display text-[13px] font-bold text-ink transition-colors duration-500"
                        style={{ background: current.color }}
                      >
                        ✦
                      </span>
                      <div className="min-w-0">
                        <p className="font-display text-[11.5px] font-semibold text-text-primary">MsgBridge Verify</p>
                        <p className="font-mono text-[8px] uppercase tracking-[0.12em] transition-colors duration-500" style={{ color: current.color }}>
                          {stage >= STAGES.length - 1 ? "verified ✓" : current.label}
                        </p>
                      </div>
                    </div>

                    {/* Minimal body — a decorative watermark only, so the floating cards never cover readable text */}
                    <div className="relative flex-1">
                      <span
                        aria-hidden
                        className="absolute inset-0 flex items-center justify-center opacity-[0.13] transition-colors duration-500"
                      >
                        <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke={current.color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 3l7 3v5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-3Z" />
                          <path d="M9 12l2 2 4-4" />
                        </svg>
                      </span>
                    </div>

                    <div aria-hidden className="mx-auto mb-2 h-1 w-24 rounded-full bg-black/25" />
                  </div>
                </div>

                {/* Message cards floating out around the phone (desktop) */}
                {CARDS.map((c) => {
                  const at = STAGES.findIndex((s) => s.key === c.key);
                  const reached = at !== -1 && at <= stage;
                  return <VerifyCard key={c.key} card={c} reached={reached} className={`absolute z-20 hidden lg:block ${c.pos} ${c.rot}`} />;
                })}
              </div>

              {/* Same cards stacked below the phone on smaller screens */}
              <div className="mt-6 flex flex-col items-center gap-3 lg:hidden">
                {CARDS.map((c) => {
                  const at = STAGES.findIndex((s) => s.key === c.key);
                  const reached = at !== -1 && at <= stage;
                  return reached ? <VerifyCard key={c.key} card={c} reached /> : null;
                })}
              </div>

              {!reduced && (
                <div aria-hidden className="mx-auto mt-6 h-[3px] w-[280px] overflow-hidden rounded-full bg-ink-line">
                  <div
                    className="h-full rounded-full bg-lime transition-transform duration-150"
                    style={{ transform: `scaleX(${(stage + 1) / STAGES.length})`, transformOrigin: "left" }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
