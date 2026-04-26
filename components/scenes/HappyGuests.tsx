"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { testimonials } from "@/lib/packages";

/** Map package names to accent colors for the avatar gradient */
const accentMap: Record<string, string[]> = {
  "Budget Wings": ["#4A7C59", "#6BA37A"],
  "Explorer Wings": ["#6BB5D0", "#A8D8EA"],
  "Luxury Wings": ["#E8913A", "#F5B76B"],
};

export default function HappyGuests() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Duplicate for seamless loop
  const doubled = [...testimonials, ...testimonials];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
    >
      {/* NZ lake background */}
      <img
        src="https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=1920&q=80"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-navy/90" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 mb-12">
        <h2
          ref={headingRef}
          className="font-display text-4xl md:text-5xl lg:text-6xl text-center text-offwhite"
        >
          What Our Guests Say
        </h2>
      </div>

      {/* Marquee container */}
      <div className="group relative z-10">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-navy to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-navy to-transparent" />

        <div className="flex gap-6 animate-marquee group-hover:[animation-play-state:paused]">
          {doubled.map((t, i) => {
            const colors = accentMap[t.packageTaken] ?? ["#E8913A", "#F5B76B"];
            return (
              <div
                key={`${t.id}-${i}`}
                className="min-w-[320px] max-w-[380px] shrink-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col gap-4"
              >
                {/* Quote */}
                <p className="italic text-offwhite/80 leading-relaxed text-sm flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author row */}
                <div className="flex items-center gap-3">
                  {/* Avatar placeholder */}
                  <div
                    className="w-12 h-12 rounded-full shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
                    }}
                  />
                  <div className="flex flex-col">
                    <span className="font-bold text-offwhite text-sm">
                      {t.name}
                    </span>
                    <span className="text-offwhite/50 text-xs">{t.city}</span>
                  </div>
                </div>

                {/* Package badge */}
                <span
                  className="self-start text-xs font-medium px-3 py-1 rounded-full border"
                  style={{
                    borderColor: colors[0],
                    color: colors[0],
                  }}
                >
                  {t.packageTaken}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Marquee keyframes injected via style tag */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </section>
  );
}
