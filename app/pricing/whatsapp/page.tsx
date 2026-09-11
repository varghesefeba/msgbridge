import type { Metadata } from "next";
import RateCardPage from "@/components/pricing/RateCardPage";

export const metadata: Metadata = { title: "WhatsApp Pricing", alternates: { canonical: "/pricing/whatsapp" } };

export default function WhatsappPricingPage() {
  return (
    <RateCardPage
      title="WhatsApp"
      intro="Billed per conversation, by template category, in a 24-hour window — not per individual message within that window."
      rows={[
        { label: "Utility", unit: "per conversation", rate: "₹0.30" },
        { label: "Authentication", unit: "per conversation", rate: "₹0.35" },
        { label: "Marketing", unit: "per conversation", rate: "₹0.78" },
        { label: "Service (user-initiated)", unit: "per conversation", rate: "₹0.00" },
      ]}
      note="A conversation window opens on the first template send (or the user's message, for service conversations) and covers all messages between you and that user for 24 hours."
    />
  );
}
