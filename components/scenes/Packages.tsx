"use client";

import { useRef, useState, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { packages, type Package } from "@/lib/packages";
import PackageCard from "@/components/ui/PackageCard";
import PackageModal from "@/components/ui/PackageModal";

export default function Packages() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      const cards = carouselRef.current?.querySelectorAll(".pkg-card-wrap");
      if (cards) {
        gsap.from(cards, {
          y: 80,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: carouselRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (index: number) => {
    setActiveIndex(index);
    const cards = carouselRef.current?.querySelectorAll(".pkg-card-wrap");
    if (cards?.[index]) {
      cards[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="packages"
      className="relative py-24 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* NZ mountain background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=1920&q=80"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/85 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Heading */}
        <h2
          ref={headingRef}
          className="font-display text-4xl md:text-5xl lg:text-6xl text-center text-offwhite mb-4"
        >
          Choose Your Wings
        </h2>
        <p className="text-center text-offwhite/70 text-lg md:text-xl max-w-2xl mx-auto mb-16">
          Three ways to fly. One unforgettable country.
        </p>

        {/* Desktop: equal-width grid */}
        <div
          ref={carouselRef}
          className="hidden md:grid md:grid-cols-3 gap-8"
        >
          {packages.map((pkg) => (
            <div key={pkg.id} className="pkg-card-wrap">
              <PackageCard
                package={pkg}
                onSelect={() => setSelectedPackage(pkg)}
              />
            </div>
          ))}
        </div>

        {/* Mobile: horizontal snap carousel */}
        <div className="md:hidden">
          <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 -mx-6 px-6 scrollbar-hide">
            {packages.map((pkg, i) => (
              <div
                key={pkg.id}
                className="pkg-card-wrap min-w-[85vw] max-w-[85vw] snap-center flex-shrink-0"
              >
                <PackageCard
                  package={pkg}
                  onSelect={() => setSelectedPackage(pkg)}
                />
              </div>
            ))}
          </div>

          {/* Carousel dots */}
          <div className="flex justify-center gap-2 mt-4">
            {packages.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "bg-amber w-8"
                    : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
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
