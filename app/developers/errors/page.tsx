import type { Metadata } from "next";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Eyebrow from "@/components/ui/Eyebrow";
import Callout from "@/components/ui/Callout";
import CTABand from "@/components/ui/CTABand";

export const metadata: Metadata = { title: "Error Codes", description: "Common API error codes and how to resolve them.", alternates: { canonical: "/developers/errors" } };

const ERRORS = [
  { code: "invalid_number", status: 400, fix: "The recipient number isn't a valid E.164 number. Include the country code, e.g. +91XXXXXXXXXX." },
  { code: "template_mismatch", status: 422, fix: "The content sent doesn't match the registered DLT template exactly. Diff against your approved template string." },
  { code: "entity_not_bound", status: 403, fix: "Your header or template isn't TM-chain-bound to this entity yet. Check status in your dashboard or ask us to confirm." },
  { code: "consent_required", status: 403, fix: "This is a promotional send to a number without a recorded opt-in. Log consent before sending, or use a transactional template if eligible." },
  { code: "rate_limited", status: 429, fix: "You've exceeded your current rate limit. See Rate Limits, or ask us to raise your ceiling." },
  { code: "invalid_api_key", status: 401, fix: "Check you're using the right key for the right environment — sandbox keys don't work against production." },
];

export default function ErrorsPage() {
  return (
    <div>
      <section className="relative overflow-hidden -mt-[var(--nav-h)] pt-[calc(var(--nav-h)+40px)] bg-ink pb-16">
        <div className="container max-w-container">
          <Breadcrumb tone="dark" items={[{ label: "Developers", href: "/developers/quickstart" }, { label: "Error Codes" }]} />
          <Eyebrow index="API" label="Reference" dark />
          <h1 className="font-display font-extrabold text-on-dark text-[28px] md:text-[42px] tracking-tight">Error codes</h1>
        </div>
      </section>
      <div className="container max-w-container py-10">
        <Callout variant="note">This is a representative set. The full, versioned catalogue ships with your API key.</Callout>
      </div>
      <section className="py-10 bg-paper">
        <div className="container max-w-container">
          <div className="rounded-lg border border-line overflow-hidden overflow-x-auto bg-white">
            <table className="w-full text-left min-w-[560px]">
              <thead className="bg-paper-warm">
                <tr>
                  {["Code", "HTTP status", "How to fix it"].map((h) => (
                    <th key={h} className="px-6 py-3 text-[12.5px] font-display font-semibold uppercase tracking-wide text-text-muted">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {ERRORS.map((e) => (
                  <tr key={e.code}>
                    <td className="px-6 py-3.5 font-mono text-[13.5px] text-text-primary">{e.code}</td>
                    <td className="px-6 py-3.5 text-[13.5px] text-text-muted">{e.status}</td>
                    <td className="px-6 py-3.5 text-[13.5px] text-text-secondary">{e.fix}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <CTABand title="Stuck on an error?" supporting="Send us the message ID and we'll dig in." href="/services/integration" cta="Get integration support" />
    </div>
  );
}
