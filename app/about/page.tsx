import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import ProseTemplate from "@/components/templates/ProseTemplate";

export const metadata: Metadata = buildMetadata("/about");

export default function AboutPage() {
  return (
    <ProseTemplate
      eyebrow="Company"
      title="One platform, so you stop juggling five."
      crumb="About"
      lede="MsgBridge exists because Indian businesses shouldn't need five vendor logins, five renewal dates and five compliance headaches just to reach a customer."
    >
      <h2>What we do</h2>
      <p>
        We bring SMS, WhatsApp, RCS and Voice together under one contract, one API and one invoice — with automation
        like chatbots, OTP verification and webhooks on top — and run the DLT and TRAI paperwork alongside your
        integration, so going live takes days, not quarters.
      </p>
      <h2>How we work</h2>
      <p>
        We deliver through licensed operator and platform partners rather than owning telecom infrastructure
        ourselves. What we own is the integration, the compliance handling, and the relationship — a named person
        who answers when something needs fixing.
      </p>
      <h2>Who it&rsquo;s for</h2>
      <p>
        Fintechs sending OTPs that have to land. D2C brands messaging customers across the order lifecycle. Clinics,
        schools and public offices with compliance requirements they&rsquo;d rather not manage in-house. If your
        business needs to reach customers reliably and legally in India, this is built for you.
      </p>
    </ProseTemplate>
  );
}
