import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Hero from "@/components/home/Hero";
import IntegrationMarquee from "@/components/home/IntegrationMarquee";
import HomeOverview from "@/components/home/HomeOverview";
import VerifyDemo from "@/components/home/VerifyDemo";
import BentoGrid from "@/components/home/BentoGrid";
import ChannelsGrid from "@/components/home/ChannelsGrid";
import ChannelLadder from "@/components/home/ChannelLadder";
import DltHandled from "@/components/home/DltHandled";
import TwoDoors from "@/components/home/TwoDoors";
import SolutionsStrip from "@/components/home/SolutionsStrip";
import CustomerStory from "@/components/home/CustomerStory";
import QuickstartTabs from "@/components/home/QuickstartTabs";
import SupportCommitment from "@/components/home/SupportCommitment";
import HomeFAQ from "@/components/home/HomeFAQ";

export const metadata: Metadata = buildMetadata("/");

export default function HomePage() {
  return (
    <>
      <Hero />
      <IntegrationMarquee />
      <HomeOverview />
      <VerifyDemo />
      <BentoGrid />
      <ChannelsGrid />
      <ChannelLadder />
      <DltHandled />
      <TwoDoors />
      <SolutionsStrip />
      <CustomerStory />
      <QuickstartTabs />
      <HomeFAQ />
      <SupportCommitment />
    </>
  );
}
