import Link from "next/link";

export default function Breadcrumb({
  items,
  tone = "light",
}: {
  items: { label: string; href?: string }[];
  tone?: "light" | "dark";
}) {
  const isDark = tone === "dark";

  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-[13px]">
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-1.5">
          {i > 0 && (
            <span aria-hidden className={isDark ? "text-on-dark-6" : "text-text-muted/50"}>
              /
            </span>
          )}
          {item.href ? (
            <Link
              href={item.href}
              className={`underline-grow transition-colors duration-fast ${
                isDark ? "text-on-dark-4 hover:text-lime" : "text-text-muted hover:text-lime-forest"
              }`}
            >
              {item.label}
            </Link>
          ) : (
            <span
              aria-current="page"
              className={`rounded-xs px-2 py-0.5 font-medium ${isDark ? "bg-white/[0.07] text-on-dark-2" : "bg-black/[0.045] text-text-secondary"}`}
            >
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
