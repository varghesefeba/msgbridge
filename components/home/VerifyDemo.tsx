"use client";

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
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)]">
            <div>
              <Eyebrow index="02" label="MsgBridge Verify" dark />
              <h2 className="max-w-[17ch] font-display text-[30px] font-extrabold leading-[1.04] tracking-tight text-on-dark md:text-[46px]">
                SMS, then WhatsApp, then a voice call.
              </h2>
              <p className="mt-4 max-w-[54ch] text-[17px] text-on-dark-3">
                One API call runs the whole cascade until the code lands. It is the only thing in this catalogue a
                competitor can&rsquo;t match by shaving a paisa off an SMS rate.
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
              <div className="relative mx-auto w-[260px]">
                <div
                  aria-hidden
                  className="absolute -inset-6 rounded-[52px] blur-2xl transition-colors duration-700"
                  style={{ background: `radial-gradient(circle, ${current.color}26, transparent 68%)` }}
                />
                <div className="relative overflow-hidden rounded-[34px] border-[6px] border-device-bezel bg-device-bezel shadow-device">
                  <div className="min-h-[330px] bg-device-ground px-3 pb-4 pt-3">
                    <div className="mb-3 flex items-center justify-between px-1 font-mono text-[9px] text-text-muted">
                      <span>9:41</span>
                      <span className="flex items-center gap-1">
                        <span className="h-1 w-1 rounded-full bg-text-muted" />
                        <span className="h-1.5 w-3.5 rounded-[2px] border border-text-muted" />
                      </span>
                    </div>

                    <div className="space-y-2">
                      {STAGES.slice(1).map((s, i) => {
                        const idx = i + 1;
                        if (idx > stage) return null;
                        if (s.fail) {
                          return (
                            <p key={s.key} className="px-1 text-center font-mono text-[9.5px] text-text-muted">
                              {s.label.toLowerCase()} · retrying
                            </p>
                          );
                        }
                        const isVerified = s.key === "verified";
                        return (
                          <div
                            key={s.key}
                            className="animate-fade-up rounded-lg px-2.5 py-2 shadow-sm"
                            style={{ background: isVerified ? "#E4FFBC" : "#FFFFFF", borderLeft: `3px solid ${s.color}` }}
                          >
                            <p className="mb-0.5 font-display text-[8.5px] font-bold uppercase tracking-wide" style={{ color: s.color }}>
                              {s.label}
                            </p>
                            <p className="text-[10.5px] leading-snug text-text-primary">
                              {isVerified ? "Verified. You're signed in." : "482913 is your MsgBridge code."}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-lg border border-ink-line bg-ink-raised/80 p-3 font-mono text-[11px] leading-relaxed backdrop-blur">
                {STAGES.map((s, i) => (
                  <p
                    key={s.key}
                    className="truncate transition-all duration-300"
                    style={{ opacity: i <= stage ? 1 : 0.18, color: i === stage ? s.color : "#7E8474" }}
                  >
                    <span className="text-on-dark-6">›</span> {s.log}
                  </p>
                ))}
              </div>

              {!reduced && (
                <div aria-hidden className="mt-4 h-[3px] overflow-hidden rounded-full bg-ink-line">
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
