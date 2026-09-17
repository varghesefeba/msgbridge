import type { Metadata } from "next";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Eyebrow from "@/components/ui/Eyebrow";
import ContactForm from "@/components/contact/ContactForm";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Contact & Support",
  description: "Talk to us about SMS, WhatsApp, RCS, Voice or MsgBridge Verify. First response within 4 working hours.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div>
      <section className="relative overflow-hidden -mt-[var(--nav-h)] pt-[calc(var(--nav-h)+40px)] bg-paper-warm pb-16">
        <div className="container max-w-container">
          <Reveal variant="fall">
            <Breadcrumb items={[{ label: "Contact" }]} />
          </Reveal>
          <Reveal delay={60}>
            <Eyebrow index="00" label="Contact & support" />
          </Reveal>
          <Reveal variant="blur" delay={120}>
            <h1 className="font-display font-extrabold text-text-primary text-[30px] md:text-[48px] tracking-tight max-w-[20ch]">
              Talk to us.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-4 text-[17px] text-text-secondary max-w-[54ch]">
              First response within 4 working hours. A named account contact once we&rsquo;re working together. Support on
              WhatsApp during business hours.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 bg-paper">
        <div className="container max-w-container grid lg:grid-cols-[1fr_420px] gap-12">
          <Reveal variant="left">
            <Eyebrow index="01" label="What happens next" />
            <ol className="space-y-4 max-w-[46ch]">
              {[
                "We reply within 4 working hours, usually sooner.",
                "A quick call or WhatsApp thread to understand your volumes and channels.",
                "Sandbox credentials or a demo, whichever fits what you need next.",
              ].map((step, i) => (
                <Reveal as="li" key={step} delay={i * 90} className="group/item flex gap-4">
                  <span className="w-7 h-7 rounded-full bg-ink text-lime font-display font-bold text-[12px] flex items-center justify-center shrink-0 transition-transform duration-base ease-out group-hover/item:scale-110">
                    {i + 1}
                  </span>
                  <span className="text-[15px] text-text-secondary pt-0.5 transition-colors duration-fast group-hover/item:text-text-primary">
                    {step}
                  </span>
                </Reveal>
              ))}
            </ol>
          </Reveal>
          <Reveal variant="right" delay={80}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
