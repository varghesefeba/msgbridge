import type { Metadata } from "next";
import RateCardPage from "@/components/pricing/RateCardPage";
import Callout from "@/components/ui/Callout";

export const metadata: Metadata = { title: "RCS Pricing", alternates: { canonical: "/pricing/rcs" } };

export default function RcsPricingPage() {
  return (
    <div>
      <RateCardPage
        title="RCS"
        intro="Billed per message, by type. Falls back automatically to SMS or WhatsApp where RCS isn't supported."
        rows={[
          { label: "Rich card (single)", unit: "per message", rate: "₹0.28" },
          { label: "Carousel", unit: "per message", rate: "₹0.34" },
          { label: "Fallback to SMS/WhatsApp", unit: "per message", rate: "Billed at that channel's rate" },
        ]}
      />
      <div className="container max-w-container -mt-10 pb-14">
        <Callout variant="warning">RCS availability varies by device, network, operator and RCS support.</Callout>
      </div>
    </div>
  );
}
