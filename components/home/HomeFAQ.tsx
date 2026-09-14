import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Accordion from "@/components/ui/Accordion";
import { FaqJsonLd } from "@/components/seo/JsonLd";
import type { FAQ } from "@/lib/types";

const FAQS: FAQ[] = [
  {
    q: "What is a business messaging API?",
    a: "A business messaging API lets your application send and receive messages — SMS, WhatsApp, RCS or voice — through code instead of a manual dashboard. You call one endpoint, MsgBridge routes the message to the customer, and delivery reports are returned to your systems so you can track what happened.",
  },
  {
    q: "How does DLT affect SMS in India?",
    a: "TRAI requires businesses sending commercial SMS in India to register on the DLT (Distributed Ledger Technology) platform — an entity, a sender header and message templates. MsgBridge sends on DLT-registered routes and helps you complete entity, header and template registration so your messages are compliant.",
  },
  {
    q: "Can one API send SMS and WhatsApp?",
    a: "Yes. MsgBridge exposes SMS, WhatsApp, RCS and voice through one integration, so you can send on any channel — or fall back from one channel to another — without integrating a separate vendor for each.",
  },
  {
    q: "How does MsgBridge handle delivery failures?",
    a: "Every message returns a delivery report as its status moves from queued to sent to delivered or failed. For verification you can cascade across channels — for example SMS first, then WhatsApp, then a voice call — so a failure on one channel triggers the next until the code lands.",
  },
  {
    q: "Which channel should I use for OTPs, alerts or marketing?",
    a: "Use SMS or voice for authentication and time-critical alerts where reach matters most, WhatsApp for conversations and rich notifications to opted-in customers, and RCS for branded interactive messages on supported devices. Most businesses combine channels by use case.",
  },
  {
    q: "How quickly can we go live?",
    a: "Once your DLT entity, header and templates are approved, you can move from the sandbox to production by swapping your API key — no code changes. Timelines depend on regulator and platform approvals, which MsgBridge helps you prepare.",
  },
];

/** Homepage FAQ targeting broad buyer questions, with FAQPage structured data. */
export default function HomeFAQ() {
  return (
    <section className="py-20 md:py-24 bg-paper-warm">
      <FaqJsonLd items={FAQS} />
      <div className="container max-w-container-narrow">
        <Reveal>
          <Eyebrow index="09" label="Frequently asked questions" />
        </Reveal>
        <Reveal delay={80}>
          <h2 className="font-display font-extrabold text-text-primary text-[26px] md:text-[34px] tracking-tight mb-8 text-balance">
            Business messaging in India, answered
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <Accordion items={FAQS} />
        </Reveal>
      </div>
    </section>
  );
}
