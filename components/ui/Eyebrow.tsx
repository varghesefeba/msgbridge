import type { CSSProperties } from "react";

export default function Eyebrow({
  index,
  label,
  dark = false,
}: {
  index: string;
  label: string;
  dark?: boolean;
}) {
  return (
    <p className={`mb-4 flex items-center gap-2.5 font-mono text-[11.5px] uppercase tracking-[0.16em] ${dark ? "text-lime" : "text-lime-forest"}`}>
      <span className="relative flex h-1.5 w-1.5 shrink-0" aria-hidden>
        <span className={`absolute inline-flex h-full w-full rounded-full opacity-60 motion-safe:animate-ping ${dark ? "bg-lime" : "bg-lime-deep"}`} />
        <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${dark ? "bg-lime" : "bg-lime-deep"}`} />
      </span>
      <span data-reveal="left">{index}</span>
      <span aria-hidden className="opacity-40">
        /
      </span>
      <span data-reveal="left" style={{ "--reveal-delay": 80 } as CSSProperties}>
        {label}
      </span>
    </p>
  );
}
