import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import Backdrop from "@/components/motion/Backdrop";
import Spotlight from "@/components/motion/Spotlight";

const STAGES = [
  { title: "Entity registration", detail: "Your business registered as a Principal Entity.", owner: "We file it" },
  { title: "Header approval", detail: "A 6-character sender ID drafted and submitted.", owner: "We draft it" },
  { title: "Content templates", detail: "Variables declared correctly the first time.", owner: "We write them" },
  { title: "TM chain binding", detail: "Templates bound to your entity and header.", owner: "We confirm it" },
];

export default function DltHandled() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 md:py-28">
      <Backdrop variant="grid" tone="dark" />

      <div className="container relative max-w-container">
        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Eyebrow index="06" label="DLT, handled" dark />
            <Reveal delay={60}>
              <h2 className="max-w-[20ch] font-display text-[28px] font-extrabold tracking-tight text-on-dark md:text-[38px]">
                The paperwork that makes everyone switch providers.
              </h2>
            </Reveal>
            <Reveal delay={130}>
              <p className="mt-4 max-w-[52ch] text-[16.5px] text-on-dark-3">
                Entity, header, templates, TM chain binding — run in parallel with your build, not after you hit a wall.
              </p>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <Button
              href="/compliance"
              variant="secondary"
              arrow
              className="shrink-0 !border-ink-line !text-on-dark hover:!border-lime hover:!bg-white/[0.04]"
            >
              Read the guide
            </Button>
          </Reveal>
        </div>

        <div className="relative">
          <svg aria-hidden className="absolute left-0 right-0 top-[22px] hidden h-px w-full md:block" preserveAspectRatio="none" viewBox="0 0 1000 1">
            <path data-draw d="M40 0.5 H960" stroke="#AFFF49" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
          </svg>

          <Reveal stagger={110} className="grid gap-8 md:grid-cols-4 md:gap-5">
            {STAGES.map((s, i) => (
              <Reveal key={s.title}>
                <Spotlight className="h-full rounded-lg border border-ink-line bg-white/[0.02] p-6" size={320}>
                  <span className="relative z-10 mb-5 flex h-11 w-11 items-center justify-center rounded-full border-2 border-lime bg-ink">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                      <path d="M3 8.4l3.4 3.3L13 5" stroke="#AFFF49" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <p className="mb-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-lime">
                    {String(i + 1).padStart(2, "0")} · {s.owner}
                  </p>
                  <h3 className="mb-1.5 font-display text-[16px] font-semibold text-on-dark">{s.title}</h3>
                  <p className="text-[13.5px] leading-relaxed text-on-dark-4">{s.detail}</p>
                </Spotlight>
              </Reveal>
            ))}
          </Reveal>
        </div>

        <Reveal delay={180}>
          <p className="mt-10 font-mono text-[12.5px] text-on-dark-5">
            Operator and regulator queues are outside anyone&rsquo;s control — we tell you the realistic wait, not the
            best case.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
