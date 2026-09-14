import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Eyebrow from "@/components/ui/Eyebrow";
import CodeCard from "@/components/ui/CodeCard";
import Stepper from "@/components/ui/Stepper";
import CTABand from "@/components/ui/CTABand";
import Button from "@/components/ui/Button";

export const metadata: Metadata = buildMetadata("/developers/quickstart");

const STEPS = [
  { title: "Get a sandbox key", detail: "Request sandbox credentials — no card, no contract." },
  { title: "Send a message", detail: "One POST request to /v1/messages with your key." },
  { title: "Receive the DLR", detail: "A delivery-report webhook confirms it landed." },
  { title: "Go live", detail: "Swap the sandbox key for a production key once your entity is registered." },
];

export default function QuickstartPage() {
  return (
    <div>
      <section className="relative overflow-hidden -mt-[var(--nav-h)] pt-[calc(var(--nav-h)+40px)] bg-ink pb-20">
        <div className="container max-w-container">
          <Breadcrumb tone="dark" items={[{ label: "Developers", href: "/developers/quickstart" }, { label: "Quickstart" }]} />
          <Eyebrow index="00" label="Quickstart" dark />
          <h1 className="font-display font-extrabold text-on-dark text-[30px] md:text-[48px] tracking-tight max-w-[20ch]">
            Signup to a delivered message in under five minutes.
          </h1>
          <div className="mt-10">
            <Stepper
              steps={STEPS.map((s) => ({ title: s.title, detail: s.detail }))}
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-paper">
        <div className="container max-w-container-narrow">
          <Eyebrow index="01" label="1. Get your key" />
          <p className="text-[15px] text-text-secondary mb-6 max-w-[56ch]">
            Request sandbox credentials from the dashboard, or ask us directly and we&rsquo;ll issue one by email.
          </p>
          <Button href="/developers/sandbox" variant="secondary">Request sandbox credentials</Button>
        </div>
      </section>

      <section className="py-20 bg-paper-warm">
        <div className="container max-w-container-narrow">
          <Eyebrow index="02" label="2. Send a message" />
          <p className="text-[15px] text-text-secondary mb-6 max-w-[56ch]">Copy this, swap in your key and your own number.</p>
          <CodeCard
            code={{
              curl: `curl https://sandbox.msgbridge.in/v1/messages \\\n  -H "Authorization: Bearer $SANDBOX_KEY" \\\n  -d to="+91XXXXXXXXXX" \\\n  -d channel="sms" \\\n  -d template_id="sandbox_welcome"`,
              node: `const msgbridge = require("msgbridge");\nconst client = msgbridge.client({ apiKey: process.env.SANDBOX_KEY, env: "sandbox" });\n\nconst message = await client.messages.send({\n  to: "+91XXXXXXXXXX",\n  channel: "sms",\n  templateId: "sandbox_welcome",\n});\nconsole.log(message.id);`,
              python: `import msgbridge\nclient = msgbridge.Client(api_key="SANDBOX_KEY", env="sandbox")\n\nmessage = client.messages.send(\n    to="+91XXXXXXXXXX",\n    channel="sms",\n    template_id="sandbox_welcome",\n)\nprint(message.id)`,
            }}
          />
        </div>
      </section>

      <section className="py-20 bg-paper">
        <div className="container max-w-container-narrow">
          <Eyebrow index="03" label="3. Receive the delivery report" />
          <p className="text-[15px] text-text-secondary mb-6 max-w-[56ch]">
            Point a webhook URL at your sandbox project. A delivery report arrives as the message moves from{" "}
            <code className="font-mono text-[13.5px] bg-paper-warm px-1.5 py-0.5 rounded-xs">queued</code> →{" "}
            <code className="font-mono text-[13.5px] bg-paper-warm px-1.5 py-0.5 rounded-xs">sent</code> →{" "}
            <code className="font-mono text-[13.5px] bg-paper-warm px-1.5 py-0.5 rounded-xs">delivered</code>.
          </p>
          <CodeCard
            code={{
              curl: `{\n  "message_id": "msg_9F2k",\n  "status": "delivered",\n  "channel": "sms",\n  "timestamp": "2026-09-05T10:22:31Z"\n}`,
              node: `{\n  "message_id": "msg_9F2k",\n  "status": "delivered",\n  "channel": "sms",\n  "timestamp": "2026-09-05T10:22:31Z"\n}`,
              python: `{\n  "message_id": "msg_9F2k",\n  "status": "delivered",\n  "channel": "sms",\n  "timestamp": "2026-09-05T10:22:31Z"\n}`,
            }}
            title="Example delivery-report payload"
          />
        </div>
      </section>

      <section className="py-20 bg-paper-warm">
        <div className="container max-w-container-narrow">
          <Eyebrow index="04" label="4. Go live" />
          <p className="text-[15px] text-text-secondary max-w-[56ch]">
            Once your DLT entity, header and templates are approved (see the{" "}
            <a href="/compliance" className="text-lime-forest underline">compliance guide</a>), swap your sandbox
            key for a production key. No code changes required.
          </p>
        </div>
      </section>

      <section className="py-16 bg-paper">
        <div className="container max-w-container-narrow">
          <Eyebrow index="05" label="Next steps" />
          <p className="text-[15px] text-text-secondary mb-6 max-w-[56ch]">
            Once your first message is delivering, explore the channel APIs, verification and delivery tooling.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "SMS API", href: "/developers/sms-api" },
              { label: "WhatsApp API", href: "/developers/whatsapp-api" },
              { label: "Voice API", href: "/developers/voice-api" },
              { label: "Verify API", href: "/developers/verify-api" },
              { label: "Webhooks", href: "/developers/webhooks" },
              { label: "Error codes", href: "/developers/errors" },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group/pill inline-flex items-center gap-2 rounded-pill border border-line bg-white px-5 py-2.5 text-[14px] font-medium text-text-primary transition-all duration-base ease-out hover:-translate-y-0.5 hover:border-lime-deep hover:shadow-card-sm"
              >
                {l.label}
                <span aria-hidden className="text-lime-forest transition-transform duration-base ease-out group-hover/pill:translate-x-1">→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <CTABand title="Have a technical question first?" supporting="Talk to our integration team before you write a line of code." cta="Talk to us" />
    </div>
  );
}
