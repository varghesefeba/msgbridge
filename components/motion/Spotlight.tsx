"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { usePointer } from "@/lib/motion";

/**
 * Cursor-following radial glow inside a card (PRD §14.3 M18). Desktop pointers
 * only — usePointer no-ops on touch.
 */
export default function Spotlight({
  children,
  className = "",
  size = 420,
  color = "rgba(175,255,73,0.10)",
  border = true,
}: {
  children: ReactNode;
  className?: string;
  size?: number;
  color?: string;
  border?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { px, py, active } = usePointer(ref);

  return (
    <div
      ref={ref}
      className={`relative isolate overflow-hidden group/spot ${className}`}
      style={{ "--sx": `${px}px`, "--sy": `${py}px` } as CSSProperties}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 transition-opacity duration-500"
        style={{
          opacity: active ? 1 : 0,
          background: `radial-gradient(${size}px circle at var(--sx) var(--sy), ${color}, transparent 68%)`,
        }}
      />
      {border && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] transition-opacity duration-500"
          style={{
            opacity: active ? 1 : 0,
            padding: 1,
            background: `radial-gradient(${size * 0.6}px circle at var(--sx) var(--sy), rgba(175,255,73,0.5), transparent 70%)`,
            WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
      )}
      {children}
    </div>
  );
}
