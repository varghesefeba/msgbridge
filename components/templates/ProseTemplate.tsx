import type { ReactNode } from "react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Backdrop from "@/components/motion/Backdrop";

export default function ProseTemplate({
  eyebrow,
  title,
  crumb,
  lede,
  children,
}: {
  eyebrow: string;
  title: string;
  crumb: string;
  lede?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <section className="relative -mt-[var(--nav-h)] overflow-hidden bg-paper-warm pb-14 pt-[calc(var(--nav-h)+40px)]">
        <Backdrop tone="light" variant="grid" />
        <div className="container relative max-w-container-prose">
          <Reveal variant="fall">
            <Breadcrumb items={[{ label: crumb }]} />
          </Reveal>
          <Reveal delay={60}>
            <Eyebrow index="00" label={eyebrow} />
          </Reveal>
          <Reveal delay={120}>
            <h1 className="text-balance font-display text-[28px] font-extrabold tracking-tight text-text-primary md:text-[40px]">
              {title}
            </h1>
          </Reveal>
          {lede && (
            <Reveal delay={180}>
              <p className="mt-4 max-w-[60ch] text-[17px] leading-relaxed text-text-secondary">{lede}</p>
            </Reveal>
          )}
        </div>
      </section>

      <section className="bg-paper py-16 md:py-20">
        <Reveal delay={60} className="container prose-msg max-w-container-prose">
          {children}
        </Reveal>
      </section>
    </div>
  );
}
