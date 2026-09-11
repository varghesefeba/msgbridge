import type { Metadata } from "next";
import ProseTemplate from "@/components/templates/ProseTemplate";
import Callout from "@/components/ui/Callout";

export const metadata: Metadata = { title: "SLA", alternates: { canonical: "/legal/sla" } };

export default function SlaPage() {
  return (
    <ProseTemplate eyebrow="Legal" title="Service Level Agreement" crumb="SLA">
      <Callout variant="note">
        Our SLA is finalised with our platform partner and published here once confirmed in writing. We publish only
        commitments we can honour — talk to us for the current draft terms.
      </Callout>
      <h2>What an SLA will cover</h2>
      <p>Support response times (see our <a href="/contact">support commitment</a>), incident communication, and
      remedies for sustained delivery degradation once a written ceiling is agreed with our upstream partner.</p>
      <h2>What&rsquo;s live today</h2>
      <p>First response within 4 working hours, on a named account contact, over WhatsApp during business hours — this commitment is operational now and doesn&rsquo;t wait on the formal SLA document.</p>
    </ProseTemplate>
  );
}
