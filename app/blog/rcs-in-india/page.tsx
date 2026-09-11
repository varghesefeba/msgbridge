import type { Metadata } from "next";
import ProseTemplate from "@/components/templates/ProseTemplate";
import Callout from "@/components/ui/Callout";

export const metadata: Metadata = {
  title: "Is RCS ready for Indian businesses yet?",
  description: "What RCS gets you today, where its reach still falls short of SMS, and how to plan around both.",
  alternates: { canonical: "/blog/rcs-in-india" },
};

export default function Post() {
  return (
    <ProseTemplate eyebrow="Blog" title="Is RCS ready for Indian businesses yet?" crumb="Blog" lede="What it gets you today, where its reach still falls short of SMS, and how to plan around both.">
      <p>RCS Business Messaging brings branded, verified, app-like messages straight into the native messages app — rich cards, carousels and suggested actions, without asking the customer to install anything new.</p>
      <Callout variant="warning">RCS availability varies by device, network, operator and RCS support.</Callout>
      <h2>Where it shines</h2>
      <p>Order confirmations, appointment cards, and payment prompts all read better as a verified rich card than as plain text — when the recipient&rsquo;s device and carrier support it.</p>
      <h2>The practical approach</h2>
      <p>Treat RCS as an upgrade layer on top of SMS, not a replacement. See the <a href="/rcs">RCS Business Messaging</a> page, or the channel ladder on our homepage, for how the same message renders across SMS, WhatsApp and RCS.</p>
    </ProseTemplate>
  );
}
