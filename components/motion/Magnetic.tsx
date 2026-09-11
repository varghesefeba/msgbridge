"use client";

import type { ReactNode } from "react";
import { useMagnetic } from "@/lib/motion";

/** Subtle pull toward the cursor. Wraps a single interactive child. */
export default function Magnetic({
  children,
  strength = 0.22,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const { ref, offset, onMove, onLeave } = useMagnetic(strength);

  return (
    <span
      ref={ref as React.RefObject<HTMLSpanElement>}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`inline-block will-change-transform ${className}`}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: offset.x === 0 && offset.y === 0 ? "transform 420ms cubic-bezier(0.34,1.56,0.64,1)" : "transform 90ms linear",
      }}
    >
      {children}
    </span>
  );
}
