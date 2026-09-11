import type { CSSProperties, ReactNode } from "react";

/**
 * Infinite horizontal scroller. Pure CSS: duplicates its children once and
 * translates -50%. Pauses on hover; freezes into a static row under
 * prefers-reduced-motion (handled globally in globals.css).
 */
export default function Marquee({
  children,
  duration = 38,
  reverse = false,
  className = "",
  gap = 48,
}: {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  className?: string;
  gap?: number;
}) {
  return (
    <div className={`group/marquee relative overflow-hidden mask-fade-edges ${className}`}>
      <div
        className="flex w-max animate-marquee group-hover/marquee:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center"
        style={
          {
            "--marquee-duration": `${duration}s`,
            gap: `${gap}px`,
            paddingRight: `${gap}px`,
            animationDirection: reverse ? "reverse" : "normal",
          } as CSSProperties
        }
      >
        <div className="flex shrink-0 items-center" style={{ gap: `${gap}px` }}>
          {children}
        </div>
        <div className="flex shrink-0 items-center motion-reduce:hidden" style={{ gap: `${gap}px` }} aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
