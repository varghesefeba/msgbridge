import Reveal from "./Reveal";

export default function Stepper({ steps }: { steps: { title: string; detail: string }[] }) {
  return (
    <div className="relative">
      <div aria-hidden className="absolute left-0 right-0 top-[17px] hidden h-px overflow-hidden bg-line md:block">
        <span data-reveal="clip" className="block h-full w-full bg-gradient-to-r from-lime-deep via-lime to-transparent" />
      </div>

      <Reveal stagger={90} className="grid gap-8 md:grid-cols-4 md:gap-5">
        {steps.map((step, i) => (
          <Reveal key={step.title} className="group/step relative">
            <div className="flex gap-4 md:flex-col md:gap-0">
              <span className="relative z-10 flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full border border-lime-deep/30 bg-ink font-display text-[13px] font-bold text-lime transition-all duration-base ease-out group-hover/step:scale-110 group-hover/step:shadow-[0_0_0_5px_rgba(175,255,73,0.14)] md:mb-5">
                {i + 1}
              </span>
              <div>
                <h3 className="mb-1 font-display text-[15.5px] font-semibold text-text-primary">{step.title}</h3>
                <p className="text-[14px] leading-relaxed text-text-secondary">{step.detail}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </Reveal>
    </div>
  );
}
