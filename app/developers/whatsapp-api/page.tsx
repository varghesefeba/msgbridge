import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import DevApiTemplate from "@/components/templates/DevApiTemplate";

export const metadata: Metadata = buildMetadata("/developers/whatsapp-api");

export default function WhatsappApiPage() {
  return (
    <DevApiTemplate
      title="WhatsApp API"
      description="Send template messages to start a conversation, or session messages within an open 24-hour window."
      endpoint="POST /v1/whatsapp/send"
      params={[
        { name: "to", type: "string", required: true, detail: "Recipient WhatsApp number in E.164 format." },
        { name: "type", type: "\"template\" | \"session\"", required: true, detail: "Whether this opens a new conversation or replies within an open window." },
        { name: "template_name", type: "string", required: false, detail: "Required when type is \"template\" — your approved template name." },
        { name: "components", type: "object", required: false, detail: "Header, body variables and button payloads for the template." },
        { name: "text", type: "string", required: false, detail: "Plain text body when type is \"session\"." },
      ]}
      request={{
        curl: `curl https://api.msgbridge.in/v1/whatsapp/send \\\n  -H "Authorization: Bearer $API_KEY" \\\n  -d to="+91XXXXXXXXXX" \\\n  -d type="template" \\\n  -d template_name="order_update" \\\n  -d components='{"1":"4821","2":"2 days"}'`,
        node: `await client.whatsapp.send({\n  to: "+91XXXXXXXXXX",\n  type: "template",\n  templateName: "order_update",\n  components: { "1": "4821", "2": "2 days" },\n});`,
        python: `client.whatsapp.send(\n    to="+91XXXXXXXXXX",\n    type="template",\n    template_name="order_update",\n    components={"1": "4821", "2": "2 days"},\n)`,
      }}
      response={`{\n  "message_id": "msg_7Lk2",\n  "status": "sent",\n  "channel": "whatsapp"\n}`}
    />
  );
}
