import type { CSSProperties } from "react";

/**
 * Layered section backdrop: faint grid or dot lattice, plus optional drifting
 * lime glow blobs. Purely decorative, always aria-hidden.
 */
export default function Backdrop({
  variant = "grid",
  tone = "dark",
  glow = true,
  className = "",
}: {
  variant?: "grid" | "dots" | "none";
  tone?: "dark" | "light";
  glow?: boolean;
  className?: string;
}) {
  const isDark = tone === "dark";
  const vars = {
    "--grid-color": isDark ? "rgba(255,255,255,0.04)" : "rgba(10,11,13,0.045)",
    "--dot-color": isDark ? "rgba(255,255,255,0.07)" : "rgba(10,11,13,0.07)",
  } as CSSProperties;

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} style={vars}>
      {variant !== "none" && (
        <div className={`absolute inset-0 mask-radial ${variant === "grid" ? "surface-grid" : "surface-dots"}`} />
      )}
      {glow && (
        <>
          <div
            className="absolute -top-32 -right-24 h-[520px] w-[520px] rounded-full blur-3xl animate-drift"
            style={{ background: isDark ? "radial-gradient(circle, rgba(175,255,73,0.13), transparent 65%)" : "radial-gradient(circle, rgba(175,255,73,0.30), transparent 65%)" }}
          />
          <div
            className="absolute -bottom-40 -left-32 h-[460px] w-[460px] rounded-full blur-3xl animate-drift"
            style={{
              animationDelay: "-8s",
              background: isDark ? "radial-gradient(circle, rgba(83,189,235,0.09), transparent 65%)" : "radial-gradient(circle, rgba(83,189,235,0.16), transparent 65%)",
            }}
          />
        </>
      )}
    </div>
  );
}
