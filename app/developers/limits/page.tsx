import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import ProseTemplate from "@/components/templates/ProseTemplate";
import Callout from "@/components/ui/Callout";

export const metadata: Metadata = buildMetadata("/developers/limits");

export default function LimitsPage() {
  return (
    <ProseTemplate eyebrow="Developers" title="Rate limits" crumb="Rate Limits">
      <Callout variant="note">Default sandbox limits are shown below. Production ceilings are set per account based on your registered volume — talk to us to raise yours.</Callout>
      <h2>Sandbox defaults</h2>
      <ul>
        <li><strong>10 requests/second</strong> per API key, burst up to 20.</li>
        <li><strong>1,000 messages/day</strong> across all channels in sandbox.</li>
      </ul>
      <h2>Exceeding a limit</h2>
      <p>A request over your limit returns HTTP 429 with a <code>retry_after</code> field in seconds. Back off and retry rather than hammering the endpoint — repeated 429s can trigger a temporary key suspension.</p>
      <h2>Raising your limit</h2>
      <p>Production limits scale with your registered DLT entity and confirmed volume. <a href="/contact">Talk to us</a> with your expected peak traffic before a big launch.</p>
    </ProseTemplate>
  );
}
