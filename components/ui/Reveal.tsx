import type { CSSProperties, ElementType, ReactNode } from "react";

type Variant = "rise" | "fall" | "left" | "right" | "scale" | "blur" | "clip";

/**
 * Declarative scroll reveal. Renders no client JS — RevealEngine (mounted once
 * in the root layout) observes the data attributes.
 */
export default function Reveal({
  children,
  as: As = "div",
  delay = 0,
  variant = "rise",
  stagger,
  className = "",
  style,
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  variant?: Variant;
  /** Step in ms between children; enables the stagger container. */
  stagger?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <As
      data-reveal={variant}
      data-stagger={stagger ? "" : undefined}
      className={className}
      style={
        {
          "--reveal-delay": delay,
          ...(stagger ? { "--stagger-step": stagger } : null),
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </As>
  );
}
