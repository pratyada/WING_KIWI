"use client";

import { ReactNode, useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/cn";

interface ScrollSceneProps {
  children: ReactNode;
  className?: string;
  pin?: boolean;
  scrub?: number;
  start?: string;
  end?: string;
}

export function ScrollScene({
  children,
  className,
  pin = true,
  scrub = 1,
  start = "top top",
  end = "+=100%",
}: ScrollSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      pin,
      scrub,
      start,
      end,
    });

    return () => {
      trigger.kill();
    };
  }, [pin, scrub, start, end]);

  return (
    <div ref={containerRef} className={cn("relative", className)} data-scene>
      {children}
    </div>
  );
}
