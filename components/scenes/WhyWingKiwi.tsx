"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const pillars = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-10 h-10"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: "Curated by Locals",
    description:
      "Our team lives in New Zealand and crafts every itinerary in person.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-10 h-10"
      >
        <path d="M7 11v4a5 5 0 0 0 10 0v-4" />
        <path d="M12 3v4" />
        <path d="M8 7c0-1 .6-4 4-4s4 3 4 4" />
        <path d="M4.5 11a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
        <path d="M19.5 11a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
      </svg>
    ),
    title: "Made for Indian Travelers",
    description:
      "Hindi-speaking guides, Indian meal options, vegetarian-first dining, prayer time considerations.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-10 h-10"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: "All-Inclusive, Zero Hassle",
    description:
      "Flights, stays, transfers, experiences, visa, insurance \u2014 all in one price.",
  },
];

export default function WhyWingKiwi() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.from(cards, {
          y: 80,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
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
      ref={sectionRef}
      id="why-us"
      className="relative py-24 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* NZ fern forest background */}
      <img
        src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1920&q=80"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-navy/90" />
      <div className="relative z-10 max-w-7xl mx-auto">
        <h2
          ref={headingRef}
          className="font-display text-4xl md:text-5xl lg:text-6xl text-center text-offwhite mb-16"
        >
          Why WingKiwi
        </h2>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8 flex flex-col items-start gap-4"
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-xl bg-amber/10 flex items-center justify-center text-amber">
                {pillar.icon}
              </div>

              {/* Title */}
              <h3 className="font-display text-xl md:text-2xl text-offwhite">
                {pillar.title}
              </h3>

              {/* Description */}
              <p className="text-offwhite/70 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
