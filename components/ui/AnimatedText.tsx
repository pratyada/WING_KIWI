"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/cn";

interface AnimatedTextProps {
  text: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "p";
  delay?: number;
}

export function AnimatedText({
  text,
  className,
  tag: Tag = "h2",
  delay = 0,
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isHeading = Tag !== "p";

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const words = el.querySelectorAll<HTMLSpanElement>("[data-word]");

    if (prefersReduced) {
      words.forEach((word) => {
        gsap.set(word, { y: 0, opacity: 1 });
      });
      return;
    }

    gsap.set(words, { y: "100%", opacity: 0 });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(words, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.05,
          delay,
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [text, delay]);

  const words = text.split(" ");

  return (
    <div ref={containerRef}>
      <Tag
        className={cn(
          isHeading && "font-display",
          className
        )}
      >
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
            <span data-word className="inline-block">
              {word}
            </span>
          </span>
        ))}
      </Tag>
    </div>
  );
}
