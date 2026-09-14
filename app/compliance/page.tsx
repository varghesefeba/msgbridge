import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Eyebrow from "@/components/ui/Eyebrow";
import Callout from "@/components/ui/Callout";
import CTABand from "@/components/ui/CTABand";
import Accordion from "@/components/ui/Accordion";
import TableOfContents from "@/components/compliance/TableOfContents";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = buildMetadata("/compliance");

const SECTIONS = [
  { id: "what-is-dlt", label: "What DLT is" },
  { id: "who-needs", label: "Who needs to register" },
  { id: "entity", label: "Principal entity registration" },
  { id: "header", label: "Sender ID (header) registration" },
  { id: "templates", label: "Content template registration" },
  { id: "categories", label: "Template categories" },
  { id: "tm-chain", label: "TM chain binding" },
  { id: "consent", label: "Consent & opt-in records" },
  { id: "dnd", label: "DND scrubbing" },
  { id: "rejections", label: "Common rejection reasons" },
  { id: "timelines", label: "Realistic timelines" },
  { id: "checklist", label: "DLT checklist" },
];

const FAQ = [
  {
    q: "What is DLT registration for SMS in India?",
    a: "DLT (Distributed Ledger Technology) registration is TRAI's mandatory process for registering a commercial sender, its sender IDs (headers) and its message templates before business SMS will deliver reliably in India. It ties every message back to a verified entity, an approved header and a pre-registered template.",
  },
  {
    q: "Do I need DLT registration for OTP and transactional SMS?",
    a: "Yes. OTP and transactional messages are sent on registered transactional routes using approved templates bound to your entity and header. Without registration they are liable to be blocked rather than merely delayed.",
  },
  {
    q: "What is the difference between transactional and promotional templates?",
    a: "The template category determines which routes and time windows a message can use and how it is treated for consent and DND. Transactional and service templates cover order, payment and account messages; promotional templates cover marketing and are subject to DND scrubbing and consent.",
  },
  {
    q: "Why do my messages get rejected even after template approval?",
    a: "The most common causes are a variable mismatch between the live payload and the registered template text, the wrong category for the route, incomplete TM-chain binding, or missing consent records. Each is fixable — see the common rejection reasons above.",
  },
  {
    q: "Does MsgBridge handle DLT registration for me?",
    a: "Yes. MsgBridge runs entity, header, template and TM-chain binding alongside your integration through DLT Registration Assistance, so the paperwork moves in parallel with your build rather than after it.",
  },
];

function Rail() {
  return (
    <Callout variant="note">
      We do this step for you. <a href="/services/dlt-registration" className="underline font-medium">See DLT Registration Assistance →</a>
    </Callout>
  );
}

