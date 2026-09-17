import type { Metadata } from "next";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Eyebrow from "@/components/ui/Eyebrow";
import Callout from "@/components/ui/Callout";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = { title: "Sandbox & Test Credentials", description: "Request sandbox credentials to start building.", alternates: { canonical: "/developers/sandbox" } };

export default function SandboxPage() {
  return (
    <div>
      <section className="relative overflow-hidden -mt-[var(--nav-h)] pt-[calc(var(--nav-h)+40px)] bg-paper-warm pb-16">
        <div className="container max-w-container">
          <Reveal variant="fall">
            <Breadcrumb items={[{ label: "Developers", href: "/developers/quickstart" }, { label: "Sandbox" }]} />
          </Reveal>
          <Reveal delay={60}>
            <Eyebrow index="00" label="Sandbox & test credentials" />
          </Reveal>
          <Reveal variant="blur" delay={120}>
            <h1 className="font-display font-extrabold text-text-primary text-[28px] md:text-[42px] tracking-tight max-w-[20ch]">
              Get a sandbox key. No card, no contract.
            </h1>
          </Reveal>
        </div>
      </section>
      <div className="container max-w-container py-10">
        <Reveal>
          <Callout variant="note">Self-serve key issuance is on the roadmap. Today, request one below and we'll email it within 4 working hours.</Callout>
        </Reveal>
      </div>
      <section className="py-10 bg-paper">
        <div className="container max-w-container-narrow">
          <Reveal variant="scale">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
