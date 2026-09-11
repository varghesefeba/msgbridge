import type { Metadata } from "next";
import DevApiTemplate from "@/components/templates/DevApiTemplate";

export const metadata: Metadata = { title: "RCS API", description: "Send RCS rich cards and carousels.", alternates: { canonical: "/developers/rcs-api" } };

export default function RcsApiPage() {
  return (
    <DevApiTemplate
      draft
      title="RCS API"
      description="Send a verified-sender rich card or carousel with suggested replies and actions."
      endpoint="POST /v1/rcs/send"
      params={[
        { name: "to", type: "string", required: true, detail: "Recipient number in E.164 format." },
        { name: "card", type: "object", required: true, detail: "Title, media, description and suggested actions for the rich card." },
        { name: "fallback_channel", type: "\"sms\" | \"whatsapp\"", required: false, detail: "Channel to use automatically if the device or network doesn't support RCS." },
      ]}
      request={{
        curl: `curl https://api.msgbridge.in/v1/rcs/send \\\n  -H "Authorization: Bearer $API_KEY" \\\n  -d to="+91XXXXXXXXXX" \\\n  -d card='{"title":"Order shipped","actions":["Track order"]}' \\\n  -d fallback_channel="sms"`,
        node: `await client.rcs.send({\n  to: "+91XXXXXXXXXX",\n  card: { title: "Order shipped", actions: ["Track order"] },\n  fallbackChannel: "sms",\n});`,
        python: `client.rcs.send(\n    to="+91XXXXXXXXXX",\n    card={"title": "Order shipped", "actions": ["Track order"]},\n    fallback_channel="sms",\n)`,
      }}
      response={`{\n  "message_id": "msg_2Rc9",\n  "status": "sent",\n  "channel": "rcs"\n}`}
    />
  );
}
