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

export default function Boarding() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const citiesRef = useRef<HTMLParagraphElement>(null);
  const [globeProgress, setGlobeProgress] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the scene and track scroll progress for the globe
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: pinnedRef.current,
        scrub: 1,
        onUpdate: (self) => {
          // Map 0-1 scroll progress to 0-0.15 globe progress (just India zoom)
          setGlobeProgress(self.progress * 0.15);
        },
      });

      // Text animations via a separate timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      tl.from(headingRef.current, { y: 40, opacity: 0, duration: 0.3 }, 0.1);
      tl.from(citiesRef.current, { y: 30, opacity: 0, duration: 0.3 }, 0.3);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative"
      style={{ height: "200vh" }}
    >
      <div
        ref={pinnedRef}
        className={cn(
          "relative flex h-screen w-full items-center justify-center overflow-hidden"
        )}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-navy-dark" />

        {/* Globe */}
        <div className="absolute inset-0 z-[1] flex items-center justify-center">
          <div className="h-full w-full max-w-[900px] max-h-[900px]">
            <FlightGlobe progress={globeProgress} className="h-full w-full" />
          </div>
        </div>

        {/* Content overlay */}
        <div className="relative z-10 flex flex-col items-center text-center pointer-events-none">
          <h2
            ref={headingRef}
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
        </div>

        {/* Bottom gradient fade into next scene */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-dark to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}
