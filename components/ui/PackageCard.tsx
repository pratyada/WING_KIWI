"use client";

import { cn } from "@/lib/cn";
import type { Package } from "@/lib/packages";

interface PackageCardProps {
  package: Package;
  onSelect: (pkg: Package) => void;
}

export default function PackageCard({ package: pkg, onSelect }: PackageCardProps) {
  return (
    <div
      className={cn(
        "package-card group relative overflow-hidden rounded-2xl",
        "border border-white/10 bg-white/5 backdrop-blur-md",
        "transition-all duration-300 hover:border-white/20 hover:bg-white/10"
      )}
    >
      {/* Hero image placeholder */}
      <div
        className="relative aspect-video w-full overflow-hidden rounded-t-2xl"
        style={{
          background: `linear-gradient(135deg, ${pkg.accentColor}44, ${pkg.accentColor}BB)`,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-medium uppercase tracking-widest text-white/60">
            {pkg.subtitle}
          </span>
        </div>

        {/* Duration badge */}
        <div className="absolute right-3 top-3">
          <span className="rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {pkg.duration}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-6">
        <h3 className="font-display text-2xl text-white">{pkg.name}</h3>

        <p className="text-sm leading-relaxed text-white/60">{pkg.tagline}</p>

        {/* Price */}
        <div className="mt-1">
          <span className="text-xs uppercase tracking-wider text-white/40">Starting from</span>
          <p className="text-3xl font-bold text-white">{pkg.price}</p>
          <span className="text-xs text-white/40">per person</span>
        </div>

        {/* Best for */}
        <p className="text-xs text-white/40">
          <span className="font-medium text-white/50">Best for:</span> {pkg.bestFor}
        </p>

        {/* CTA */}
        <button
          onClick={() => onSelect(pkg)}
          className={cn(
            "mt-2 w-full rounded-full bg-amber-500 px-6 py-3",
            "text-sm font-semibold text-black",
            "transition-all duration-200 hover:scale-[1.03] hover:bg-amber-400",
            "active:scale-[0.98]"
          )}
        >
          View Itinerary
        </button>
      </div>
    </div>
  );
}
