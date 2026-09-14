"use client";

import { useEffect, useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import CodeCard from "@/components/ui/CodeCard";
import Magnetic from "@/components/motion/Magnetic";
import Backdrop from "@/components/motion/Backdrop";
import { useReducedMotion } from "@/lib/motion";

const CHANNELS = ["WhatsApp", "SMS", "RCS", "Voice", "AI"];
const TRUST = ["DLT handled", "One contract, five channels", "Live in days", "Published pricing"];

const SNIPPET = {
  curl: `curl https://api.msgbridge.in/v1/messages \\\n  -H "Authorization: Bearer $API_KEY" \\\n  -d to="+91XXXXXXXXXX" \\\n  -d channel="sms" \\\n  -d template_id="otp_login"`,
  node: `const client = new MsgBridge(process.env.API_KEY);\n\nawait client.messages.send({\n  to: "+91XXXXXXXXXX",\n  channel: "sms",\n  templateId: "otp_login",\n});`,
  python: `client = MsgBridge(api_key=os.environ["API_KEY"])\n\nclient.messages.send(\n    to="+91XXXXXXXXXX",\n    channel="sms",\n    template_id="otp_login",\n)`,
};

export default function Hero() {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setIndex((v) => (v + 1) % CHANNELS.length), 2600);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <section className="relative -mt-[var(--nav-h)] overflow-hidden bg-ink pb-20 pt-[calc(var(--nav-h)+56px)] md:pb-28 md:pt-[calc(var(--nav-h)+92px)]">
      <Backdrop variant="grid" tone="dark" />

      <svg
        aria-hidden
        viewBox="0 0 100 62"
        className="pointer-events-none absolute -right-24 -top-10 hidden h-[420px] w-[680px] opacity-[0.10] lg:block"
      >
        <path
          data-draw
          d="M6 56C6 30 30 8 50 8C70 8 94 30 94 56"
          fill="none"
          stroke="#AFFF49"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </svg>

      <div className="container relative max-w-container">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:gap-12">
          <div>
            <div
              data-reveal="rise"
              className="mb-7 inline-flex items-center gap-2.5 rounded-pill border border-ink-line bg-white/[0.04] py-1.5 pl-2.5 pr-4 backdrop-blur"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-lime opacity-70 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
              </span>
              <span className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-on-dark-3">
                SMS · WhatsApp · RCS · Voice · AI
              </span>
            </div>

            <h1 className="font-display text-[42px] font-extrabold leading-[0.97] tracking-[-0.035em] text-on-dark sm:text-[56px] lg:text-[68px]">
              <span data-reveal="rise" style={{ "--reveal-delay": 60 } as React.CSSProperties} className="block">
                Reach every
              </span>
              <span data-reveal="rise" style={{ "--reveal-delay": 130 } as React.CSSProperties} className="block">
                customer, on
              </span>
              <span data-reveal="rise" style={{ "--reveal-delay": 200 } as React.CSSProperties} className="block">
                {reduced ? (
                  <span className="text-gradient-lime">every channel.</span>
                ) : (
                  <span className="inline-grid align-bottom">
                    {CHANNELS.map((c, i) => (
                      <span
                        key={c}
                        aria-hidden={i !== index}
                        className="text-gradient-lime transition-all duration-500 ease-out [grid-area:1/1]"
                        style={{
                          opacity: i === index ? 1 : 0,
                          transform: i === index ? "translateY(0)" : "translateY(6px)",
                        }}
                      >
                        {c}.
                      </span>
                    ))}
                  </span>
                )}
              </span>
            </h1>

            <p
              data-reveal="rise"
              style={{ "--reveal-delay": 280 } as React.CSSProperties}
              className="mt-7 max-w-[50ch] text-[18px] leading-relaxed text-on-dark-2"
            >
              One compliance-ready platform for every message an Indian business needs to send — and every reply it
              gets back.
            </p>

            <div
              data-reveal="rise"
              style={{ "--reveal-delay": 350 } as React.CSSProperties}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Magnetic>
                <Button href="/contact" arrow>
                  Book a demo
                </Button>
              </Magnetic>
              <Magnetic strength={0.16}>
                <Button href="/developers/quickstart" variant="secondary" className="!border-ink-line !text-on-dark hover:!border-lime hover:!bg-white/[0.04]">
                  Read the docs
                </Button>
              </Magnetic>
            </div>

            <ul data-reveal="rise" style={{ "--reveal-delay": 420 } as React.CSSProperties} className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5">
              {TRUST.map((chip) => (
                <li key={chip} className="group flex items-center gap-2 text-[13.5px] text-on-dark-3">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0 text-lime" aria-hidden>
                    <path
                      d="M3 8.4l3.4 3.3L13 5"
                      stroke="currentColor"
                      strokeWidth="2.1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="transition-colors duration-fast group-hover:text-on-dark">{chip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal="scale" style={{ "--reveal-delay": 220 } as React.CSSProperties} className="relative">
            <HeroConsole />
          </div>
        </div>

        <div className="mt-16 hidden justify-center lg:flex" aria-hidden>
          <span className="flex h-9 w-[22px] items-start justify-center rounded-pill border border-ink-line pt-1.5">
            <span
              className="h-1.5 w-1.5 rounded-full bg-lime"
              style={{ animation: "mb-scroll-hint 1.8s var(--ease-out) infinite" }}
            />
          </span>
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
        <p className="mt-2.5 text-center font-mono text-[11px] text-on-dark-6">
          Sandbox demo — nothing leaves this page
        </p>
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
