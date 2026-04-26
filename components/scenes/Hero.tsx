"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/cn";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hide everything first
      gsap.set(
        [brandRef.current, lineRef.current, descRef.current, ctaRef.current, badgesRef.current, indicatorRef.current],
        { opacity: 0, y: 30 }
      );

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 2.4, // after loading screen
      });

      tl.to(brandRef.current, { opacity: 1, y: 0, scale: 1, duration: 1 });
      tl.to(lineRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.4");
      tl.to(descRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.4");
      tl.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3");
      tl.to(badgesRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.2");
      tl.to(indicatorRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.2");

      // Parallax zoom on background
      gsap.to(bgRef.current, {
        scale: 1.15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
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
      {/* NZ Landscape Background */}
      <img
        ref={bgRef}
        src="https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=1920&q=80"
        alt="New Zealand landscape"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/50 to-navy/90" />

      {/* Bottom fade */}
      <div className="absolute -bottom-20 left-0 right-0 h-40 bg-gradient-to-t from-navy to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center px-6 text-center max-w-5xl">
        {/* Brand name — big and bold */}
        <div ref={brandRef}>
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-offwhite drop-shadow-2xl">
            Wing<span className="text-amber">Kiwi</span>
          </h1>
          <div className="mt-3 h-px w-32 mx-auto bg-gradient-to-r from-transparent via-amber to-transparent" />
        </div>

        {/* One-liner */}
        <h2
          ref={lineRef}
          className="font-display mt-6 text-xl md:text-2xl lg:text-3xl text-offwhite/90 italic leading-relaxed drop-shadow-lg"
        >
          Your Travel &amp; Experience Partner in New Zealand
        </h2>

        {/* Description */}
        <p
          ref={descRef}
          className="font-body mt-6 max-w-2xl text-base leading-relaxed text-offwhite/70 md:text-lg"
        >
          From India to Aotearoa — we craft all-inclusive journeys with flights,
          luxury stays, curated experiences, Hindi-speaking guides &amp; zero hassle.
          You dream it, we fly you there.
        </p>

        {/* CTA area */}
        <div ref={ctaRef} className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <a
            href="#packages"
            className="rounded-full bg-amber px-8 py-3.5 text-sm font-semibold text-navy transition-all hover:bg-amber-light hover:scale-105 active:scale-95"
          >
            Explore Packages
          </a>
          <a
            href="#contact"
            className="rounded-full border border-white/30 px-8 py-3.5 text-sm font-semibold text-offwhite transition-all hover:bg-white/10 hover:border-white/50"
          >
            Plan My Trip
          </a>
        </div>

        {/* Trust badges */}
        <div ref={badgesRef} className="mt-8 flex flex-wrap justify-center items-center gap-4 md:gap-6 text-offwhite/40 text-xs tracking-wide">
          <span>Starting ₹3,50,000</span>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-offwhite/30" />
          <span>10 Days All-Inclusive</span>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-offwhite/30" />
          <span>Hindi-Speaking Guides</span>
        </div>

        {/* Scroll indicator */}
        <div ref={indicatorRef} className="mt-12">
          <div className="scroll-indicator flex flex-col items-center gap-2 text-offwhite/50">
            <span className="font-body text-xs uppercase tracking-widest">
              Begin the journey
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
