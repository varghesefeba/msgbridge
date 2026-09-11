import type { Metadata } from "next";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Eyebrow from "@/components/ui/Eyebrow";
import Callout from "@/components/ui/Callout";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = { title: "Sandbox & Test Credentials", description: "Request sandbox credentials to start building.", alternates: { canonical: "/developers/sandbox" } };

export default function SandboxPage() {
  return (
    <div>
      <section className="relative overflow-hidden -mt-[var(--nav-h)] pt-[calc(var(--nav-h)+40px)] bg-paper-warm pb-16">
        <div className="container max-w-container">
          <Breadcrumb items={[{ label: "Developers", href: "/developers/quickstart" }, { label: "Sandbox" }]} />
          <Eyebrow index="00" label="Sandbox & test credentials" />
          <h1 className="font-display font-extrabold text-text-primary text-[28px] md:text-[42px] tracking-tight max-w-[20ch]">
            Get a sandbox key. No card, no contract.
          </h1>
        </div>
      </section>
      <div className="container max-w-container py-10">
        <Callout variant="note">Self-serve key issuance is on the roadmap. Today, request one below and we'll email it within 4 working hours.</Callout>
      </div>
      <section className="py-10 bg-paper">
        <div className="container max-w-container-narrow">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
