import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import StatTile from "@/components/ui/StatTile";

export default function CustomerStory() {
  return (
    <section className="bg-paper-warm py-24 md:py-28">
      <div className="container max-w-container-narrow">
        <Eyebrow index="10" label="How it plays out" />

        <Reveal variant="scale" delay={60}>
          <figure className="relative overflow-hidden rounded-lg border border-line bg-white p-8 md:p-12">
            <span
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-lime/10 blur-3xl"
            />

            <span aria-hidden className="block font-display text-[56px] leading-[0.6] text-lime-deep/40">
              &ldquo;
            </span>

            <blockquote className="mt-3 max-w-[38ch] font-display text-[22px] font-medium leading-snug text-text-primary md:text-[27px]">
              A D2C brand replaces five vendor logins with one integration — order updates on WhatsApp, OTP on Verify,
              payment reminders on voice — and goes live in the same sprint they signed the contract.
            </blockquote>

            <figcaption className="mt-5 flex items-center gap-2 font-mono text-[12px] text-text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-ch-voice" />
              Illustrative scenario — case studies with named results are published as customers sign them off.
            </figcaption>

            <Reveal stagger={90} className="mt-11 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-9">
              <Reveal>
                <StatTile value={5} suffix="→1" label="Vendor logins" />
              </Reveal>
              <Reveal>
                <StatTile value={1} label="Contract and invoice" />
              </Reveal>
              <Reveal>
                <StatTile value={4} suffix="h" label="First-response commitment" />
              </Reveal>
            </Reveal>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
