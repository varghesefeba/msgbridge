import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import CountUp from "@/components/motion/CountUp";

const ROWS = [
  { channel: "SMS — transactional", unit: "per SMS", rate: 0.18, feature: false },
  { channel: "SMS — OTP", unit: "per SMS", rate: 0.14, feature: false },
  { channel: "WhatsApp — utility", unit: "per conversation", rate: 0.3, feature: false },
  { channel: "Voice", unit: "per second", rate: 0.09, feature: false },
  { channel: "MsgBridge Verify", unit: "per successful verification", rate: 0.6, feature: true },
];

export default function PricingTeaser() {
  return (
    <section className="bg-paper py-24 md:py-28">
      <div className="container max-w-container">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow index="09" label="Pricing, published" />
            <Reveal delay={60}>
              <h2 className="max-w-[20ch] font-display text-[28px] font-extrabold tracking-tight text-text-primary md:text-[38px]">
                Every rate, on the page. No &ldquo;contact sales&rdquo; wall.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={130}>
            <Button href="/pricing" variant="secondary" arrow>
              Full rate card
            </Button>
          </Reveal>
        </div>

        <Reveal variant="scale" className="overflow-hidden rounded-lg border border-line">
          <table className="w-full text-left">
            <thead className="bg-paper-warm">
              <tr>
                {["Channel", "Billing unit", "Starting at"].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-text-muted"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {ROWS.map((r) => (
                <tr
                  key={r.channel}
                  className={`group/row transition-colors duration-instant hover:bg-lime-050 ${r.feature ? "bg-lime-050/50" : ""}`}
                >
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-2.5 font-display text-[15px] font-medium text-text-primary">
                      <span
                        aria-hidden
                        className="h-1.5 w-1.5 shrink-0 rounded-full bg-line transition-colors duration-base group-hover/row:bg-lime-deep"
                      />
                      {r.channel}
                      {r.feature && (
                        <span className="rounded-xs bg-ink px-1.5 py-0.5 font-display text-[9.5px] uppercase tracking-wide text-lime">
                          Flagship
                        </span>
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[14px] text-text-muted">{r.unit}</td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-[17px] font-medium text-lime-forest">
                      <CountUp to={r.rate} decimals={2} prefix="₹" duration={800} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <Reveal delay={100}>
          <p className="mt-4 font-mono text-[12px] text-text-muted">
            Indicative starting rates, subject to operator pass-through changes. Volume pricing on request.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
