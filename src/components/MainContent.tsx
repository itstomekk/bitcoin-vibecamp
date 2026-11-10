/**
 * MainContent — orchestrates the full page layout.
 * All sections are visible to every visitor; the email capture in Hero
 * is optional and does not gate any content.
 */
import Hero from "@/components/Hero";
import ScrollingHeader from "@/components/ScrollingHeader";
import StatsBar from "@/components/StatsBar";
import WhatIsIt from "@/components/WhatIsIt";
import Schedule from "@/components/Schedule";
import WhyProspera from "@/components/WhyProspera";
import TicketsBanner from "@/components/TicketsBanner";
import FAQ from "@/components/FAQ";
import Friends from "@/components/Friends";
import Footer from "@/components/Footer";

const MainContent = () => (
  <div>
    <main>
      <Hero />
      <ScrollingHeader text="   IDEA:SHIP ⛵   " bgColor="bg-white" textColor="text-[#041c2e]" />
      <WhatIsIt />
      <StatsBar />
      <ScrollingHeader text="   PROMPT   " direction="right" />
      <Schedule />
      <ScrollingHeader text="   PLAN   " />
      <TicketsBanner />
      <WhyProspera />
      <ScrollingHeader text="   FRIENDS   " direction="right" />
      <Friends />
      <ScrollingHeader text="   VIBE → ITERATE → SHIP ⛵   " direction="right" />
      <FAQ />
    </main>
    <Footer />
  </div>
);

export default MainContent;
