"use client";

import { useEffect, useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import CodeCard from "@/components/ui/CodeCard";
import Magnetic from "@/components/motion/Magnetic";
import Backdrop from "@/components/motion/Backdrop";
import { useReducedMotion, useTypewriter } from "@/lib/motion";

const CHANNELS = ["WhatsApp", "SMS", "RCS", "Voice", "AI"];

/** Trust points that float around the mockup — each shows a tick, then types itself out. */
const FLOATERS: { text: string; delay: number; pos: string }[] = [
  { text: "DLT handled", delay: 200, pos: "lg:absolute lg:-top-6 lg:left-6 lg:-rotate-2" },
  { text: "One contract, five channels", delay: 620, pos: "lg:absolute lg:top-20 lg:-right-28 lg:rotate-2" },
  { text: "Live in days", delay: 1040, pos: "lg:absolute lg:bottom-28 lg:-left-28 lg:rotate-1" },
  { text: "Delivery reports built in", delay: 1460, pos: "lg:absolute lg:-bottom-6 lg:right-8 lg:-rotate-1" },
];

const SNIPPET = {
  curl: `curl https://api.msgbridge.in/v1/messages \\\n  -H "Authorization: Bearer $API_KEY" \\\n  -d to="+91XXXXXXXXXX" \\\n  -d channel="sms" \\\n  -d template_id="otp_login"`,
  node: `const client = new MsgBridge(process.env.API_KEY);\n\nawait client.messages.send({\n  to: "+91XXXXXXXXXX",\n  channel: "sms",\n  templateId: "otp_login",\n});`,
  python: `client = MsgBridge(api_key=os.environ["API_KEY"])\n\nclient.messages.send(\n    to="+91XXXXXXXXXX",\n    channel="sms",\n    template_id="otp_login",\n)`,
};

/** A floating trust chip: the tick springs in, then the sentence types itself. */
function TypedChip({ text, delay, className = "" }: { text: string; delay: number; className?: string }) {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (reduced) {
      setVisible(true);
      setTyping(true);
      return;
    }
    const t1 = setTimeout(() => setVisible(true), delay);
    const t2 = setTimeout(() => setTyping(true), delay + 420);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [delay, reduced]);

  const typed = useTypewriter(text, typing, 32);
  const label = reduced ? text : typed;
  const done = reduced || typed.length >= text.length;

  return (
    <div
      aria-label={text}
      className={`inline-flex items-center gap-2 rounded-pill border border-ink-line bg-ink-raised/85 px-3.5 py-2 text-[13px] font-medium text-on-dark-2 shadow-[0_16px_44px_-24px_rgba(0,0,0,0.9)] backdrop-blur-md transition-all duration-500 ease-out ${className}`}
      style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(8px) scale(0.96)" }}
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden
        className="shrink-0 text-lime transition-transform duration-300 ease-spring"
        style={{ transform: visible ? "scale(1)" : "scale(0)" }}
      >
        <path d="M3 8.4l3.4 3.3L13 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="whitespace-nowrap" aria-hidden>
        {label}
        {!done && (
          <span className="ml-0.5 inline-block h-[0.95em] w-[2px] translate-y-[2px] bg-lime motion-safe:animate-pulse" aria-hidden />
        )}
      </span>
    </div>
  );
}

