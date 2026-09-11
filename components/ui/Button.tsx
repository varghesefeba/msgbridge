import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "text" | "dark";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 rounded-pill font-display font-bold uppercase tracking-[0.06em] text-[15px] transition-[transform,box-shadow,background-color,border-color,color] duration-fast ease-out active:scale-[0.97] shine-host";

const variants: Record<Variant, string> = {
  primary:
    "bg-lime text-ink px-7 py-3.5 shadow-lime hover:-translate-y-0.5 hover:shadow-[0_16px_38px_-10px_rgba(175,255,73,0.85)]",
  dark: "bg-ink text-lime px-7 py-3.5 hover:-translate-y-0.5 hover:shadow-[0_16px_38px_-14px_rgba(10,11,13,0.7)]",
  secondary:
    "border border-line px-7 py-3.5 text-current hover:-translate-y-0.5 hover:border-lime-deep hover:bg-lime-050/60",
  ghost: "px-5 py-3 text-current hover:bg-black/5",
  text: "text-current normal-case tracking-normal font-body font-semibold",
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
  arrow = false,
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  arrow?: boolean;
}) {
  const cls = `${base} ${variants[variant]} ${className}`;
  const showArrow = arrow || variant === "text";

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {showArrow && (
        <span
          aria-hidden
          className="relative z-10 inline-block transition-transform duration-base ease-out group-hover/btn:translate-x-1"
        >
          →
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cls}>
        {content}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls}>
      {content}
    </button>
  );
}
