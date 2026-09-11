import Eyebrow from "@/components/ui/Eyebrow";
import CodeCard from "@/components/ui/CodeCard";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import Backdrop from "@/components/motion/Backdrop";

const STEPS = [
  { n: "01", title: "Get a sandbox key", detail: "No card, no contract." },
  { n: "02", title: "Send a request", detail: "One POST to /v1/messages." },
  { n: "03", title: "Receive the DLR", detail: "A webhook confirms it landed." },
  { n: "04", title: "Go live", detail: "Swap the key. No code changes." },
];

export default function QuickstartTabs() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 md:py-28">
      <Backdrop variant="dots" tone="dark" />

      <div className="container relative grid max-w-container items-center gap-14 lg:grid-cols-2">
        <div>
          <Eyebrow index="11" label="Quickstart" dark />
          <Reveal delay={60}>
            <h2 className="mb-4 max-w-[18ch] font-display text-[28px] font-extrabold tracking-tight text-on-dark md:text-[38px]">
              First delivered message in under five minutes.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mb-10 max-w-[46ch] text-[16.5px] text-on-dark-3">
              Get sandbox credentials, send a request, and watch the delivery report come back over the API.
            </p>
          </Reveal>

          <Reveal stagger={80} className="mb-10 space-y-0">
            {STEPS.map((s) => (
              <Reveal key={s.n} variant="left">
                <div className="group/step flex items-baseline gap-4 border-b border-ink-line py-3.5 transition-colors duration-fast last:border-0 hover:border-lime/30">
                  <span className="font-mono text-[12px] text-lime">{s.n}</span>
                  <div>
                    <p className="font-display text-[15px] font-semibold text-on-dark transition-transform duration-base ease-out group-hover/step:translate-x-1">
                      {s.title}
                    </p>
                    <p className="text-[13.5px] text-on-dark-5">{s.detail}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </Reveal>

          <Reveal delay={140}>
            <Button href="/developers/quickstart" arrow>
              Open the quickstart
            </Button>
          </Reveal>
        </div>

        <Reveal variant="right" delay={80}>
          <CodeCard
            filename="quickstart.sh"

            code={{
              curl: `curl https://sandbox.msgbridge.in/v1/messages \\\n  -H "Authorization: Bearer $SANDBOX_KEY" \\\n  -d to="+91XXXXXXXXXX" \\\n  -d channel="whatsapp" \\\n  -d template_id="order_update"`,
              node: `import { MsgBridge } from "msgbridge";\n\nconst client = new MsgBridge(process.env.SANDBOX_KEY);\n\nconst message = await client.messages.send({\n  to: "+91XXXXXXXXXX",\n  channel: "whatsapp",\n  templateId: "order_update",\n});\n\nconsole.log(message.id);`,
              python: `from msgbridge import Client\n\nclient = Client(api_key=os.environ["SANDBOX_KEY"])\n\nmessage = client.messages.send(\n    to="+91XXXXXXXXXX",\n    channel="whatsapp",\n    template_id="order_update",\n)\n\nprint(message.id)`,
            }}
          />
          <p className="mt-4 text-center font-mono text-[12px] text-on-dark-5">
            PHP, Java and Go examples live in the full docs.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
