import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import DevApiTemplate from "@/components/templates/DevApiTemplate";

export const metadata: Metadata = buildMetadata("/developers/sms-api");

export default function SmsApiPage() {
  return (
    <DevApiTemplate
      title="SMS API"
      description="Send transactional, OTP and promotional SMS through a single endpoint, with DLT template validation built in."
      endpoint="POST /v1/sms/send"
      params={[
        { name: "to", type: "string", required: true, detail: "Recipient number in E.164 format, e.g. +91XXXXXXXXXX." },
        { name: "entity_id", type: "string", required: true, detail: "Your registered DLT Principal Entity ID." },
        { name: "template_id", type: "string", required: true, detail: "Your approved DLT content template ID." },
        { name: "content", type: "object", required: true, detail: "Key-value map of the variables declared in the template." },
        { name: "callback_url", type: "string", required: false, detail: "Override the account-level webhook URL for this message only." },
      ]}
      request={{
        curl: `curl https://api.msgbridge.in/v1/sms/send \\\n  -H "Authorization: Bearer $API_KEY" \\\n  -d to="+91XXXXXXXXXX" \\\n  -d entity_id="$ENTITY_ID" \\\n  -d template_id="order_shipped" \\\n  -d content='{"order_id":"4821"}'`,
        node: `await client.sms.send({\n  to: "+91XXXXXXXXXX",\n  entityId: "$ENTITY_ID",\n  templateId: "order_shipped",\n  content: { order_id: "4821" },\n});`,
        python: `client.sms.send(\n    to="+91XXXXXXXXXX",\n    entity_id="$ENTITY_ID",\n    template_id="order_shipped",\n    content={"order_id": "4821"},\n)`,
      }}
      response={`{\n  "message_id": "msg_9F2k",\n  "status": "queued",\n  "channel": "sms"\n}`}
    />
  );
}
