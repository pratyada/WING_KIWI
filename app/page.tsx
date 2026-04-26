"use client";

import { Navbar } from "@/components/ui/Navbar";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import Hero from "@/components/scenes/Hero";
import Boarding from "@/components/scenes/Boarding";
import Flight from "@/components/scenes/Flight";
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
        <Boarding />
        <Flight />
        <Auckland />
        <Rotorua />
        <Queenstown />
        <MilfordSound />
        <Hobbiton />
        <Packages />
        <WhyWingKiwi />
        <HappyGuests />
        <InquiryCTA />
      </main>
      <Footer />
    </>
  );
}
