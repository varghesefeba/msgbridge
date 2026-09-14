"use client";

import { useMemo, useState } from "react";
import { useAnimatedValue } from "@/lib/motion";

type ChannelKey = "sms" | "whatsapp" | "voice" | "rcs";

const CHANNELS: { key: ChannelKey; label: string; rate: number; unit: string; color: string }[] = [
  { key: "sms", label: "SMS", rate: 0.18, unit: "per SMS", color: "#53BDEB" },
  { key: "whatsapp", label: "WhatsApp", rate: 0.3, unit: "per conversation", color: "#25D366" },
  { key: "voice", label: "Voice", rate: 1.8, unit: "per 20-second call", color: "#FF9A3E" },
  { key: "rcs", label: "RCS", rate: 0.28, unit: "per message", color: "#3D82F5" },
];

const MIN = 1000;
const MAX = 500000;

export default function Estimator() {
  const [volume, setVolume] = useState(50000);
  const [mix, setMix] = useState<Record<ChannelKey, boolean>>({ sms: true, whatsapp: true, voice: false, rcs: false });

  const selected = CHANNELS.filter((c) => mix[c.key]);

  const { total, perChannel } = useMemo(() => {
    if (selected.length === 0) return { total: 0, perChannel: [] as { key: ChannelKey; label: string; color: string; units: number; cost: number }[] };
    const share = Math.round(volume / selected.length);
    const rows = selected.map((c) => ({ key: c.key, label: c.label, color: c.color, units: share, cost: share * c.rate }));
    return { total: rows.reduce((sum, r) => sum + r.cost, 0), perChannel: rows };
  }, [volume, selected]);

  const animatedTotal = useAnimatedValue(total);
  const animatedVolume = useAnimatedValue(volume, 200);
  const fill = ((volume - MIN) / (MAX - MIN)) * 100;

  return (
    <div className="rounded-lg border border-line bg-white p-6 md:p-8">
      <div className="mb-2 flex items-baseline justify-between gap-4">
        <label htmlFor="mb-volume" className="font-display text-[14.5px] font-semibold text-text-primary">
          Monthly volume
        </label>
        <output htmlFor="mb-volume" className="font-mono text-[15px] font-medium tabular-nums text-lime-forest">
          {Math.round(animatedVolume).toLocaleString("en-IN")}
        </output>
      </div>

      <input
        id="mb-volume"
        type="range"
        min={MIN}
        max={MAX}
        step={1000}
        value={volume}
        onChange={(e) => setVolume(Number(e.target.value))}
        aria-describedby="mb-volume-hint"
        className="mb-range w-full"
        style={{ background: `linear-gradient(to right, #AFFF49 ${fill}%, #E8EAE3 ${fill}%)` }}
      />
      <p id="mb-volume-hint" className="mb-7 mt-2 flex justify-between font-mono text-[11px] text-text-muted">
        <span>1K</span>
        <span>messages / month</span>
        <span>500K</span>
      </p>

      <p className="mb-3 font-display text-[14.5px] font-semibold text-text-primary">Channel mix</p>
      <div className="mb-8 flex flex-wrap gap-2">
        {CHANNELS.map((c) => {
          const on = mix[c.key];
          return (
            <button
              key={c.key}
              type="button"
              onClick={() => setMix((m) => ({ ...m, [c.key]: !m[c.key] }))}
              aria-pressed={on}
              title={`₹${c.rate.toFixed(2)} ${c.unit}`}
              className={`group/pill flex items-center gap-2 rounded-pill border px-4 py-2 font-display text-[13.5px] font-semibold transition-all duration-base ease-out active:scale-95 ${
                on
                  ? "border-transparent bg-lime-100 text-lime-forest shadow-card-sm"
                  : "border-line bg-paper-warm text-text-muted hover:border-ink-line/25 hover:text-text-secondary"
              }`}
            >
              <span
                aria-hidden
                className="flex h-3.5 w-3.5 items-center justify-center rounded-full transition-all duration-base ease-out"
                style={{ background: on ? c.color : "transparent", border: on ? "none" : "1.5px solid #D3D7CE", transform: on ? "scale(1)" : "scale(0.85)" }}
              >
                {on && (
                  <svg width="9" height="9" viewBox="0 0 16 16" fill="none" className="animate-pop text-white">
                    <path d="M3 8.4l3.4 3.3L13 5" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              {c.label}
            </button>
          );
        })}
      </div>

      <div className="border-t border-line pt-6">
        <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.14em] text-text-muted">Estimated monthly cost</p>
        <p className="font-display text-[38px] font-extrabold leading-none tabular-nums text-text-primary">
          ₹
          {Math.round(animatedTotal).toLocaleString("en-IN")}
        </p>

        <div className="mt-5 space-y-2" aria-live="polite">
          {perChannel.length === 0 ? (
            <p className="text-[13.5px] text-text-muted">Pick at least one channel to see an estimate.</p>
          ) : (
            perChannel.map((row, i) => {
              const share = total > 0 ? (row.cost / total) * 100 : 0;
              return (
                <div key={row.key} className="animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
                  <div className="flex items-center justify-between gap-3 text-[13px]">
                    <span className="flex items-center gap-2 text-text-secondary">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: row.color }} aria-hidden />
                      {row.label}
                      <span className="font-mono text-[11.5px] text-text-muted">
                        {row.units.toLocaleString("en-IN")} units
                      </span>
                    </span>
                    <span className="font-mono tabular-nums text-text-primary">₹{Math.round(row.cost).toLocaleString("en-IN")}</span>
                  </div>
                  <div className="mt-1 h-[3px] overflow-hidden rounded-full bg-line">
                    <div
                      className="h-full rounded-full transition-[width] duration-slow ease-out"
                      style={{ width: `${share}%`, background: row.color }}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>

        <p className="mt-5 font-mono text-[11px] leading-relaxed text-text-muted">
          Indicative only — volume is split evenly across the channels you pick. Excludes GST, one-off services and
          template-category differences.
        </p>
      </div>

      <style>{`
        .mb-range{-webkit-appearance:none;appearance:none;height:6px;border-radius:999px;outline:none;cursor:pointer}
        .mb-range::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:22px;height:22px;border-radius:50%;background:#0A0B0D;border:3px solid #AFFF49;box-shadow:0 4px 12px -4px rgba(10,11,13,.5);transition:transform 160ms cubic-bezier(.34,1.56,.64,1)}
        .mb-range::-webkit-slider-thumb:hover{transform:scale(1.1)}
        .mb-range:active::-webkit-slider-thumb{transform:scale(1.15)}
        .mb-range::-moz-range-thumb{width:16px;height:16px;border-radius:50%;background:#0A0B0D;border:3px solid #AFFF49;transition:transform 160ms}
        .mb-range:active::-moz-range-thumb{transform:scale(1.15)}
        .mb-range:focus-visible::-webkit-slider-thumb{box-shadow:0 0 0 4px rgba(111,168,0,.35)}
      `}</style>
    </div>
  );
}
