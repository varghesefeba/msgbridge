import Link from "next/link";
import Button from "@/components/ui/Button";

const SUGGESTIONS = [
  { label: "MsgBridge Verify", href: "/verify" },
  { label: "Industries", href: "/industries" },
  { label: "Developer quickstart", href: "/developers/quickstart" },
  { label: "Compliance guide", href: "/compliance" },
];

export default function NotFound() {
  return (
    <div className="bg-ink min-h-[70vh] flex items-center">
      <div className="container max-w-container-narrow py-24 text-center">
        <p className="font-display text-lime text-[15px] font-semibold uppercase tracking-wide mb-4">404</p>
        <h1 className="font-display font-extrabold text-on-dark text-[32px] md:text-[44px] tracking-tight mb-4">
          This page didn&rsquo;t make it through DLT approval.
        </h1>
        <p className="text-on-dark-3 text-[16px] mb-10">Here are a few places that did.</p>
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {SUGGESTIONS.map((s) => (
            <Link key={s.href} href={s.href} className="rounded-pill border border-ink-line px-5 py-2.5 text-[14px] font-medium text-on-dark-2 hover:border-lime hover:text-white transition-colors">
              {s.label}
            </Link>
          ))}
        </div>
        <Button href="/">Back to homepage</Button>
      </div>
    </div>
  );
}
