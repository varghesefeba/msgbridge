"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import Backdrop from "@/components/motion/Backdrop";
import Spotlight from "@/components/motion/Spotlight";
import CountUp from "@/components/motion/CountUp";
import Eyebrow from "@/components/ui/Eyebrow";
import { useInView, useReducedMotion, useSequence } from "@/lib/motion";

/* ── Shared cell plumbing ─────────────────────────────────────────────── */

/** Loops a step sequence while the cell is on screen; parks on the final
 *  frame when the visitor has asked for reduced motion. */
function useCellLoop(steps: number, interval: number) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.3);
  const reduced = useReducedMotion();
  const raw = useSequence(steps, inView && !reduced, interval);
  return { ref, step: reduced ? steps - 1 : raw, reduced, inView };
}

function Cell({
  span,
  title,
  desc,
  glow = "rgba(175,255,73,0.10)",
  children,
}: {
  span: string;
  title: string;
  desc: string;
  glow?: string;
  children: ReactNode;
}) {
  return (
    <div className={span} data-reveal="rise">
      <Spotlight className="h-full rounded-lg border border-ink-line bg-ink-raised p-6">
        <div className="relative h-[172px] overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: `radial-gradient(70% 60% at 50% 45%, ${glow}, transparent 70%)` }}
          />
          {children}
        </div>
        <h3 className="mt-5 font-display text-[15.5px] font-semibold text-on-dark">{title}</h3>
        <p className="mt-1.5 text-[13.5px] leading-relaxed text-on-dark-4">{desc}</p>
      </Spotlight>
    </div>
  );
}

/* ── 1 · Delivery receipts ────────────────────────────────────────────── */

const DLR_STEPS = [
  { status: "queued", stamp: "10:22:31.004Z", ticks: 0 },
  { status: "sent", stamp: "10:22:31.118Z", ticks: 1 },
  { status: "delivered", stamp: "10:22:32.402Z", ticks: 2 },
  { status: "delivered", stamp: "10:22:32.977Z", ticks: 3 },
];

function DeliveryCell() {
  const { ref, step } = useCellLoop(DLR_STEPS.length, 1200);
  const frame = DLR_STEPS[step];
  const blue = frame.ticks >= 3;

  return (
    <div ref={ref} className="relative flex h-full items-center gap-5">
      <div className="w-[52%] shrink-0 rounded-lg border border-ink-line bg-white/[0.04] p-3.5">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-on-dark-5">MSGBRG</p>
        <p className="mt-1.5 text-[13px] leading-snug text-on-dark-2">
          Your order 4821 has shipped. Track: msgb.in/t/4821
        </p>
        <div className="mt-2.5 flex items-center justify-end gap-1">
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden>
            <path
              d="M1 6.4 3.9 9.4 9.4 3"
              stroke={blue ? "#53BDEB" : "#7E8474"}
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                opacity: frame.ticks >= 1 ? 1 : 0,
                transform: frame.ticks >= 1 ? "scale(1)" : "scale(0.7)",
                transformOrigin: "center",
                transition: "opacity 240ms cubic-bezier(0.2,0.7,0.3,1), transform 240ms cubic-bezier(0.34,1.56,0.64,1), stroke 240ms",
              }}
            />
            <path
              d="M7.6 6.4 10.5 9.4 16 3"
              stroke={blue ? "#53BDEB" : "#7E8474"}
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                opacity: frame.ticks >= 2 ? 1 : 0,
                transform: frame.ticks >= 2 ? "scale(1)" : "scale(0.7)",
                transformOrigin: "center",
                transition: "opacity 240ms cubic-bezier(0.2,0.7,0.3,1), transform 240ms cubic-bezier(0.34,1.56,0.64,1), stroke 240ms",
              }}
            />
          </svg>
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <div className="space-y-1.5">
          {DLR_STEPS.slice(0, 3).map((s, i) => {
            const reached = step >= i;
            return (
              <div
                key={s.status}
                className="flex items-center gap-2 font-mono text-[11.5px]"
                style={{ opacity: reached ? 1 : 0.28, transition: "opacity 240ms cubic-bezier(0.2,0.7,0.3,1)" }}
              >
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{
                    background: reached ? (i === 2 ? "#AFFF49" : "#7E8474") : "#1C1F24",
                    transition: "background-color 240ms",
                  }}
                />
                <span className={reached && i === 2 ? "text-lime" : "text-on-dark-3"}>{s.status}</span>
                <span className="ml-auto text-on-dark-6">{reached ? s.stamp : "—"}</span>
              </div>
            );
          })}
        </div>
        <div
          className="mt-3 inline-flex items-center gap-1.5 rounded-xs border border-ink-line bg-white/[0.04] px-2 py-1"
          style={{
            opacity: blue ? 1 : 0,
            transform: blue ? "translateY(0)" : "translateY(4px)",
            transition: "opacity 300ms cubic-bezier(0.2,0.7,0.3,1), transform 300ms cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-ch-sms" />
          <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-on-dark-3">Operator DLR</span>
        </div>
      </div>
    </div>
  );
}

