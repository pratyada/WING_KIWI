"use client";

import { Navbar } from "@/components/ui/Navbar";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import Hero from "@/components/scenes/Hero";
import JourneyGlobe from "@/components/scenes/JourneyGlobe";
import Auckland from "@/components/scenes/Auckland";
import Rotorua from "@/components/scenes/Rotorua";
import Queenstown from "@/components/scenes/Queenstown";
import MilfordSound from "@/components/scenes/MilfordSound";
import Hobbiton from "@/components/scenes/Hobbiton";
import Packages from "@/components/scenes/Packages";
import WhyWingKiwi from "@/components/scenes/WhyWingKiwi";
import HappyGuests from "@/components/scenes/HappyGuests";
import InquiryCTA from "@/components/scenes/InquiryCTA";
import Footer from "@/components/scenes/Footer";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Navbar />
      <main>
        <Hero />
        <JourneyGlobe />
        <Auckland />
        <Rotorua />
        <Hobbiton />
        <Queenstown />
        <MilfordSound />
        <Packages />
        <WhyWingKiwi />
        <HappyGuests />
        <InquiryCTA />
      </main>
      <Footer />
    </>
  );
}
