"use client";

import { cn } from "@/lib/cn";
import type { Package } from "@/lib/packages";

interface PackageCardProps {
  package: Package;
  onSelect: (pkg: Package) => void;
}

const cardImages: Record<string, string> = {
  "budget-wings":
    "https://images.unsplash.com/photo-1469521669194-babb45599def?w=800&q=80",
  "explorer-wings":
    "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800&q=80",
  "luxury-wings":
    "https://images.unsplash.com/photo-1542259009477-d625272157b7?w=800&q=80",
};

export default function PackageCard({
  package: pkg,
  onSelect,
}: PackageCardProps) {
  return (
    <div
      className={cn(
        "package-card group relative flex h-full flex-col overflow-hidden rounded-2xl",
        "border border-white/10 bg-white/5 backdrop-blur-md",
        "transition-all duration-300 hover:border-white/20 hover:bg-white/10"
      )}
    >
      {/* Hero image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-2xl">
        <img
          src={cardImages[pkg.id]}
          alt={pkg.subtitle}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Subtitle overlay */}
        <div className="absolute bottom-4 left-4">
          <span className="text-xs font-medium uppercase tracking-widest text-white/80">
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
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="font-display text-2xl text-white">{pkg.name}</h3>

        <p className="text-sm leading-relaxed text-white/60">{pkg.tagline}</p>

        {/* Price */}
        <div className="mt-auto pt-4">
          <span className="text-xs uppercase tracking-wider text-white/40">
            Starting from
          </span>
          <p className="text-3xl font-bold text-white">{pkg.price}</p>
          <span className="text-xs text-white/40">per person</span>
        </div>

        {/* Best for */}
        <p className="text-xs text-white/40">
          <span className="font-medium text-white/50">Best for:</span>{" "}
          {pkg.bestFor}
        </p>

        {/* CTA */}
        <button
          onClick={() => onSelect(pkg)}
          className={cn(
            "mt-3 w-full rounded-full bg-amber px-6 py-3",
            "text-sm font-semibold text-navy",
            "transition-all duration-200 hover:scale-[1.03] hover:bg-amber-light",
            "active:scale-[0.98]"
          )}
        >
          View Itinerary
        </button>
      </div>
    </div>
  );
}
