"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import InquiryForm from "@/components/ui/InquiryForm";

export default function InquiryCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const planeRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading + subtext animate in
      gsap.from(headingRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(subtextRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: subtextRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Plane flies across
      if (planeRef.current) {
        gsap.fromTo(
          planeRef.current,
          { x: "-10vw", y: 0, opacity: 0 },
          {
            x: "95vw",
            y: -20,
            opacity: 1,
            duration: 3,
            ease: "power1.inOut",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none reset",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* NZ starry sky / mountains */}
      <img
        src="https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1920&q=80"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-navy/85" />
      {/* Flying plane SVG */}
      <svg
        ref={planeRef}
        className="absolute top-12 left-0 z-10 w-10 h-10 text-amber opacity-0 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21.5 2.5l-10 10" />
        <path d="M21.5 2.5l-6.5 19-3-8.5-8.5-3 19-6.5z" />
      </svg>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2
          ref={headingRef}
          className="font-display text-4xl md:text-5xl lg:text-6xl text-offwhite mb-4"
        >
          Your Story Starts Here
        </h2>
        <p
          ref={subtextRef}
          className="text-offwhite/70 text-lg md:text-xl mb-12"
        >
          Tell us about your dream New Zealand journey
        </p>

        <InquiryForm />
      </div>
    </section>
  );
}
