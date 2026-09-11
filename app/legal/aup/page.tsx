import type { Metadata } from "next";
import ProseTemplate from "@/components/templates/ProseTemplate";

export const metadata: Metadata = { title: "Acceptable Use Policy", alternates: { canonical: "/legal/aup" } };

export default function AupPage() {
  return (
    <ProseTemplate eyebrow="Legal" title="Acceptable Use Policy" crumb="Acceptable Use">
      <p>To keep delivery reliable for every customer on the platform, traffic sent through MsgBridge may not include:</p>
      <ul>
        <li>Unsolicited promotional messages to numbers without a recorded opt-in.</li>
        <li>Messages to numbers on the NDNC registry on promotional routes.</li>
        <li>Content that doesn&rsquo;t match its registered DLT template, or bypasses template categorisation.</li>
        <li>Phishing, malware links, fraudulent OTP requests, or impersonation of another business or government body.</li>
        <li>Content promoting illegal goods or services under Indian law.</li>
      </ul>
      <h2>Enforcement</h2>
      <p>We may pause traffic pending review if we detect a violation, to protect delivery for the rest of the platform&rsquo;s customers. We&rsquo;ll always tell your account contact what triggered it and how to resolve it.</p>
    </ProseTemplate>
  );
}
