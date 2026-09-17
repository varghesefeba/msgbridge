import type { ReactNode } from "react";

export type PhoneTone = "silver" | "black";

/**
 * The site's canonical phone mockup frame — a faithful copy of the home-page
 * phone (components/home/VerifyDemo.tsx): aspect-[9/19] body, rounded-[48px]
 * metallic bezel, ring highlight, pill notch, and a rounded-[38px] cream screen.
 *
 * `tone` follows the section background: "silver" on dark backgrounds (as on the
 * home page), "black" on light backgrounds. The screen itself stays light in
 * both, exactly like a real phone. Everything on the screen is passed as
 * children (header, body, home-indicator bar).
 */
const FRAME: Record<PhoneTone, { gradient: string; ring: string }> = {
  silver: { gradient: "from-[#f4f5f7] via-[#c6cad0] to-[#989ea6]", ring: "ring-white/50" },
  black: { gradient: "from-[#3b3e44] via-[#191b1f] to-[#0b0c0e]", ring: "ring-white/10" },
};

export default function PhoneFrame({
  tone = "black",
  className = "",
  children,
}: {
  tone?: PhoneTone;
  className?: string;
  children: ReactNode;
}) {
  const f = FRAME[tone];
  return (
    <div
      className={`relative aspect-[9/19] rounded-[48px] bg-gradient-to-br ${f.gradient} p-[11px] shadow-[0_46px_90px_-28px_rgba(0,0,0,0.85)] ${className}`}
    >
      <span aria-hidden className={`pointer-events-none absolute inset-0 rounded-[48px] ring-1 ${f.ring}`} />
      <span aria-hidden className="absolute left-1/2 top-[16px] z-30 h-[20px] w-[80px] -translate-x-1/2 rounded-full bg-black" />
      <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[38px] border border-black/50 bg-gradient-to-b from-[#f5f2ec] to-[#eae6dd]">
        {children}
      </div>
    </div>
  );
}
