"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/cn";

function PlaneSVG({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="80"
      height="32"
      viewBox="0 0 80 32"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M78 16L64 8V13H28L8 4L4 8L20 16L4 24L8 28L28 19H64V24L78 16Z" />
    </svg>
  );
}

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
  const planeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const citiesRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: pinnedRef.current,
          scrub: 1,
        },
      });

      // Plane rises from bottom-left to center along a curved path
      tl.fromTo(
        planeRef.current,
        { x: "-40vw", y: "40vh", opacity: 0, rotation: -20 },
        {
          x: "0vw",
          y: "0vh",
          opacity: 1,
          rotation: 0,
          duration: 0.5,
          ease: "power2.inOut",
        }
      );

      // Text fades in
      tl.from(
        headingRef.current,
        { y: 30, opacity: 0, duration: 0.25 },
        0.3
      );

      tl.from(
        citiesRef.current,
        { y: 20, opacity: 0, duration: 0.25 },
        0.45
      );
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
          "flex h-screen w-full flex-col items-center justify-center overflow-hidden"
        )}
      >
        {/* Dawn-at-airport gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, var(--color-navy-dark) 0%, var(--color-navy) 60%, var(--color-navy-light) 85%, rgba(232,145,58,0.15) 100%)",
          }}
        />

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Plane */}
          <div ref={planeRef} className="mb-12">
            <PlaneSVG className="drop-shadow-lg" />
          </div>

          <h2
            ref={headingRef}
            className="font-display text-4xl leading-tight font-bold text-offwhite md:text-6xl lg:text-7xl"
          >
            Your journey begins
          </h2>

          <p
            ref={citiesRef}
            className="font-body mt-6 max-w-2xl text-lg tracking-wide text-amber-light md:text-xl"
          >
            {CITIES.join(" \u00B7 ")}
          </p>
        </div>
      </div>
    </section>
  );
}
