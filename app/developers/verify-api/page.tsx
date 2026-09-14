import type { Metadata } from "next";
import DevApiTemplate from "@/components/templates/DevApiTemplate";

export const metadata: Metadata = { title: "Verify API", description: "Start and check a cascading OTP verification.", alternates: { canonical: "/developers/verify-api" } };

export default function VerifyApiPage() {
  return (
    <DevApiTemplate
      draft
      title="Verify API"
      description="Start a cascading verification across SMS, WhatsApp and voice, and check its status."
      endpoint="POST /v1/verify/start"
      params={[
        { name: "to", type: "string", required: true, detail: "Recipient number in E.164 format." },
        { name: "channels", type: "string[]", required: false, detail: "Cascade order, e.g. [\"sms\",\"whatsapp\",\"voice\"]. Defaults to your account setting." },
        { name: "code_length", type: "number", required: false, detail: "4–8 digits. Defaults to 6." },
        { name: "ttl_seconds", type: "number", required: false, detail: "Code validity window. Defaults to 300." },
      ]}
      request={{
        curl: `curl https://api.msgbridge.in/v1/verify/start \\\n  -H "Authorization: Bearer $API_KEY" \\\n  -d to="+91XXXXXXXXXX" \\\n  -d channels="sms,whatsapp,voice"`,
        node: `const v = await client.verify.start({\n  to: "+91XXXXXXXXXX",\n  channels: ["sms", "whatsapp", "voice"],\n});`,
        python: `v = client.verify.start(\n    to="+91XXXXXXXXXX",\n    channels=["sms", "whatsapp", "voice"],\n)`,
      }}
      response={`{\n  "verification_id": "vrf_88Ht",\n  "status": "pending",\n  "current_channel": "sms"\n}`}
    />
  );
}
