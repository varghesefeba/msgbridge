import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import DevApiTemplate from "@/components/templates/DevApiTemplate";

export const metadata: Metadata = buildMetadata("/developers/voice-api");

export default function VoiceApiPage() {
  return (
    <DevApiTemplate
      title="Voice API"
      description="Place a text-to-speech call, with optional DTMF (press-1) capture, in one request."
      endpoint="POST /v1/voice/call"
      params={[
        { name: "to", type: "string", required: true, detail: "Recipient number in E.164 format." },
        { name: "script_id", type: "string", required: true, detail: "Your approved voice script or a raw text-to-speech message." },
        { name: "language", type: "string", required: false, detail: "IETF language tag, e.g. \"en-IN\", \"hi-IN\". Defaults to en-IN." },
        { name: "capture_dtmf", type: "boolean", required: false, detail: "Set true for press-1 style campaigns to capture a keypress response." },
      ]}
      request={{
        curl: `curl https://api.msgbridge.in/v1/voice/call \\\n  -H "Authorization: Bearer $API_KEY" \\\n  -d to="+91XXXXXXXXXX" \\\n  -d script_id="payment_reminder" \\\n  -d language="en-IN" \\\n  -d capture_dtmf="true"`,
        node: `await client.voice.call({\n  to: "+91XXXXXXXXXX",\n  scriptId: "payment_reminder",\n  language: "en-IN",\n  captureDtmf: true,\n});`,
        python: `client.voice.call(\n    to="+91XXXXXXXXXX",\n    script_id="payment_reminder",\n    language="en-IN",\n    capture_dtmf=True,\n)`,
      }}
      response={`{\n  "call_id": "call_3Bq1",\n  "status": "in_progress",\n  "channel": "voice"\n}`}
    />
  );
}
