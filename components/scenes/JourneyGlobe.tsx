"use client";

import { useRef, useEffect, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import dynamic from "next/dynamic";

const FlightGlobe = dynamic(() => import("@/components/ui/FlightGlobe"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-64 w-64 rounded-full bg-white/5 animate-pulse" />
    </div>
  ),
});

const CITIES = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Chennai",
  "Hyderabad",
  "Ahmedabad",
  "Kolkata",
];

const STATS = [
  { value: "12 hours" },
  { value: "12,000 km" },
  { value: "One unforgettable arrival" },
];

export default function JourneyGlobe() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);

  // Text refs — phase 1 (boarding)
  const boardingHeadingRef = useRef<HTMLHeadingElement>(null);
  const citiesRef = useRef<HTMLParagraphElement>(null);

  // Text refs — phase 2 (flight)
  const flightHeadingRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const [globeProgress, setGlobeProgress] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Single pinned scroll covering the entire journey
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: pinnedRef.current,
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress;
          // Hold at India (0-15%), fly (15-85%), hold at NZ (85-100%)
          let globe = 0;
          if (p < 0.15) {
            globe = 0;
          } else if (p > 0.85) {
            globe = 1;
          } else {
            globe = (p - 0.15) / 0.7;
          }
          setGlobeProgress(globe);
        },
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // === PHASE 1: Hold on India (0% - 15%) ===
      // "Your journey begins" + cities visible while holding on India
      tl.from(boardingHeadingRef.current, { y: 40, opacity: 0, duration: 0.04 }, 0.01);
      tl.from(citiesRef.current, { y: 30, opacity: 0, duration: 0.04 }, 0.04);
      // Fade out as flight begins
      tl.to(boardingHeadingRef.current, { opacity: 0, duration: 0.04 }, 0.14);
      tl.to(citiesRef.current, { opacity: 0, duration: 0.04 }, 0.14);

      // === PHASE 2: Flying (15% - 85%) ===
      // "Above the Clouds" fades in mid-flight
      tl.from(flightHeadingRef.current, { y: 30, opacity: 0, duration: 0.05 }, 0.3);
      tl.to(flightHeadingRef.current, { opacity: 0, duration: 0.04 }, 0.5);

      // Stats appear as we approach NZ
      const statEls = statsRef.current?.querySelectorAll(".flight-stat");
      if (statEls?.length) {
        tl.from(statEls[0], { y: 20, opacity: 0, duration: 0.04 }, 0.55);
        tl.from(statEls[1], { y: 20, opacity: 0, duration: 0.04 }, 0.62);
        tl.from(statEls[2], { y: 20, opacity: 0, duration: 0.04 }, 0.69);
      }

      // === PHASE 3: Hold on NZ (85% - 100%) — stats visible, then fade ===
      tl.to(statsRef.current, { opacity: 0, duration: 0.05 }, 0.93);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative"
      style={{ height: "400vh" }}
    >
      <div
        ref={pinnedRef}
        className={cn(
          "relative flex h-screen w-full items-center justify-center overflow-hidden"
        )}
      >
        {/* Background: dark space with stars */}
        <div className="absolute inset-0 bg-navy-dark">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(1px 1px at 10% 20%, white, transparent), " +
                "radial-gradient(1px 1px at 30% 60%, white, transparent), " +
                "radial-gradient(1px 1px at 50% 10%, white, transparent), " +
                "radial-gradient(1px 1px at 70% 80%, white, transparent), " +
                "radial-gradient(1px 1px at 90% 40%, white, transparent), " +
                "radial-gradient(1px 1px at 15% 85%, white, transparent), " +
                "radial-gradient(1px 1px at 45% 45%, white, transparent), " +
                "radial-gradient(1.5px 1.5px at 60% 30%, white, transparent), " +
                "radial-gradient(1px 1px at 80% 15%, white, transparent), " +
                "radial-gradient(1.5px 1.5px at 25% 50%, white, transparent), " +
                "radial-gradient(1px 1px at 95% 70%, white, transparent), " +
                "radial-gradient(1px 1px at 5% 55%, white, transparent)",
            }}
          />
        </div>

        {/* Single Globe */}
        <div className="absolute inset-0 z-[1] flex items-center justify-center">
          <div className="h-[110%] w-[110%] max-w-[1200px] max-h-[1200px]">
            <FlightGlobe progress={globeProgress} className="h-full w-full" />
          </div>
        </div>

        {/* Content overlay — all text layers stacked */}
        <div className="relative z-10 flex flex-col items-center text-center pointer-events-none px-6">
          {/* Phase 1: Boarding text */}
          <h2
            ref={boardingHeadingRef}
            className="font-display text-4xl leading-tight font-bold text-offwhite md:text-6xl lg:text-7xl drop-shadow-2xl"
          >
            Your journey begins
          </h2>

          <p
            ref={citiesRef}
            className="font-body mt-6 max-w-2xl text-lg tracking-wide text-amber-light md:text-xl drop-shadow-lg"
          >
            {CITIES.join(" \u00B7 ")}
          </p>

          {/* Phase 2: Flight text */}
          <h2
            ref={flightHeadingRef}
            className="font-display absolute text-3xl font-bold text-offwhite/90 md:text-5xl lg:text-6xl drop-shadow-2xl opacity-0"
          >
            Above the Clouds
          </h2>

          {/* Stats */}
          <div
            ref={statsRef}
            className="absolute bottom-[-120px] flex flex-col items-center gap-4 md:flex-row md:gap-8"
          >
            {STATS.map((stat, i) => (
              <span
                key={i}
                className="flight-stat font-display text-xl font-bold text-white opacity-0 md:text-3xl drop-shadow-lg"
              >
                {stat.value}
                {i < STATS.length - 1 && (
                  <span className="ml-4 hidden text-white/40 md:inline">
                    &middot;
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-dark to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}
