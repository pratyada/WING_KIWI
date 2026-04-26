"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/cn";

interface StatCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
  duration?: number;
  className?: string;
}

export function StatCounter({
  end,
  suffix = "",
  prefix = "",
  label,
  duration = 2,
  className,
}: StatCounterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        const obj = { value: 0 };
        gsap.to(obj, {
          value: end,
          duration,
          ease: "power2.out",
          onUpdate: () => {
            setDisplay(Math.round(obj.value));
          },
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [end, duration]);

  return (
    <div ref={containerRef} className={cn("text-center", className)}>
      <span
        ref={numberRef}
        className="block font-display text-5xl font-bold md:text-7xl"
      >
        {prefix}
        {display.toLocaleString()}
        {suffix}
      </span>
      <span className="mt-2 block text-sm uppercase tracking-widest text-white/60">
        {label}
      </span>
    </div>
  );
}
