import type { Metadata } from "next";
import RateCardPage from "@/components/pricing/RateCardPage";

export const metadata: Metadata = { title: "SMS Pricing", alternates: { canonical: "/pricing/sms" } };

export default function SmsPricingPage() {
  return (
    <RateCardPage
      title="SMS"
      intro="Per-SMS rates by category. A Unicode message (regional-language content) counts as more than one segment — see the note below."
      rows={[
        { label: "Transactional", unit: "per SMS (English, 160 chars/segment)", rate: "₹0.18" },
        { label: "OTP", unit: "per SMS", rate: "₹0.14" },
        { label: "Promotional", unit: "per SMS", rate: "₹0.12" },
        { label: "Unicode (regional language)", unit: "per SMS (70 chars/segment)", rate: "Same rate, more segments" },
      ]}
      note="Unicode content — Hindi, Marathi, Bengali, Tamil, Telugu, Gujarati, Kannada and other regional scripts — is billed per 70-character segment instead of 160, so longer regional-language messages cost more per send. Plan copy length accordingly."
    />
  );
}
