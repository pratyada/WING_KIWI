"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/cn";

const STATS = [
  { number: "14", label: "Days" },
  { number: "8", label: "Cities" },
  { number: "\u221E", label: "Memories" },
];

function SkylineSVG({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1200 300"
      fill="var(--color-navy-dark)"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMax meet"
    >
      {/* Auckland skyline with Sky Tower */}
      <rect x="0" y="200" width="1200" height="100" />
      <rect x="80" y="160" width="50" height="140" />
      <rect x="150" y="140" width="40" height="160" />
      <rect x="210" y="170" width="60" height="130" />
      <rect x="300" y="120" width="45" height="180" />
      <rect x="370" y="150" width="55" height="150" />
      {/* Sky Tower */}
      <rect x="498" y="20" width="4" height="280" />
      <rect x="490" y="60" width="20" height="8" rx="2" />
      <rect x="485" y="100" width="30" height="14" rx="4" />
      <polygon points="500,0 496,20 504,20" />
      <ellipse cx="500" cy="115" rx="18" ry="10" />
      {/* More buildings */}
      <rect x="560" y="130" width="50" height="170" />
      <rect x="640" y="155" width="60" height="145" />
      <rect x="720" y="170" width="40" height="130" />
      <rect x="790" y="140" width="55" height="160" />
      <rect x="870" y="165" width="45" height="135" />
      <rect x="940" y="150" width="50" height="150" />
      <rect x="1020" y="175" width="60" height="125" />
      <rect x="1100" y="160" width="50" height="140" />
    </svg>
  );
}

export default function Auckland() {
  const sectionRef = useRef<HTMLElement>(null);
  const skyLayerRef = useRef<HTMLDivElement>(null);
  const skylineLayerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const kiaOraRef = useRef<HTMLHeadingElement>(null);
  const statsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax layers — different scroll speeds
      gsap.to(skyLayerRef.current, {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(skylineLayerRef.current, {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // "Kia Ora" fade in
      gsap.from(kiaOraRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: kiaOraRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Stat counters animate in
      const statEls =
        statsContainerRef.current?.querySelectorAll(".auckland-stat");
      if (statEls?.length) {
        gsap.from(statEls, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsContainerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="auckland"
      ref={sectionRef}
      className={cn("scene-section relative min-h-screen overflow-hidden")}
    >
      {/* Back layer: sky gradient */}
      <div
        ref={skyLayerRef}
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, var(--color-glacial) 0%, #d4ecf4 40%, var(--color-offwhite) 100%)",
        }}
      />

      {/* Mid layer: city skyline silhouette */}
      <div
        ref={skylineLayerRef}
        className="absolute inset-x-0 bottom-0 z-[1]"
      >
        <SkylineSVG className="w-full" />
      </div>

      {/* Front layer: content */}
      <div
        ref={contentRef}
        className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-24"
      >
        <h2
          ref={kiaOraRef}
          className="font-display text-6xl leading-tight font-bold italic text-navy md:text-8xl lg:text-9xl"
        >
          Kia Ora
        </h2>

        <div
          ref={statsContainerRef}
          className="mt-16 grid w-full max-w-3xl grid-cols-1 gap-8 md:grid-cols-3"
        >
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="auckland-stat flex flex-col items-center opacity-0"
            >
              <span className="font-display text-6xl font-bold text-navy md:text-7xl">
                {stat.number}
              </span>
              <span className="font-body mt-2 text-lg tracking-wide text-navy/70 md:text-xl">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <p className="font-display mt-10 text-2xl italic text-navy/60 md:text-3xl">
          A Lifetime of Memories
        </p>
      </div>
    </section>
  );
}
