import type { Metadata } from "next";
import ProseTemplate from "@/components/templates/ProseTemplate";

export const metadata: Metadata = { title: "Refund Policy", alternates: { canonical: "/legal/refunds" } };

export default function RefundsPage() {
  return (
    <ProseTemplate eyebrow="Legal" title="Refund Policy" crumb="Refund Policy">
      <h2>Messaging credit</h2>
      <p>Unused prepaid messaging credit is refundable within 12 months of purchase, minus any amount already consumed, on written request to your account contact.</p>
      <h2>Done-for-you services</h2>
      <p>One-off services such as DLT registration assistance or chatbot build are billed on completion of the agreed scope. If a submission is rejected by the regulator or platform for reasons within our control, we rework it at no additional cost — see the specific service page for details.</p>
      <h2>Failed deliveries</h2>
      <p>Messages that fail to deliver due to a verified platform-side fault are credited back automatically; failures caused by an invalid number, expired consent, or recipient network conditions are not refundable.</p>
    </ProseTemplate>
  );
}
