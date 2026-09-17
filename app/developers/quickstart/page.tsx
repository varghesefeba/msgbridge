import type { Metadata } from "next";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Eyebrow from "@/components/ui/Eyebrow";
import CodeCard from "@/components/ui/CodeCard";
import Stepper from "@/components/ui/Stepper";
import CTABand from "@/components/ui/CTABand";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Developer Quickstart",
  description: "Signup to a delivered test message in under five minutes. cURL, Node and Python examples against the MsgBridge sandbox.",
  alternates: { canonical: "/developers/quickstart" },
};

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
          <Reveal variant="fall">
            <Breadcrumb tone="dark" items={[{ label: "Developers", href: "/developers/quickstart" }, { label: "Quickstart" }]} />
          </Reveal>
          <Reveal delay={60}>
            <Eyebrow index="00" label="Quickstart" dark />
          </Reveal>
          <Reveal variant="blur" delay={120}>
            <h1 className="font-display font-extrabold text-on-dark text-[30px] md:text-[48px] tracking-tight max-w-[20ch]">
              Signup to a delivered message in under five minutes.
            </h1>
          </Reveal>
          <Reveal variant="scale" delay={200} className="mt-10">
            <Stepper
              steps={STEPS.map((s) => ({ title: s.title, detail: s.detail }))}
            />
          </Reveal>
        </div>
      </section>

      <section className="py-20 bg-paper">
        <div className="container max-w-container-narrow">
          <Reveal variant="left">
            <Eyebrow index="01" label="1. Get your key" />
            <p className="text-[15px] text-text-secondary mb-6 max-w-[56ch]">
              Request sandbox credentials from the dashboard, or ask us directly and we&rsquo;ll issue one by email.
            </p>
            <Button href="/developers/sandbox" variant="secondary">Request sandbox credentials</Button>
          </Reveal>
        </div>
      </section>

      <section className="py-20 bg-paper-warm">
        <div className="container max-w-container-narrow">
          <Reveal variant="left">
            <Eyebrow index="02" label="2. Send a message" />
            <p className="text-[15px] text-text-secondary mb-6 max-w-[56ch]">Copy this, swap in your key and your own number.</p>
          </Reveal>
          <Reveal variant="right" delay={80} className="transition-all duration-slow ease-out hover:drop-shadow-xl">
            <CodeCard
            code={{
              curl: `curl https://sandbox.msgbridge.in/v1/messages \\\n  -H "Authorization: Bearer $SANDBOX_KEY" \\\n  -d to="+91XXXXXXXXXX" \\\n  -d channel="sms" \\\n  -d template_id="sandbox_welcome"`,
              node: `const msgbridge = require("msgbridge");\nconst client = msgbridge.client({ apiKey: process.env.SANDBOX_KEY, env: "sandbox" });\n\nconst message = await client.messages.send({\n  to: "+91XXXXXXXXXX",\n  channel: "sms",\n  templateId: "sandbox_welcome",\n});\nconsole.log(message.id);`,
              python: `import msgbridge\nclient = msgbridge.Client(api_key="SANDBOX_KEY", env="sandbox")\n\nmessage = client.messages.send(\n    to="+91XXXXXXXXXX",\n    channel="sms",\n    template_id="sandbox_welcome",\n)\nprint(message.id)`,
            }}
          />
          </Reveal>
        </div>
      </section>

      <section className="py-20 bg-paper">
        <div className="container max-w-container-narrow">
          <Reveal variant="left">
            <Eyebrow index="03" label="3. Receive the delivery report" />
          <p className="text-[15px] text-text-secondary mb-6 max-w-[56ch]">
            Point a webhook URL at your sandbox project. A delivery report arrives as the message moves from{" "}
            <code className="font-mono text-[13.5px] bg-paper-warm px-1.5 py-0.5 rounded-xs">queued</code> →{" "}
            <code className="font-mono text-[13.5px] bg-paper-warm px-1.5 py-0.5 rounded-xs">sent</code> →{" "}
            <code className="font-mono text-[13.5px] bg-paper-warm px-1.5 py-0.5 rounded-xs">delivered</code>.
          </p>
          </Reveal>
          <Reveal variant="right" delay={80} className="transition-all duration-slow ease-out hover:drop-shadow-xl">
            <CodeCard
            code={{
              curl: `{\n  "message_id": "msg_9F2k",\n  "status": "delivered",\n  "channel": "sms",\n  "timestamp": "2026-09-05T10:22:31Z"\n}`,
              node: `{\n  "message_id": "msg_9F2k",\n  "status": "delivered",\n  "channel": "sms",\n  "timestamp": "2026-09-05T10:22:31Z"\n}`,
              python: `{\n  "message_id": "msg_9F2k",\n  "status": "delivered",\n  "channel": "sms",\n  "timestamp": "2026-09-05T10:22:31Z"\n}`,
            }}
            title="Example delivery-report payload"
          />
          </Reveal>
        </div>
      </section>

      <section className="py-20 bg-paper-warm">
        <div className="container max-w-container-narrow">
          <Reveal variant="left">
            <Eyebrow index="04" label="4. Go live" />
            <p className="text-[15px] text-text-secondary max-w-[56ch]">
              Once your DLT entity, header and templates are approved (see the{" "}
              <a href="/compliance" className="text-lime-forest underline underline-offset-2 decoration-lime-forest/40 transition-colors duration-fast hover:text-lime-deep hover:decoration-lime-deep">compliance guide</a>), swap your sandbox
              key for a production key. No code changes required.
            </p>
          </Reveal>
        </div>
      </section>

      <CTABand title="Have a technical question first?" supporting="Talk to our integration team before you write a line of code." cta="Talk to us" />
    </div>
  );
}
