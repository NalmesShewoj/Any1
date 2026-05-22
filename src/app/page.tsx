import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { FairComparison } from "@/components/sections/FairComparison";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Leaderboard } from "@/components/sections/Leaderboard";
import { Integration } from "@/components/sections/Integration";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FairComparison />
        <HowItWorks />
        <Leaderboard />
        <Integration />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
