"use client";

import { useRef, useState, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { packages, type Package } from "@/lib/packages";
import PackageCard from "@/components/ui/PackageCard";
import PackageModal from "@/components/ui/PackageModal";

export default function Packages() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animate in
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

      // Cards stagger in from below
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
      id="packages"
      className="relative py-24 px-6 md:px-12 lg:px-20"
      style={{
        background: "linear-gradient(180deg, #0B1D3A 0%, #122A52 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2
          ref={headingRef}
          className="font-display text-4xl md:text-5xl lg:text-6xl text-center text-offwhite mb-6"
        >
          Choose Your Wings
        </h2>
        <p className="text-center text-offwhite/70 text-lg md:text-xl max-w-2xl mx-auto mb-16">
          Three ways to fly. One unforgettable country.
        </p>

        {/* Package cards */}
        <div
          ref={cardsRef}
          className="flex flex-col md:flex-row gap-8 justify-center items-stretch"
        >
          {packages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              package={pkg}
              onSelect={() => setSelectedPackage(pkg)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <PackageModal
        package={selectedPackage}
        isOpen={selectedPackage !== null}
        onClose={() => setSelectedPackage(null)}
      />
    </section>
  );
}
