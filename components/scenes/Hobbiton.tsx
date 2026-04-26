"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/cn";

export default function Hobbiton() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: false,
          toggleActions: "play none none reverse",
        },
      });

      tl.from(nameRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
        .from(
          taglineRef.current,
          {
            y: 60,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .from(
          cardRef.current,
          {
            x: 100,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.4"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background gradient — replace with real image */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-950 via-emerald-800 to-amber-500" />

      <div className="relative z-10 flex h-full w-full items-center justify-between px-8 md:px-16 lg:px-24">
        <div className="flex flex-col gap-4">
          <h2
            ref={nameRef}
            className="font-display text-6xl font-bold text-white md:text-8xl lg:text-9xl"
          >
            Hobbiton
          </h2>
          <p
            ref={taglineRef}
            className="text-xl text-white/80 md:text-2xl"
          >
            Stories made real
          </p>
        </div>

        <div
          ref={cardRef}
          className={cn(
            "hidden md:block",
            "max-w-sm rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md"
          )}
        >
          <p className="text-sm font-medium uppercase tracking-widest text-white/60">
            Day 4
          </p>
          <p className="mt-2 text-lg font-semibold text-white">Hobbiton</p>
          <p className="mt-1 text-sm leading-relaxed text-white/70">
            Step into Middle-earth at the movie set
          </p>
        </div>
      </div>
    </section>
  );
}
