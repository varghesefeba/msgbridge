import Breadcrumb from "@/components/ui/Breadcrumb";
import Eyebrow from "@/components/ui/Eyebrow";
import Callout from "@/components/ui/Callout";
import CTABand from "@/components/ui/CTABand";

export default function RateCardPage({
  title,
  intro,
  rows,
  note,
}: {
  title: string;
  intro: string;
  rows: { label: string; unit: string; rate: string }[];
  note?: string;
}) {
  return (
    <div>
      <section className="relative overflow-hidden -mt-[var(--nav-h)] pt-[calc(var(--nav-h)+40px)] bg-paper-warm pb-14">
        <div className="container max-w-container">
          <Breadcrumb items={[{ label: "Pricing", href: "/pricing" }, { label: title }]} />
          <Eyebrow index="00" label={`${title} pricing`} />
          <h1 className="font-display font-extrabold text-text-primary text-[28px] md:text-[42px] tracking-tight max-w-[20ch]">{title} pricing</h1>
          <p className="mt-4 text-[16px] text-text-secondary max-w-[54ch]">{intro}</p>
        </div>
      </section>
      <section className="py-14 bg-paper">
        <div className="container max-w-container">
          <div className="rounded-lg border border-line overflow-hidden overflow-x-auto bg-white">
            <table className="w-full text-left min-w-[480px]">
              <thead className="bg-paper-warm">
                <tr>
                  {["Category", "Unit", "Rate"].map((h) => (
                    <th key={h} className="px-6 py-4 text-[13px] font-display font-semibold uppercase tracking-wide text-text-muted">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {rows.map((r) => (
                  <tr key={r.label}>
                    <td className="px-6 py-4 font-display font-medium text-[15px] text-text-primary">{r.label}</td>
                    <td className="px-6 py-4 text-[14px] text-text-muted">{r.unit}</td>
                    <td className="px-6 py-4 font-mono text-[16px] font-medium text-lime-forest">{r.rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {note && (
            <div className="mt-6">
              <Callout variant="note">{note}</Callout>
            </div>
          )}
        </div>
      </section>
      <CTABand title="Need a custom rate?" supporting="High-volume accounts get volume pricing." cta="Talk to us" />
    </div>
  );
}
