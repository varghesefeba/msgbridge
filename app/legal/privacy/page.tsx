import type { Metadata } from "next";
import ProseTemplate from "@/components/templates/ProseTemplate";

export const metadata: Metadata = { title: "Privacy Policy", alternates: { canonical: "/legal/privacy" } };

export default function PrivacyPage() {
  return (
    <ProseTemplate eyebrow="Legal" title="Privacy Policy" crumb="Privacy Policy">
      <h2>What we collect</h2>
      <p>Account and billing details you give us directly, message metadata needed to route and deliver traffic (sender, recipient, timestamp, status), and website analytics such as pages visited and referrer.</p>
      <h2>What we don&rsquo;t do</h2>
      <p>We don&rsquo;t sell your data or your customers&rsquo; data. Message content is used only to deliver the message and to support you if you raise a delivery issue.</p>
      <h2>How we use it</h2>
      <p>To provide the service, bill accurately, meet DLT/TRAI record-keeping obligations, and improve the platform. Consent and opt-in records are retained as required for promotional messaging.</p>
      <h2>Your rights</h2>
      <p>You can request a copy of the data we hold about your account, or ask us to delete it subject to our regulatory retention obligations, by writing to us via <a href="/contact">Contact &amp; Support</a>.</p>
      <h2>Cookies</h2>
      <p>We use essential cookies for the site to function and, with your consent, analytics cookies to understand how the site is used.</p>
      <p className="text-text-muted text-[14px]">Last reviewed: {new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })}.</p>
    </ProseTemplate>
  );
}
