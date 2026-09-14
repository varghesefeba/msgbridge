import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Eyebrow from "@/components/ui/Eyebrow";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = buildMetadata("/contact");

export default function ContactPage() {
  return (
    <div>
      <section className="relative overflow-hidden -mt-[var(--nav-h)] pt-[calc(var(--nav-h)+40px)] bg-paper-warm pb-16">
        <div className="container max-w-container">
          <Breadcrumb items={[{ label: "Contact" }]} />
          <Eyebrow index="00" label="Contact & support" />
          <h1 className="font-display font-extrabold text-text-primary text-[30px] md:text-[48px] tracking-tight max-w-[20ch]">
            Talk to us.
          </h1>
          <p className="mt-4 text-[17px] text-text-secondary max-w-[54ch]">
            First response within 4 working hours. A named account contact once we&rsquo;re working together. Support on
            WhatsApp during business hours.
          </p>
        </div>
      </section>

      <section className="py-16 bg-paper">
        <div className="container max-w-container grid lg:grid-cols-[1fr_420px] gap-12">
          <div>
            <Eyebrow index="01" label="What happens next" />
            <ol className="space-y-4 max-w-[46ch]">
              {[
                "We reply within 4 working hours, usually sooner.",
                "A quick call or WhatsApp thread to understand your volumes and channels.",
                "Sandbox credentials or a demo, whichever fits what you need next.",
              ].map((step, i) => (
                <li key={step} className="flex gap-4">
                  <span className="w-7 h-7 rounded-full bg-ink text-lime font-display font-bold text-[12px] flex items-center justify-center shrink-0">{i + 1}</span>
                  <span className="text-[15px] text-text-secondary pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
