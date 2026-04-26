"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/cn";

const HEADLINE_WORDS = [
  "Take",
  "Flight",
  "to",
  "the",
  "Land",
  "of",
  "the",
  "Long",
  "White",
  "Cloud",
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = headlineRef.current?.querySelectorAll(".hero-word");
      if (!words?.length) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(words, {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
      });

      tl.from(
        subtextRef.current,
        {
          y: 20,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.2"
      );

      tl.from(
        indicatorRef.current,
        {
          opacity: 0,
          duration: 0.6,
        },
        "-=0.3"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className={cn(
        "scene-section relative flex h-screen items-center justify-center overflow-hidden"
      )}
    >
      {/* Gradient simulating Indian sunrise — replace with actual background image */}
      {/* <Image src="/hero-bg.jpg" alt="" fill className="object-cover" priority /> */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, var(--color-navy-dark) 0%, var(--color-navy) 30%, var(--color-coral) 75%, var(--color-amber) 100%)",
        }}
      />

      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-navy/30" />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <h1
          ref={headlineRef}
          className="font-display text-5xl leading-tight font-bold tracking-tight text-offwhite md:text-7xl lg:text-8xl"
        >
          {HEADLINE_WORDS.map((word, i) => (
            <span key={i} className="hero-word inline-block opacity-0">
              {word}
              {i < HEADLINE_WORDS.length - 1 ? "\u00A0" : ""}
            </span>
          ))}
        </h1>

        <p
          ref={subtextRef}
          className="font-body mt-8 max-w-2xl text-lg leading-relaxed text-offwhite/80 opacity-0 md:text-xl"
        >
          All-inclusive New Zealand journeys, designed for Indian travelers
        </p>

        <div ref={indicatorRef} className="mt-16 opacity-0">
          <div className="scroll-indicator flex flex-col items-center gap-2 text-offwhite/60">
            <span className="font-body text-xs uppercase tracking-widest">
              Scroll
            </span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
