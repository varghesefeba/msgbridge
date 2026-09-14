import type { Metadata } from "next";
import DevApiTemplate from "@/components/templates/DevApiTemplate";

export const metadata: Metadata = { title: "Webhooks & Delivery Reports", description: "Delivery report payload shape and retry behaviour.", alternates: { canonical: "/developers/webhooks" } };

export default function WebhooksPage() {
  return (
    <DevApiTemplate
      draft
      title="Webhooks & Delivery Reports"
      description="Register a callback URL to receive a delivery report as each message moves through its lifecycle."
      endpoint="POST your callback_url"
      params={[
        { name: "message_id", type: "string", required: true, detail: "The ID returned when the message was sent." },
        { name: "status", type: "\"queued\" | \"sent\" | \"delivered\" | \"failed\"", required: true, detail: "Current delivery state." },
        { name: "channel", type: "string", required: true, detail: "The channel this report is for." },
        { name: "timestamp", type: "string", required: true, detail: "ISO 8601 timestamp of the status change." },
      ]}
      request={{
        curl: `# We POST to the callback_url on your account or per-message.\n# Retries: up to 3 attempts with exponential backoff\n# on a non-2xx response.`,
        node: `# We POST to the callback_url on your account or per-message.\n# Retries: up to 3 attempts with exponential backoff\n# on a non-2xx response.`,
        python: `# We POST to the callback_url on your account or per-message.\n# Retries: up to 3 attempts with exponential backoff\n# on a non-2xx response.`,
      }}
      response={`{\n  "message_id": "msg_9F2k",\n  "status": "delivered",\n  "channel": "sms",\n  "timestamp": "2026-09-05T10:22:31Z"\n}`}
    />
  );
}
