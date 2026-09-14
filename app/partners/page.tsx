import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import ProseTemplate from "@/components/templates/ProseTemplate";
import Button from "@/components/ui/Button";

export const metadata: Metadata = buildMetadata("/partners");

export default function PartnersPage() {
  return (
    <ProseTemplate
      eyebrow="Company"
      title="Sell MsgBridge under your own name."
      crumb="Partners"
      lede="Built for agencies and resellers who already have the client relationships and want a messaging platform behind them, not in front of them."
    >
      <h2>How it works</h2>
      <p>You bring the client relationship; we bring the platform, the compliance handling and the delivery. Sub-accounts let you manage multiple client workspaces from one login, with usage billed back to you at partner rates.</p>
      <h2>What you get</h2>
      <ul>
        <li>Margin on every channel, at volume-tiered partner rates.</li>
        <li>Sub-account management for client workspaces.</li>
        <li>White-label options for client-facing dashboards, where volume justifies the setup.</li>
        <li>The same DLT and onboarding support your clients would get direct, run under your account.</li>
      </ul>
      <h2>Who this suits</h2>
      <p>Marketing and web agencies adding messaging to their service list, IT resellers with an SME client base, and consultants who advise on customer communication but don&rsquo;t want to run infrastructure themselves.</p>
      <div className="not-prose mt-8">
        <Button href="/contact">Apply to the programme</Button>
      </div>
    </ProseTemplate>
  );
}
