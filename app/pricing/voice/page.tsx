import type { Metadata } from "next";
import RateCardPage from "@/components/pricing/RateCardPage";

export const metadata: Metadata = { title: "Voice Pricing", alternates: { canonical: "/pricing/voice" } };

export default function VoicePricingPage() {
  return (
    <RateCardPage
      title="Voice"
      intro="Billed per second of connected call time, rounded up to the nearest pulse."
      rows={[
        { label: "Voice OTP", unit: "per second", rate: "₹0.09" },
        { label: "Text-to-speech", unit: "per second", rate: "₹0.09" },
        { label: "Press-1 campaigns", unit: "per second", rate: "₹0.10" },
        { label: "Voice broadcast", unit: "per second", rate: "₹0.08" },
      ]}
      note="Billing unit (per-second vs. per-pulse) is confirmed on your contract — this page shows the per-second equivalent for comparison."
    />
  );
}
