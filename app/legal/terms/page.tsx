import type { Metadata } from "next";
import ProseTemplate from "@/components/templates/ProseTemplate";

export const metadata: Metadata = { title: "Terms of Service", alternates: { canonical: "/legal/terms" } };

export default function TermsPage() {
  return (
    <ProseTemplate eyebrow="Legal" title="Terms of Service" crumb="Terms of Service">
      <p>These terms govern your use of the MsgBridge platform and website. By creating an account or sending traffic through MsgBridge, you agree to them.</p>
      <h2>1. The service</h2>
      <p>MsgBridge provides access to SMS, WhatsApp, RCS, Voice and AI messaging delivered through our operator and platform partners, under a single contract and API.</p>
      <h2>2. Your responsibilities</h2>
      <p>You are responsible for the content you send, holding valid consent for promotional messages, and keeping your DLT entity, headers and templates registered and accurate.</p>
      <h2>3. Acceptable use</h2>
      <p>Use of the platform is subject to our <a href="/legal/aup">Acceptable Use Policy</a>. We may suspend traffic that violates TRAI regulations or risks our operator relationships.</p>
      <h2>4. Billing</h2>
      <p>Charges are billed per the rates agreed in your contract or order form in effect at the time of sending.</p>
      <h2>5. Liability</h2>
      <p>MsgBridge delivers messaging through licensed operator and platform partners and is not liable for delivery failures caused by third-party network, device or regulatory conditions outside our control.</p>
      <h2>6. Changes</h2>
      <p>We may update these terms from time to time. Material changes will be communicated to your account contact.</p>
      <p className="text-text-muted text-[14px]">Last reviewed: {new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })}.</p>
    </ProseTemplate>
  );
}
