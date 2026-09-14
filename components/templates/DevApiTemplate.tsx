import Breadcrumb from "@/components/ui/Breadcrumb";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import CodeCard from "@/components/ui/CodeCard";
import Callout from "@/components/ui/Callout";
import CTABand from "@/components/ui/CTABand";
import Backdrop from "@/components/motion/Backdrop";
import Spotlight from "@/components/motion/Spotlight";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import type { CodeExample } from "@/lib/types";

const STATUS_CODES: { code: string; meaning: string }[] = [
  { code: "200 / 202", meaning: "Request accepted — the message is queued or the action succeeded." },
  { code: "400", meaning: "Malformed request — check required parameters and formats." },
  { code: "401", meaning: "Missing or invalid API key." },
  { code: "403", meaning: "Not permitted — often an unregistered entity, header or template." },
  { code: "422", meaning: "Validation failed — e.g. content does not match the registered DLT template." },
  { code: "429", meaning: "Rate limit exceeded — back off and retry." },
  { code: "5xx", meaning: "Temporary server error — retry with exponential backoff." },
];

const RELATED_REFS: { label: string; href: string }[] = [
  { label: "Quickstart", href: "/developers/quickstart" },
  { label: "Webhooks & delivery reports", href: "/developers/webhooks" },
  { label: "Error codes", href: "/developers/errors" },
  { label: "Rate limits", href: "/developers/limits" },
];

export interface DevApiParam {
  name: string;
  type: string;
  required: boolean;
  detail: string;
}

const METHOD_TONE: Record<string, string> = {
  POST: "bg-lime text-ink",
  GET: "bg-[rgba(83,189,235,0.18)] text-[#7FCBEF]",
  PUT: "bg-[rgba(255,154,62,0.18)] text-ch-voice",
  DELETE: "bg-[rgba(255,120,120,0.16)] text-[#FF9A9A]",
};