export default function Hero() {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setIndex((v) => (v + 1) % CHANNELS.length), 2600);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <section className="relative -mt-[var(--nav-h)] overflow-hidden bg-ink pb-20 pt-[calc(var(--nav-h)+52px)] md:pb-28 md:pt-[calc(var(--nav-h)+72px)]">
      <Backdrop variant="grid" tone="dark" />

      <svg
        aria-hidden
        viewBox="0 0 100 62"
        className="pointer-events-none absolute -right-24 -top-10 hidden h-[420px] w-[680px] opacity-[0.10] lg:block"
      >
        <path data-draw d="M6 56C6 30 30 8 50 8C70 8 94 30 94 56" fill="none" stroke="#AFFF49" strokeWidth="5" strokeLinecap="round" />
      </svg>

      <div className="container relative max-w-container">
        {/* Mockup, enlarged and centred at the top, ringed by floating trust chips */}
        <div className="relative mx-auto w-full max-w-[600px]">
          <div data-reveal="scale">
            <HeroConsole />
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-2.5 lg:contents">
            {FLOATERS.map((f) => (
              <TypedChip key={f.text} text={f.text} delay={f.delay} className={f.pos} />
            ))}
          </div>
        </div>

        {/* Headline + CTAs, centred at the bottom */}
        <div className="mt-16 text-center md:mt-24" data-reveal="rise">
          <h1 className="mx-auto max-w-[20ch] font-display text-[38px] font-extrabold leading-[1.05] tracking-[-0.035em] text-on-dark sm:text-[52px] lg:text-[64px]">
            <span className="block">Reach every customer, on</span>
            {reduced ? (
              <span className="mt-1 block text-gradient-lime">every channel.</span>
            ) : (
              <span className="mt-1 flex justify-center">
                <span className="inline-grid justify-items-center">
                  {CHANNELS.map((c, i) => (
                    <span
                      key={c}
                      aria-hidden={i !== index}
                      className="whitespace-nowrap text-gradient-lime transition-all duration-500 ease-out [grid-area:1/1]"
                      style={{ opacity: i === index ? 1 : 0, transform: i === index ? "translateY(0)" : "translateY(6px)" }}
                    >
                      {c}.
                    </span>
                  ))}
                </span>
              </span>
            )}
          </h1>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Magnetic>
              <Button href="/contact" arrow>
                Book a demo
              </Button>
            </Magnetic>
            <Magnetic strength={0.16}>
              <Button
                href="/developers/quickstart"
                variant="secondary"
                className="!border-ink-line !text-on-dark hover:!border-lime hover:!bg-white/[0.04]"
              >
                Read the docs
              </Button>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}

type SendState = "idle" | "sending" | "delivered";

function HeroConsole() {
  const [phone, setPhone] = useState("");
  const [state, setState] = useState<SendState>("idle");
  const reduced = useReducedMotion();

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (state === "sending") return;
    if (reduced) {
      setState("delivered");
      return;
    }
    setState("sending");
    setTimeout(() => setState("delivered"), 1100);
  }

  return (
    <div className="relative">
      <CodeCard code={SNIPPET} filename="send.sh" />

      <form
        onSubmit={onSubmit}
        className="mt-3 flex items-center gap-2 rounded-lg border border-ink-line bg-ink-raised p-2 pl-3.5"
      >
        <span className="font-mono text-[13px] text-on-dark-5">+91</span>
        <label htmlFor="hero-phone" className="sr-only">
          Phone number for the sandbox demo
        </label>
        <input
          id="hero-phone"
          type="tel"
          inputMode="numeric"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
          placeholder="98765 43210"
          className="min-w-0 flex-1 bg-transparent font-mono text-[13.5px] text-on-dark outline-none placeholder:text-on-dark-6"
        />
        <button
          type="submit"
          className="shrink-0 rounded-md bg-lime px-3.5 py-2 font-display text-[12px] font-bold uppercase tracking-[0.05em] text-ink transition-all duration-fast hover:shadow-[0_8px_20px_-8px_rgba(175,255,73,0.9)] active:scale-95"
        >
          {state === "sending" ? "Sending…" : state === "delivered" ? "✓ Sent" : "Send test"}
        </button>
      </form>
      {state === "idle" ? (
        <p className="mt-2.5 text-center font-mono text-[11px] text-on-dark-6">Sandbox demo — nothing leaves this page</p>
      ) : (
        <div
          key={state}
          role="status"
          aria-live="polite"
          className="mt-3 animate-fade-up rounded-lg border border-ink-line bg-ink-raised p-3.5"
        >
          <div className="flex items-start gap-3">
            <span
              className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors duration-300"
              style={{ background: state === "delivered" ? "rgba(175,255,73,0.16)" : "rgba(255,255,255,0.06)" }}
            >
              {state === "delivered" ? (
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" className="text-lime" aria-hidden>
                  <path d="M3 8.4l3.4 3.3L13 5" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <span
                  aria-hidden
                  className="h-3.5 w-3.5 rounded-full border-2 border-on-dark-6 border-t-lime"
                  style={{ animation: reduced ? "none" : "mb-spin-slow 0.7s linear infinite" }}
                />
              )}
            </span>

            <div className="min-w-0 flex-1">
              <p className="text-[12.5px] leading-snug text-on-dark-2">
                <span className="font-semibold text-on-dark">482913</span> is your MsgBridge code. Valid for 5 minutes.
              </p>
              <p className="mt-1 truncate font-mono text-[10.5px] text-on-dark-5">
                MSGBRG · {state === "delivered" ? "status: delivered · DLR received" : "status: sent"}
              </p>
            </div>

            <span className="shrink-0 font-mono text-[11px] text-ch-sms" aria-hidden>
              {state === "delivered" ? "✓✓" : "✓"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
