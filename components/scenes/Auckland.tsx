"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/cn";

const STATS = [
  { number: "14", label: "Days" },
  { number: "8", label: "Cities" },
  { number: "\u221E", label: "Memories" },
];

export default function Auckland() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const kiaOraRef = useRef<HTMLHeadingElement>(null);
  const statsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on background
      gsap.to(bgRef.current, {
        y: -60,
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
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: kiaOraRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Stat counters animate in
      const statEls = statsContainerRef.current?.querySelectorAll(".auckland-stat");
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
      {/* Auckland skyline photo */}
      <img
        ref={bgRef}
        src="https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=1920&q=80"
        alt="Auckland skyline"
        className="absolute inset-0 h-[120%] w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/30 to-navy/70" />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-24"
      >
        <p className="font-body text-sm uppercase tracking-[0.3em] text-offwhite/50 mb-4">
          Welcome to Aotearoa
        </p>

        <h2
          ref={kiaOraRef}
          className="font-display text-7xl leading-tight font-bold italic text-offwhite md:text-8xl lg:text-[10rem] drop-shadow-2xl"
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
              <span className="font-display text-6xl font-bold text-offwhite md:text-7xl drop-shadow-lg">
                {stat.number}
              </span>
              <span className="font-body mt-2 text-lg tracking-wide text-offwhite/70 md:text-xl">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <p className="font-display mt-10 text-2xl italic text-offwhite/60 md:text-3xl">
          A Lifetime of Memories
        </p>
      </div>
    </section>
  );
}