export default function DevApiTemplate({
  title,
  description,
  endpoint,
  params,
  request,
  response,
  draft,
}: {
  title: string;
  description: string;
  endpoint: string;
  params: DevApiParam[];
  request: CodeExample;
  response: string;
  draft?: boolean;
}) {
  const [maybeMethod, ...restOfEndpoint] = endpoint.trim().split(/\s+/);
  const isMethod = Object.prototype.hasOwnProperty.call(METHOD_TONE, maybeMethod.toUpperCase());
  const method = isMethod ? maybeMethod.toUpperCase() : null;
  const path = isMethod ? restOfEndpoint.join(" ") : endpoint;

  return (
    <div>
      <BreadcrumbJsonLd items={[{ name: "Home", slug: "/" }, { name: "Developers", slug: "/developers/quickstart" }, { name: title }]} />
      <section className="relative overflow-hidden bg-ink -mt-[var(--nav-h)] pt-[calc(var(--nav-h)+40px)] pb-16 md:pb-20">
        <Backdrop tone="dark" variant="grid" />
        <div className="container max-w-container relative">
          <Reveal variant="fall">
            <Breadcrumb tone="dark" items={[{ label: "Developers", href: "/developers/quickstart" }, { label: title }]} />
          </Reveal>
          <Reveal delay={60}>
            <Eyebrow index="API" label="Reference" dark />
          </Reveal>
          <Reveal delay={120}>
            <h1 className="font-display font-extrabold text-on-dark text-[28px] md:text-[42px] tracking-tight max-w-[24ch] text-balance">
              {title}
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-4 text-[16px] text-on-dark-3 max-w-[56ch]">{description}</p>
          </Reveal>

          <Reveal variant="scale" delay={250}>
            <Spotlight className="mt-7 inline-flex items-center gap-3 rounded-lg border border-ink-line bg-white/[0.04] py-2 pl-2 pr-4">
              {method && (
                <span className={`rounded-sm px-2.5 py-1 font-mono text-[11.5px] font-semibold tracking-wide ${METHOD_TONE[method]}`}>
                  {method}
                </span>
              )}
              <span className="font-mono text-[14px] text-lime">{path}</span>
            </Spotlight>
          </Reveal>
        </div>
      </section>

      {draft && (
        <div className="container max-w-container py-10">
          <Reveal>
            <Callout variant="note">
              This reference documents the intended request/response shape. Exact field names are confirmed with our
              platform partner before this endpoint goes live.
            </Callout>
          </Reveal>
        </div>
      )}

      <section className="py-16 md:py-20 bg-paper">
        <div className="container max-w-container">
          <Reveal>
            <Eyebrow index="01" label="Parameters" />
          </Reveal>
          <Reveal delay={80} className="rounded-lg border border-line overflow-x-auto bg-white">
            <table className="w-full text-left min-w-[620px]">
              <thead className="sticky top-0 z-10 bg-paper-warm/95 backdrop-blur">
                <tr className="border-b border-line">
                  {["Name", "Type", "Required", "Description"].map((h) => (
                    <th key={h} className="px-6 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-text-muted">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {params.map((p) => (
                  <tr key={p.name} className="group/row transition-colors duration-fast hover:bg-lime-050">
                    <td className="px-6 py-3.5 font-mono text-[13.5px] text-text-primary">{p.name}</td>
                    <td className="px-6 py-3.5 font-mono text-[12.5px] text-text-muted">{p.type}</td>
                    <td className="px-6 py-3.5 text-[13px]">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-pill px-2.5 py-0.5 font-display text-[11px] font-semibold uppercase tracking-wide ${
                          p.required ? "bg-lime-100 text-lime-forest" : "bg-paper-warm text-text-muted"
                        }`}
                      >
                        <span
                          aria-hidden
                          className={`h-1.5 w-1.5 rounded-full ${p.required ? "bg-lime-deep" : "bg-text-muted/60"}`}
                        />
                        {p.required ? "Required" : "Optional"}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-[13.5px] text-text-secondary">{p.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-paper-warm">
        <div className="container max-w-container grid lg:grid-cols-2 gap-10">
          <Reveal variant="left">
            <Eyebrow index="02" label="Request" />
            <CodeCard code={request} filename="request.sh" />
          </Reveal>
          <Reveal variant="right" delay={80}>
            <Eyebrow index="03" label="Response" />
            <CodeCard code={{ curl: response, node: response, python: response }} filename="200.json" chrome={false} />
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-paper">
        <div className="container max-w-container grid lg:grid-cols-2 gap-12">
          <Reveal variant="left">
            <Eyebrow index="04" label="API essentials" />
            <dl className="space-y-4">
              <div>
                <dt className="font-display font-semibold text-[14px] text-text-primary">Base URL</dt>
                <dd className="mt-0.5 font-mono text-[13.5px] text-text-secondary">https://api.msgbridge.in — sandbox: https://sandbox.msgbridge.in</dd>
              </div>
              <div>
                <dt className="font-display font-semibold text-[14px] text-text-primary">Authentication</dt>
                <dd className="mt-0.5 text-[14.5px] text-text-secondary">
                  Bearer token — send your API key as <code className="font-mono text-[13px] bg-paper-warm px-1.5 py-0.5 rounded-xs">Authorization: Bearer $API_KEY</code>. Keep keys server-side.
                </dd>
              </div>
              <div>
                <dt className="font-display font-semibold text-[14px] text-text-primary">Delivery reports</dt>
                <dd className="mt-0.5 text-[14.5px] text-text-secondary">
                  Status updates are pushed to your <Link href="/developers/webhooks" className="text-lime-forest underline">webhook</Link> as a message moves from queued to sent to delivered or failed.
                </dd>
              </div>
            </dl>
          </Reveal>
          <Reveal variant="right" delay={80}>
            <Eyebrow index="05" label="Status codes" />
            <div className="rounded-lg border border-line bg-white divide-y divide-line overflow-hidden">
              {STATUS_CODES.map((s) => (
                <div key={s.code} className="flex gap-4 px-5 py-3">
                  <span className="font-mono text-[13px] text-text-primary shrink-0 w-[68px]">{s.code}</span>
                  <span className="text-[13.5px] text-text-secondary">{s.meaning}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-14 bg-paper-warm">
        <div className="container max-w-container">
          <Eyebrow index="06" label="Related references" />
          <div className="flex flex-wrap gap-3">
            {RELATED_REFS.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="group/pill inline-flex items-center gap-2 rounded-pill border border-line bg-white px-5 py-2.5 text-[14px] font-medium text-text-primary transition-all duration-base ease-out hover:-translate-y-0.5 hover:border-lime-deep hover:shadow-card-sm"
              >
                {r.label}
                <span aria-hidden className="text-lime-forest transition-transform duration-base ease-out group-hover/pill:translate-x-1">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Need a hand integrating this?"
        supporting="Our integration team reviews your first call for free."
        href="/services/integration"
        cta="Get integration support"
      />
    </div>
  );
}