/* ── 2 · Cascading failover ───────────────────────────────────────────── */

const CASCADE = [
  { label: "SMS", color: "#53BDEB" },
  { label: "WhatsApp", color: "#25D366" },
  { label: "Voice", color: "#FF9A3E" },
];

function FailoverCell() {
  // 0 sms try · 1 sms fail · 2 wa try · 3 wa fail · 4 voice try · 5 verified
  const { ref, step } = useCellLoop(6, 900);
  const activeIndex = Math.min(Math.floor(step / 2), 2);
  const verified = step >= 5;

  return (
    <div ref={ref} className="relative flex h-full flex-col justify-center gap-2.5 pl-1">
      {CASCADE.map((node, i) => {
        const tried = step >= i * 2;
        const failed = step >= i * 2 + 1 && i < 2;
        const live = activeIndex === i && !failed;
        return (
          <div key={node.label} className="flex items-center gap-3">
            <span className="relative flex h-6 w-6 shrink-0 items-center justify-center">
              {live && !verified && (
                <span
                  className="absolute inset-0 rounded-full"
                  style={{ background: node.color, opacity: 0.25, animation: "mb-pulse-ring 1.4s ease-out infinite" }}
                />
              )}
              <span
                className="relative h-2.5 w-2.5 rounded-full"
                style={{
                  background: failed ? "#1C1F24" : tried ? node.color : "#1C1F24",
                  boxShadow: live && !failed ? `0 0 14px 2px ${node.color}66` : "none",
                  transition: "background-color 300ms, box-shadow 300ms",
                }}
              />
            </span>
            <span
              className="font-display text-[13px] font-semibold"
              style={{ color: failed ? "#7E8474" : tried ? "#FFFFFF" : "#8A9080", transition: "color 300ms" }}
            >
              {node.label}
            </span>
            <span
              className="ml-auto font-mono text-[10px] uppercase tracking-[0.1em]"
              style={{
                color: failed ? "#7E8474" : "#9AA091",
                opacity: tried ? 1 : 0,
                transition: "opacity 240ms, color 300ms",
              }}
            >
              {failed ? "no delivery" : live ? "trying" : tried ? "sent" : ""}
            </span>
          </div>
        );
      })}

      <div
        className="mt-2 flex items-center gap-2 rounded-md border border-lime/30 bg-lime/[0.07] px-3 py-2"
        style={{
          opacity: verified ? 1 : 0,
          transform: verified ? "translateY(0) scale(1)" : "translateY(6px) scale(0.96)",
          transition: "opacity 320ms cubic-bezier(0.2,0.7,0.3,1), transform 320ms cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="#AFFF49" strokeWidth="2.2" aria-hidden>
          <path d="M3 8.4 6.2 11.6 13 4.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="font-display text-[12.5px] font-bold uppercase tracking-[0.06em] text-lime">Verified</span>
      </div>
    </div>
  );
}

/* ── 3 · DLT chain ────────────────────────────────────────────────────── */

const DLT_STAGES = ["Entity", "Header", "Template", "TM chain"];

function DltCell() {
  const { ref, step } = useCellLoop(6, 800);
  const done = Math.min(step, 4);

  return (
    <div ref={ref} className="relative flex h-full flex-col justify-center">
      <div className="relative px-2">
        <div className="absolute left-[13%] right-[13%] top-[13px] h-px bg-ink-line" />
        <div
          className="absolute left-[13%] top-[13px] h-px origin-left bg-lime"
          style={{
            width: "74%",
            transform: `scaleX(${done / (DLT_STAGES.length - 1) > 1 ? 1 : done / (DLT_STAGES.length - 1)})`,
            transition: "transform 640ms cubic-bezier(0.2,0.7,0.3,1)",
          }}
        />
        <div className="relative flex justify-between">
          {DLT_STAGES.map((stage, i) => {
            const complete = done > i;
            return (
              <div key={stage} className="flex w-[25%] flex-col items-center gap-2.5">
                <span
                  className="flex h-[27px] w-[27px] items-center justify-center rounded-full border"
                  style={{
                    background: complete ? "#AFFF49" : "#111318",
                    borderColor: complete ? "#AFFF49" : "#1C1F24",
                    transform: complete ? "scale(1)" : "scale(0.88)",
                    transition: "background-color 300ms, border-color 300ms, transform 300ms cubic-bezier(0.34,1.56,0.64,1)",
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path
                      d="M3.5 8.4 6.4 11.4 12.5 4.8"
                      stroke="#0A0B0D"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ opacity: complete ? 1 : 0, transition: "opacity 240ms 80ms" }}
                    />
                  </svg>
                </span>
                <span
                  className="text-center font-mono text-[9.5px] uppercase leading-tight tracking-[0.08em]"
                  style={{ color: complete ? "#C9CEC4" : "#7E8474", transition: "color 300ms" }}
                >
                  {stage}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <p
        className="mt-6 text-center font-mono text-[10.5px] uppercase tracking-[0.12em]"
        style={{ color: done >= 4 ? "#AFFF49" : "#7E8474", transition: "color 300ms" }}
      >
        {done >= 4 ? "Ready to send" : "Registering…"}
      </p>
    </div>
  );
}

/* ── 4 · Orbit ────────────────────────────────────────────────────────── */

const ORBIT = [
  { label: "SMS", color: "#53BDEB" },
  { label: "WA", color: "#25D366" },
  { label: "RCS", color: "#3D82F5" },
  { label: "VCE", color: "#FF9A3E" },
];

function OrbitCell() {
  return (
    <div className="relative flex h-full items-center justify-center">
      <div className="absolute h-[124px] w-[124px] rounded-full border border-dashed border-ink-line" aria-hidden />

      <div className="absolute h-[124px] w-[124px] animate-spin-slow" aria-hidden>
        {ORBIT.map((channel, i) => {
          const angle = i * (360 / ORBIT.length);
          return (
            <span
              key={channel.label}
              className="absolute left-1/2 top-1/2 block h-0 w-0"
              style={{ transform: `rotate(${angle}deg) translateY(-62px)` }}
            >
              <span
                className="block animate-spin-slow"
                style={{ animationDirection: "reverse" } as CSSProperties}
              >
                <span
                  className="flex -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-pill border border-ink-line bg-ink px-1.5 py-1"
                  style={{ transform: `rotate(${-angle}deg) translate(-50%, -50%)` }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: channel.color }} />
                  <span className="font-mono text-[9px] uppercase tracking-[0.06em] text-on-dark-3">{channel.label}</span>
                </span>
              </span>
            </span>
          );
        })}
      </div>

      <div className="relative flex h-[54px] w-[54px] items-center justify-center rounded-full border border-ink-line bg-ink">
        <span className="absolute inset-0 rounded-full" style={{ boxShadow: "0 0 26px 2px rgba(175,255,73,0.22)" }} aria-hidden />
        <svg width="26" height="17" viewBox="0 0 100 62" aria-hidden>
          <path d="M6 56C6 30 30 8 50 8C70 8 94 30 94 56" fill="none" stroke="#AFFF49" strokeWidth="11" strokeLinecap="round" />
          <circle cx="50" cy="8" r="8" fill="#FFFFFF" />
        </svg>
      </div>
    </div>
  );
}

/* ── 5 · Template variables ───────────────────────────────────────────── */

function TemplateCell() {
  const { ref, step } = useCellLoop(4, 1300);

  const slot = (filled: boolean, placeholder: string, value: string) => (
    <span
      className="inline-block rounded-xs px-1"
      style={{
        background: filled ? "rgba(175,255,73,0.14)" : "rgba(255,154,62,0.12)",
        color: filled ? "#AFFF49" : "#FF9A3E",
        transition: "background-color 300ms, color 300ms",
      }}
    >
      {filled ? value : placeholder}
    </span>
  );

  return (
    <div ref={ref} className="relative flex h-full flex-col justify-center gap-4">
      <div className="rounded-lg border border-ink-line bg-white/[0.03] p-3.5">
        <p className="font-mono text-[12px] leading-[1.85] text-on-dark-2">
          Hi {slot(step >= 1, "{{name}}", "Priya")}, your order {slot(step >= 2, "{{order_id}}", "4821")} is out for
          delivery.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <span
          className="inline-flex items-center gap-1.5 rounded-pill border border-lime/30 bg-lime/[0.08] px-2.5 py-1"
          style={{
            opacity: step >= 3 ? 1 : 0,
            transform: step >= 3 ? "scale(1)" : "scale(0.8)",
            transition: "opacity 300ms cubic-bezier(0.2,0.7,0.3,1), transform 340ms cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="#AFFF49" strokeWidth="2.4" aria-hidden>
            <path d="M3 8.4 6.2 11.6 13 4.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-display text-[11px] font-bold uppercase tracking-[0.08em] text-lime">Approved</span>
        </span>
        <span
          className="font-mono text-[10px] uppercase tracking-[0.1em] text-on-dark-6"
          style={{ opacity: step >= 3 ? 1 : 0, transition: "opacity 300ms 120ms" }}
        >
          variables match
        </span>
      </div>
    </div>
  );
}

/* ── 6 · Throughput ───────────────────────────────────────────────────── */

const BARS = [26, 44, 34, 62, 48, 78, 56, 90, 64, 84, 70, 96, 66, 80];

function ThroughputCell() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.3);

  return (
    <div ref={ref} className="relative flex h-full flex-col justify-between">
      <div>
        <p className="font-display text-[30px] font-extrabold leading-none text-on-dark">
          <CountUp to={12480} />
        </p>
        <p className="mt-1 text-[12px] text-on-dark-4">messages routed across every channel</p>
      </div>

      <div className="flex h-[74px] items-end gap-[5px]">
        {BARS.map((height, i) => (
          <span
            key={i}
            className="flex-1 origin-bottom rounded-t-[2px]"
            style={{
              height: `${height}%`,
              background: i === BARS.length - 3 ? "#AFFF49" : "rgba(175,255,73,0.28)",
              transform: inView ? "scaleY(1)" : "scaleY(0.04)",
              transition: `transform 620ms cubic-bezier(0.2,0.7,0.3,1) ${i * 45}ms`,
            }}
          />
        ))}
      </div>

      <p className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-on-dark-6">
        Illustrative sample window — not a published volume figure
      </p>
    </div>
  );
}

/* ── 7 · Support thread ───────────────────────────────────────────────── */

function SupportCell() {
  const { ref, step } = useCellLoop(4, 1400);

  return (
    <div ref={ref} className="relative flex h-full flex-col justify-center gap-2.5">
      <div
        className="max-w-[78%] self-start rounded-lg rounded-bl-sm border border-ink-line bg-white/[0.04] px-3 py-2"
        style={{
          opacity: step >= 0 ? 1 : 0,
          transform: step >= 0 ? "translateY(0)" : "translateY(6px)",
          transition: "opacity 300ms, transform 300ms cubic-bezier(0.2,0.7,0.3,1)",
        }}
      >
        <p className="text-[12.5px] leading-snug text-on-dark-2">Template got rejected — what do we fix?</p>
      </div>

      <div
        className="flex items-center gap-1 self-end rounded-pill border border-ink-line bg-white/[0.04] px-3 py-2"
        style={{
          opacity: step === 1 ? 1 : 0,
          transform: step === 1 ? "scale(1)" : "scale(0.9)",
          transition: "opacity 240ms, transform 240ms cubic-bezier(0.34,1.56,0.64,1)",
        }}
        aria-hidden
      >
        {[0, 1, 2].map((d) => (
          <span
            key={d}
            className="h-1.5 w-1.5 rounded-full bg-on-dark-4 motion-safe:animate-bounce"
            style={{ animationDelay: `${d * 140}ms`, animationDuration: "900ms" }}
          />
        ))}
      </div>

      <div
        className="max-w-[82%] self-end rounded-lg rounded-br-sm border border-lime/25 bg-lime/[0.07] px-3 py-2"
        style={{
          opacity: step >= 2 ? 1 : 0,
          transform: step >= 2 ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 320ms, transform 320ms cubic-bezier(0.2,0.7,0.3,1)",
        }}
      >
        <p className="text-[12.5px] leading-snug text-on-dark">
          Variable count doesn&rsquo;t match the registered text. Sending you the corrected draft now.
        </p>
        <p className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.1em] text-lime">Arun · your account contact</p>
      </div>

      <span
        className="self-start font-mono text-[9.5px] uppercase tracking-[0.12em] text-on-dark-6"
        style={{ opacity: step >= 3 ? 1 : 0, transition: "opacity 300ms" }}
      >
        first response within 4 working hours
      </span>
    </div>
  );
}

/* ── Section ──────────────────────────────────────────────────────────── */

export default function BentoGrid() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 md:py-32">
      <Backdrop variant="grid" tone="dark" />

      <div className="container relative max-w-container">
        <Eyebrow index="03" label="Under the hood" dark />
        <h2 className="max-w-[20ch] font-display text-[26px] font-extrabold tracking-tight text-on-dark md:text-[40px]">
          Everything that has to work, working.
        </h2>
        <p className="mt-4 max-w-[58ch] text-[16px] text-on-dark-3">
          Delivery receipts, failover, DLT paperwork and a person who answers — the parts that decide whether a message
          actually lands.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-5" data-stagger="">
          <Cell
            span="md:col-span-4"
            title="Delivery you can prove"
            desc="Operator-end delivery reports come back over the API, not a dashboard you have to refresh."
          >
            <DeliveryCell />
          </Cell>

          <Cell
            span="md:col-span-2"
            title="Cascading failover"
            desc="SMS, then WhatsApp, then a voice call — until the code lands."
            glow="rgba(83,189,235,0.10)"
          >
            <FailoverCell />
          </Cell>

          <Cell
            span="md:col-span-2"
            title="DLT, handled"
            desc="Entity, header, template and TM chain binding — run in parallel with your build."
          >
            <DltCell />
          </Cell>

          <Cell
            span="md:col-span-2"
            title="One API, every channel"
            desc="One contract, one integration, one invoice. Add a channel without adding a vendor."
            glow="rgba(124,92,255,0.10)"
          >
            <OrbitCell />
          </Cell>

          <Cell
            span="md:col-span-2"
            title="Templates that pass first time"
            desc="We draft the content template so the variables match what your code actually sends."
            glow="rgba(255,154,62,0.09)"
          >
            <TemplateCell />
          </Cell>

          <Cell
            span="md:col-span-3"
            title="Built for volume"
            desc="Campaign bursts and steady transactional traffic on the same integration."
          >
            <ThroughputCell />
          </Cell>

          <Cell
            span="md:col-span-3"
            title="A named person answers"
            desc="Not a ticket number. Support on WhatsApp during business hours, with a response commitment."
            glow="rgba(37,211,102,0.09)"
          >
            <SupportCell />
          </Cell>
        </div>
      </div>
    </section>
  );
}
