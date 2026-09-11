import type { ReactNode } from "react";

const STYLES = {
  note: { box: "bg-lime-050 border-lime-deep text-text-primary", icon: "#3F7A00" },
  warning: { box: "bg-[#FFF6E9] border-[#FF9A3E] text-text-primary", icon: "#b95f00" },
  compliance: { box: "bg-paper-warm border-ink-line text-text-secondary", icon: "#6B7280" },
} as const;

const ICONS = {
  note: <path d="M8 5.2v4.4M8 11.4h.01" strokeLinecap="round" />,
  warning: <path d="M8 4.8v4M8 11.4h.01M7 2.2 1.6 12.4a1.1 1.1 0 0 0 1 1.6h10.8a1.1 1.1 0 0 0 1-1.6L9 2.2a1.1 1.1 0 0 0-2 0Z" strokeLinecap="round" strokeLinejoin="round" />,
  compliance: <path d="M8 1.8 2.6 4v4c0 3.4 2.3 5.6 5.4 6.4 3.1-.8 5.4-3 5.4-6.4V4Zm-2 6.3 1.5 1.5L10.4 6.6" strokeLinecap="round" strokeLinejoin="round" />,
};

export default function Callout({
  children,
  variant = "note",
}: {
  children: ReactNode;
  variant?: keyof typeof STYLES;
}) {
  const style = STYLES[variant];

  return (
    <div className={`group/callout relative flex gap-3 overflow-hidden rounded-md border-l-4 px-5 py-4 text-[14.5px] leading-relaxed ${style.box}`}>
      <span
        data-reveal="clip"
        aria-hidden
        className="absolute inset-y-0 left-0 w-1 origin-top"
        style={{ background: style.icon }}
      />
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke={style.icon}
        strokeWidth="1.6"
        aria-hidden
        className="mt-[0.15em] shrink-0 transition-transform duration-base ease-out group-hover/callout:scale-110"
      >
        {variant !== "warning" && variant !== "compliance" && <circle cx="8" cy="8" r="6.2" />}
        {ICONS[variant]}
      </svg>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
