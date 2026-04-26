"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/cn";

export default function Queenstown() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(nameRef.current, { y: 100, opacity: 0, duration: 1, ease: "power3.out" })
        .from(taglineRef.current, { y: 60, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.5")
        .from(cardRef.current, { x: 100, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.4");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden">
      {/* Queenstown lake and mountains */}
      <img
        ref={bgRef}
        src="https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=1920&q=80"
        alt="Queenstown mountains and lake"
        className="absolute inset-0 h-[120%] w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/70 via-navy/30 to-transparent" />

      <div className="relative z-10 flex h-full w-full items-center justify-between px-8 md:px-16 lg:px-24">
        <div className="flex flex-col gap-4">
          <h2
            ref={nameRef}
            className="font-display text-6xl font-bold text-white md:text-8xl lg:text-9xl drop-shadow-2xl"
          >
            Queenstown
          </h2>
          <p ref={taglineRef} className="text-xl text-white/90 md:text-2xl drop-shadow-lg">
            Adventure with altitude
          </p>
        </div>

        <div
          ref={cardRef}
          className={cn(
            "hidden md:block",
            "max-w-sm rounded-2xl border border-white/20 bg-black/30 p-6 backdrop-blur-xl"
          )}
        >
          <p className="text-sm font-medium uppercase tracking-widest text-glacial">Day 6</p>
          <p className="mt-2 text-lg font-semibold text-white">Queenstown</p>
          <p className="mt-1 text-sm leading-relaxed text-white/70">
            Gondola ride, Skyline luge, lakeside evening
          </p>
        </div>
      </div>
    </section>
  );
}
