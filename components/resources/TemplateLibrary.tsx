"use client";

import { useEffect, useMemo, useState } from "react";

export interface TemplateEntry {
  title: string;
  body: string;
  group: string;
}

/** Splits a DLT template body so {{variables}} can be highlighted. */
function renderBody(body: string) {
  return body.split(/(\{\{[^}]+\}\})/g).map((part, i) =>
    part.startsWith("{{") ? (
      <span key={i} className="rounded-xs bg-lime-100 px-0.5 py-0.5 text-lime-forest">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default function TemplateLibrary({ entries }: { entries: TemplateEntry[] }) {
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const groups = useMemo(() => {
    const counts = new Map<string, number>();
    entries.forEach((e) => counts.set(e.group, (counts.get(e.group) ?? 0) + 1));
    return [{ name: "All", count: entries.length }, ...Array.from(counts, ([name, count]) => ({ name, count }))];
  }, [entries]);

  // Restore the filter from the URL after mount, so a shared link opens filtered.
  useEffect(() => {
    const group = new URLSearchParams(window.location.search).get("group");
    if (group && entries.some((e) => e.group === group)) setActive(group);
  }, [entries]);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (active === "All") url.searchParams.delete("group");
    else url.searchParams.set("group", active);
    window.history.replaceState(null, "", url.toString());
  }, [active]);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(null), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries.filter(
      (e) =>
        (active === "All" || e.group === active) &&
        (q === "" || e.title.toLowerCase().includes(q) || e.body.toLowerCase().includes(q) || e.group.toLowerCase().includes(q))
    );
  }, [entries, active, query]);

  async function copy(body: string, key: string) {
    try {
      await navigator.clipboard.writeText(body);
      setCopied(key);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-[320px]">
          <svg
            aria-hidden
            width="15"
            height="15"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted"
          >
            <circle cx="7" cy="7" r="4.6" />
            <path d="m10.6 10.6 3 3" strokeLinecap="round" />
          </svg>
          <label htmlFor="mb-tpl-search" className="sr-only">
            Search templates
          </label>
          <input
            id="mb-tpl-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search templates…"
            className="w-full rounded-pill border border-line bg-white py-2.5 pl-10 pr-4 text-[14px] text-text-primary outline-none transition-colors duration-fast placeholder:text-text-muted focus:border-lime-deep"
          />
        </div>

        <p className="font-mono text-[12px] text-text-muted" aria-live="polite">
          {visible.length} of {entries.length} templates
        </p>
      </div>

      <div className="mask-fade-edges mb-8 -mx-1 overflow-x-auto px-1 pb-1">
        <div className="flex w-max gap-2">
          {groups.map((g) => {
            const on = active === g.name;
            return (
              <button
                key={g.name}
                type="button"
                onClick={() => setActive(g.name)}
                aria-pressed={on}
                className={`flex shrink-0 items-center gap-2 rounded-pill border px-4 py-2 font-display text-[13px] font-semibold transition-all duration-base ease-out active:scale-95 ${
                  on
                    ? "border-transparent bg-lime-100 text-lime-forest shadow-card-sm"
                    : "border-line bg-paper-warm text-text-muted hover:border-ink-line/25 hover:text-text-secondary"
                }`}
              >
                {g.name}
                <span
                  className={`rounded-pill px-1.5 py-0.5 font-mono text-[10.5px] transition-all duration-base ${
                    on ? "animate-pop bg-lime-deep text-white" : "bg-white text-text-muted"
                  }`}
                >
                  {g.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="rounded-lg border border-dashed border-line bg-paper-warm px-6 py-14 text-center">
          <p className="font-display text-[16px] font-semibold text-text-primary">No templates match that search.</p>
          <p className="mt-1.5 text-[14px] text-text-muted">
            Try a different word, or{" "}
            <button onClick={() => { setQuery(""); setActive("All"); }} className="underline-grow font-medium text-lime-forest">
              clear the filters
            </button>
            .
          </p>
        </div>
      ) : (
        <div key={`${active}-${query}`} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((t, i) => {
            const key = `${t.group}-${t.title}-${i}`;
            const isCopied = copied === key;
            return (
              <div
                key={key}
                className="group/tpl animate-fade-up flex flex-col justify-between rounded-lg border border-line bg-white p-5 transition-all duration-base ease-out hover:-translate-y-1 hover:border-lime-200 hover:shadow-card-sm"
                style={{ animationDelay: `${Math.min(i, 12) * 45}ms` }}
              >
                <div>
                  <p className="mb-2 flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.13em] text-lime-forest">
                    <span className="h-1.5 w-1.5 rounded-full bg-lime-deep" aria-hidden />
                    {t.group}
                  </p>
                  <p className="mb-2.5 font-display text-[14.5px] font-semibold text-text-primary">{t.title}</p>
                  <p className="font-mono text-[12.5px] leading-relaxed text-text-secondary">{renderBody(t.body)}</p>
                </div>

                <button
                  type="button"
                  onClick={() => copy(t.body, key)}
                  aria-label={isCopied ? `Copied ${t.title}` : `Copy ${t.title}`}
                  className="mt-5 flex items-center gap-1.5 self-start rounded-sm px-2 py-1.5 font-display text-[11.5px] font-semibold uppercase tracking-wide text-text-muted transition-all duration-fast hover:bg-lime-050 hover:text-lime-forest active:scale-95"
                >
                  <span className="relative block h-3.5 w-3.5">
                    <svg
                      viewBox="0 0 16 16"
                      className="absolute inset-0 transition-all duration-300"
                      style={{ opacity: isCopied ? 0 : 1, transform: isCopied ? "scale(0.6)" : "none" }}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    >
                      <rect x="5.5" y="5.5" width="8" height="8" rx="1.6" />
                      <path d="M10.5 3.5H3.5a1 1 0 0 0-1 1v7" strokeLinecap="round" />
                    </svg>
                    <svg
                      viewBox="0 0 16 16"
                      className="absolute inset-0 text-lime-forest transition-all duration-300"
                      style={{ opacity: isCopied ? 1 : 0, transform: isCopied ? "none" : "scale(0.6)" }}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M3 8.5l3.2 3.2L13 5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {isCopied ? "Copied" : "Copy"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
