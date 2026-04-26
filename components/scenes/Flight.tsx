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

const STATS = [
  { value: "12 hours", delay: 0.15 },
  { value: "12,000 km", delay: 0.35 },
  { value: "One unforgettable arrival", delay: 0.55 },
];

export default function Flight() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

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

      // Phase 1 → 2 → 3 → 4 background color transitions
      tl.to(bgRef.current, {
        background:
          "linear-gradient(180deg, #E8655A 0%, #E8913A 50%, #F5B76B 100%)",
        duration: 0.1,
      });
      tl.to(bgRef.current, {
        background:
          "linear-gradient(180deg, #0B1D3A 0%, #122A52 50%, #1a3a6a 100%)",
        duration: 0.25,
      });
      tl.to(bgRef.current, {
        background:
          "linear-gradient(180deg, #A8D8EA 0%, #d4ecf4 50%, #ffffff 100%)",
        duration: 0.25,
      });
      tl.to(bgRef.current, {
        background:
          "linear-gradient(180deg, #d4ecf4 0%, #A8D8EA 50%, #6BA37A 100%)",
        duration: 0.25,
      });

      // Dotted flight path draws from left to right
      const path = pathRef.current;
      if (path) {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        tl.to(
          path,
          { strokeDashoffset: 0, duration: 0.7, ease: "none" },
          0.05
        );
      }

      // Plane moves from left to right
      tl.fromTo(
        planeRef.current,
        { xPercent: -200, opacity: 1 },
        { xPercent: 200, duration: 0.8, ease: "none" },
        0.05
      );

      // Stats animate in sequence
      const statEls = statsRef.current?.querySelectorAll(".flight-stat");
      if (statEls?.length) {
        statEls.forEach((el, i) => {
          tl.from(
            el,
            { y: 20, opacity: 0, duration: 0.1 },
            STATS[i].delay
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: "300vh" }}
    >
      <div
        ref={pinnedRef}
        className={cn(
          "flex h-screen w-full flex-col items-center justify-center overflow-hidden"
        )}
      >
        {/* Animated background */}
        <div
          ref={bgRef}
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, var(--color-amber) 0%, var(--color-coral) 50%, var(--color-amber-light) 100%)",
          }}
        />

        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6">
          {/* Flight path SVG */}
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 1200 400"
            preserveAspectRatio="xMidYMid meet"
            fill="none"
          >
            <path
              ref={pathRef}
              d="M0 300 C200 300, 300 100, 600 200 S1000 100, 1200 150"
              stroke="white"
              strokeWidth="3"
              strokeDasharray="8 8"
              strokeLinecap="round"
              opacity="0.6"
            />
          </svg>

          {/* Plane */}
          <div ref={planeRef} className="relative z-10 mb-8">
            <PlaneSVG className="drop-shadow-lg" />
          </div>

          {/* Stats */}
          <div
            ref={statsRef}
            className="relative z-10 mt-12 flex flex-col items-center gap-4 md:flex-row md:gap-8"
          >
            {STATS.map((stat, i) => (
              <span
                key={i}
                className="flight-stat font-display text-2xl font-bold text-white opacity-0 md:text-3xl"
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
      </div>
    </section>
  );
}
