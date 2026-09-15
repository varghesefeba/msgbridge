import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import IntegrationMarquee from "@/components/home/IntegrationMarquee";
import VerifyDemo from "@/components/home/VerifyDemo";
import BentoGrid from "@/components/home/BentoGrid";
import ChannelsGrid from "@/components/home/ChannelsGrid";
import ChannelLadder from "@/components/home/ChannelLadder";
import DltHandled from "@/components/home/DltHandled";
import TwoDoors from "@/components/home/TwoDoors";
import SupportCommitment from "@/components/home/SupportCommitment";

export const metadata: Metadata = {
  title: "MsgBridge — SMS, WhatsApp, RCS & Voice API for India",
  description:
    "One compliance-ready platform for SMS, WhatsApp, RCS, Voice and AI messaging in India. DLT and TRAI paperwork handled. Live in days, not quarters.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <IntegrationMarquee />
      <VerifyDemo />
      <BentoGrid />
      <ChannelsGrid />
      <ChannelLadder />
      <DltHandled />
      <TwoDoors />
      <SupportCommitment />
    </>
  );
}