export default function CompliancePage() {
  return (
    <div>
      <BreadcrumbJsonLd items={[{ name: "Home", slug: "/" }, { name: "Resources" }, { name: "DLT & TRAI Compliance Guide", slug: "/compliance" }]} />
      <FaqJsonLd items={FAQ} />
      <section className="relative overflow-hidden -mt-[var(--nav-h)] pt-[calc(var(--nav-h)+40px)] bg-paper-warm pb-16">
        <div className="container max-w-container">
          <Breadcrumb items={[{ label: "Resources", href: "/" }, { label: "Compliance Guide" }]} />
          <Eyebrow index="00" label="DLT & TRAI compliance" />
          <h1 className="font-display font-extrabold text-text-primary text-[30px] md:text-[48px] tracking-tight max-w-[22ch]">
            The DLT & TRAI guide, in plain language.
          </h1>
          <p className="mt-4 text-[17px] text-text-secondary max-w-[58ch]">
            A genuine reference for anyone registering to send commercial messages in India — not a lead-gated PDF.
          </p>
        </div>
      </section>

      <section className="py-16 bg-paper">
        <div className="container max-w-container grid lg:grid-cols-[220px_1fr] gap-16">
          <TableOfContents sections={SECTIONS} />

          <article className="prose-msg max-w-[720px]">
            <h2 id="what-is-dlt">What DLT is, and why it exists</h2>
            <p>
              The Distributed Ledger Technology (DLT) platform is TRAI&rsquo;s system for registering every commercial
              sender, sender ID and message template used in India, so that regulators and operators can trace who
              sent what, on whose behalf, and with what consent. Any business sending transactional or promotional
              SMS or making automated voice calls at scale needs to register on it before traffic will deliver
              reliably.
            </p>

            <h2 id="who-needs">Who needs DLT registration</h2>
            <p>
              Any business, government body or organisation that sends commercial SMS in India — whether{" "}
              <a href="/sms/otp">OTP</a>, <a href="/sms/transactional">transactional</a> or{" "}
              <a href="/sms/promotional">promotional</a> — must register on DLT. This applies whether you send through
              a panel or an <a href="/developers/sms-api">SMS API</a>, and whether you send a few messages or millions.
              Person-to-person messages are out of scope; business-to-consumer messaging is not.
            </p>

            <h2 id="entity">Principal entity registration</h2>
            <p>
              Your business registers once as a Principal Entity with your operator of choice, using standard KYC —
              company PAN, GST, incorporation documents and an authorised signatory. This entity ID is the anchor
              every header and template is bound to afterwards.
            </p>
            <Rail />

            <h2 id="header">Sender ID (header) registration</h2>
            <p>
              A header is the 6-character sender ID your messages appear from (e.g. <code>MSGBRG</code>). Headers
              must be alphabetic, must reasonably represent your brand name, and are registered against your
              entity ID before any template can use them.
            </p>

            <h2 id="templates">Content template registration and variable rules</h2>
            <p>
              Every message body is registered in advance as a template with variables marked in curly braces, e.g.{" "}
              <code>{"Your OTP is {{1}}. Valid for {{2}} minutes."}</code>. The static text and variable positions
              must match exactly what you send at runtime — even a stray full stop can cause a mismatch and a
              blocked message.
            </p>
            <Rail />

            <h2 id="categories">Template categories</h2>
            <p>
              Templates are registered under a category — Transactional, Promotional or Service Explicit/Implicit —
              which determines which routes and time windows they can send on, and how they are treated for consent
              and DND purposes.
            </p>

            <h2 id="tm-chain">TM chain binding</h2>
            <p>
              The Telemarketer (TM) chain binds your entity, your header and your approved templates to the
              specific operator route carrying your traffic. Without this binding in place, an otherwise-approved
              template will still fail to deliver.
            </p>
            <Rail />

            <h2 id="consent">Consent and opt-in records</h2>
            <p>
              For promotional and certain service messages, you need a retrievable record of consent — when and how
              the customer opted in. Keep this against the same identifiers you register on DLT so it can be
              produced if an operator or TRAI ever asks for it.
            </p>

            <h2 id="dnd">DND scrubbing</h2>
            <p>
              Numbers registered on the National Do Not Disturb (NDNC) registry are automatically scrubbed from
              promotional sends. Transactional and consented service messages are exempt, which is exactly why
              template categorisation matters.
            </p>

            <h2 id="rejections">What gets messages rejected, and how to fix it</h2>
            <ul>
              <li><strong>Variable mismatch</strong> — the live payload doesn&rsquo;t match the registered template text exactly. Fix: log the exact registered string and diff against what your code sends.</li>
              <li><strong>Wrong category for the route</strong> — a promotional-style message sent on a transactional route. Fix: re-register the template under the correct category.</li>
              <li><strong>Header not bound to the template</strong> — TM chain binding incomplete. Fix: confirm binding status before going live, not after the first send fails.</li>
              <li><strong>Consent not on file</strong> — an operator audit finds no opt-in record for a promotional send. Fix: keep consent logs from day one, not retroactively.</li>
            </ul>

            <h2 id="timelines">Realistic timelines at each stage</h2>
            <p>
              Entity registration and header approval typically move within a few working days once documents are
              complete. Template approval is usually the fastest step when the content is drafted correctly the
              first time. Operator queues vary and are outside any platform&rsquo;s direct control — build in buffer
              before a hard launch date.
            </p>
            <Rail />

            <h2 id="checklist">DLT registration checklist</h2>
            <ul>
              <li>Register your business as a Principal Entity with KYC documents (PAN, GST, incorporation, authorised signatory).</li>
              <li>Register your alphabetic sender ID (header) against that entity.</li>
              <li>Draft and register each message body as a template, with variables in <code>{"{{ }}"}</code> placeholders.</li>
              <li>Register every template under the correct category — transactional, service or promotional.</li>
              <li>Confirm TM-chain binding of entity, header and templates on your operator route.</li>
              <li>Keep retrievable consent records for promotional and consented service messages.</li>
              <li>Match your live payload to the registered template text exactly before going live.</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-paper-warm">
        <div className="container max-w-container-narrow">
          <Eyebrow index="11" label="Frequently asked questions" />
          <Accordion items={FAQ} />
        </div>
      </section>

      <CTABand title="Want us to run this end to end?" supporting="We handle entity, header, template and TM chain binding for you." href="/services/dlt-registration" cta="See DLT Registration Assistance" />
    </div>
  );
}
