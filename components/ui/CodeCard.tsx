"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CodeExample } from "@/lib/types";
import { tokenize, TOKEN_CLASS, LANG_OF, type Lang } from "@/lib/highlight";

const LANGS: { key: keyof CodeExample; label: string }[] = [
  { key: "curl", label: "cURL" },
  { key: "node", label: "Node" },
  { key: "python", label: "Python" },
];

export default function CodeCard({
  code,
  title,
  filename,
  chrome = true,
  lineNumbers = true,
}: {
  code: CodeExample;
  title?: string;
  filename?: string;
  chrome?: boolean;
  lineNumbers?: boolean;
}) {
  const [active, setActive] = useState<keyof CodeExample>("curl");
  const [copied, setCopied] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState({ left: 0, width: 0 });

  const source = code[active];

  useLayoutEffect(() => {
    const container = tabsRef.current;
    if (!container) return;
    const el = container.querySelector<HTMLElement>(`[data-tab="${active}"]`);
    if (el) setPill({ left: el.offsetLeft, width: el.offsetWidth });
  }, [active]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(source);
      setCopied(true);
    } catch {
      /* clipboard unavailable */
    }
  }

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  const lang: Lang = LANG_OF[active] ?? "shell";
  const lines = source.split("\n");

  return (
    <div
      ref={wrapRef}
      className="group relative rounded-lg border border-ink-line bg-ink shadow-card transition-colors duration-base hover:border-[#2b3138]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: "0 0 0 1px rgba(175,255,73,0.18), 0 24px 60px -30px rgba(175,255,73,0.35)" }}
      />

      <div className="flex items-center gap-3 border-b border-ink-line/70 px-3 py-2">
        {chrome && (
          <div className="hidden sm:flex items-center gap-1.5 pl-1 pr-1" aria-hidden>
            {["#3A3F45", "#3A3F45", "#3A3F45"].map((c, i) => (
              <span key={i} className="h-2.5 w-2.5 rounded-full transition-colors duration-300 group-hover:bg-[#4a5058]" style={{ background: c }} />
            ))}
          </div>
        )}

        <div ref={tabsRef} className="relative flex gap-0.5" role="tablist" aria-label="Code language">
          <span
            aria-hidden
            className="absolute inset-y-1 rounded-sm bg-white/[0.07] transition-all duration-base ease-out"
            style={{ left: pill.left, width: pill.width }}
          />
          {LANGS.map((l) => (
            <button
              key={l.key}
              data-tab={l.key}
              role="tab"
              aria-selected={active === l.key}
              onClick={() => setActive(l.key)}
              className={`relative z-10 rounded-sm px-3 py-1.5 font-display text-[12.5px] font-semibold uppercase tracking-wide transition-colors duration-fast ${
                active === l.key ? "text-lime" : "text-on-dark-5 hover:text-on-dark-2"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        {filename && <span className="ml-1 hidden font-mono text-[12px] text-on-dark-5 md:inline">{filename}</span>}

        <button
          onClick={copy}
          aria-label={copied ? "Copied" : "Copy code"}
          className="ml-auto flex items-center gap-1.5 rounded-sm px-2.5 py-1.5 font-display text-[12px] font-semibold uppercase tracking-wide text-on-dark-4 transition-all duration-fast hover:bg-white/5 hover:text-lime active:scale-95"
        >
          <span className="relative block h-3.5 w-3.5">
            <svg
              viewBox="0 0 16 16"
              className="absolute inset-0 transition-all duration-300"
              style={{ opacity: copied ? 0 : 1, transform: copied ? "scale(0.6) rotate(-12deg)" : "none" }}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <rect x="5.5" y="5.5" width="8" height="8" rx="1.6" />
              <path d="M10.5 3.5H3.5a1 1 0 0 0-1 1v7" strokeLinecap="round" />
            </svg>
            <svg
              viewBox="0 0 16 16"
              className="absolute inset-0 text-lime transition-all duration-300"
              style={{ opacity: copied ? 1 : 0, transform: copied ? "none" : "scale(0.6) rotate(12deg)" }}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 8.5l3.2 3.2L13 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>

      {title && <p className="px-4 pt-3 font-mono text-[12px] text-on-dark-5">{title}</p>}

      <div className="overflow-x-auto px-4 py-4">
        <pre className="font-mono text-[13.5px] leading-[1.7]">
          <code>
            {lines.map((line, i) => (
              <span key={i} className="grid grid-cols-[auto_1fr] gap-4">
                {lineNumbers && (
                  <span aria-hidden className="select-none text-right text-on-dark-6/60 tabular-nums">
                    {i + 1}
                  </span>
                )}
                <span className="text-on-dark-2">
                  {tokenize(line, lang).map((t, j) => (
                    <span key={j} className={t.kind ? TOKEN_CLASS[t.kind] : undefined}>
                      {t.text}
                    </span>
                  ))}
                </span>
              </span>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
