import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import ProseTemplate from "@/components/templates/ProseTemplate";
import Callout from "@/components/ui/Callout";
import Button from "@/components/ui/Button";

export const metadata: Metadata = buildMetadata("/developers/postman");

export default function PostmanPage() {
  return (
    <ProseTemplate eyebrow="Developers" title="Postman collection" crumb="Postman">
      <Callout variant="note">The public collection link is published alongside your sandbox credentials. Request access below.</Callout>
      <p>The collection covers SMS, WhatsApp, Voice and Verify endpoints, pre-filled with the sandbox base URL and an environment variable for your API key.</p>
      <div className="not-prose mt-6">
        <Button href="/developers/sandbox">Request sandbox access</Button>
      </div>
    </ProseTemplate>
  );
}
