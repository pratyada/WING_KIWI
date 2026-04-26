"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, XIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Package } from "@/lib/packages";

type Tab = "overview" | "itinerary" | "inclusions" | "exclusions";

interface PackageModalProps {
  package: Package | null;
  isOpen: boolean;
  onClose: () => void;
}

const tabs: { key: Tab; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "itinerary", label: "Day-by-Day" },
  { key: "inclusions", label: "Inclusions" },
  { key: "exclusions", label: "Exclusions" },
];

export default function PackageModal({ package: pkg, isOpen, onClose }: PackageModalProps) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  // Reset tab when modal opens with a new package
  useEffect(() => {
    if (isOpen) setActiveTab("overview");
  }, [isOpen, pkg?.id]);

  // ESC key closes modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!pkg) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex flex-col md:flex-row overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className={cn(
                "absolute right-4 top-4 z-10 rounded-full bg-black/40 p-2",
                "text-white/80 backdrop-blur-sm transition-colors hover:bg-black/60 hover:text-white"
              )}
            >
              <X className="h-5 w-5" />
            </button>

            {/* Left: Hero image area */}
            <div
              className={cn(
                "relative h-[30vh] w-full shrink-0",
                "md:h-full md:w-1/2"
              )}
              style={{
                background: `linear-gradient(135deg, ${pkg.accentColor}66, ${pkg.accentColor}CC)`,
              }}
            >
              <div className="flex h-full flex-col items-center justify-center gap-3 p-8">
                <span className="text-sm uppercase tracking-widest text-white/50">
                  {pkg.subtitle}
                </span>
                <h2 className="font-display text-4xl text-white md:text-5xl">{pkg.name}</h2>
                <p className="max-w-sm text-center text-sm text-white/70">{pkg.tagline}</p>
              </div>
            </div>

            {/* Right: Content */}
            <div className="flex flex-1 flex-col bg-[#0a0e1a] md:w-1/2">
              {/* Tabs */}
              <div className="flex shrink-0 border-b border-white/10 px-6 pt-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={cn(
                      "relative px-4 pb-3 text-sm font-medium transition-colors",
                      activeTab === tab.key
                        ? "text-amber-400"
                        : "text-white/50 hover:text-white/80"
                    )}
                  >
                    {tab.label}
                    {activeTab === tab.key && (
                      <motion.div
                        layoutId="modal-tab-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400"
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <div className="flex-1 overflow-y-auto p-6">
                {/* Overview */}
                {activeTab === "overview" && (
                  <div className="flex flex-col gap-6">
                    <div>
                      <h3 className="font-display text-2xl text-white">{pkg.name}</h3>
                      <p className="mt-1 text-sm text-white/60">{pkg.tagline}</p>
                    </div>

                    <div className="flex items-end gap-2">
                      <span className="text-4xl font-bold text-white">{pkg.price}</span>
                      <span className="mb-1 text-sm text-white/40">per person</span>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <div className="flex flex-col gap-3">
                        <div>
                          <span className="text-xs uppercase tracking-wider text-white/40">
                            Duration
                          </span>
                          <p className="text-sm font-medium text-white">{pkg.duration}</p>
                        </div>
                        <div>
                          <span className="text-xs uppercase tracking-wider text-white/40">
                            Best For
                          </span>
                          <p className="text-sm text-white/80">{pkg.bestFor}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Day-by-Day */}
                {activeTab === "itinerary" && (
                  <div className="flex flex-col gap-4">
                    {pkg.itinerary.map((day) => (
                      <div key={day.day} className="flex gap-4">
                        <div
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                          style={{ backgroundColor: pkg.accentColor }}
                        >
                          {day.day}
                        </div>
                        <div className="flex flex-col gap-1 pt-1">
                          <h4 className="text-sm font-semibold text-white">{day.title}</h4>
                          <p className="text-sm text-white/50">{day.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Inclusions */}
                {activeTab === "inclusions" && (
                  <div className="flex flex-col gap-3">
                    {pkg.inclusions.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
                          <Check className="h-3 w-3 text-emerald-400" />
                        </div>
                        <p className="text-sm text-white/80">{item}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Exclusions */}
                {activeTab === "exclusions" && (
                  <div className="flex flex-col gap-3">
                    {pkg.exclusions.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/20">
                          <XIcon className="h-3 w-3 text-red-400" />
                        </div>
                        <p className="text-sm text-white/80">{item}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Sticky CTA */}
              <div className="shrink-0 border-t border-white/10 bg-[#0a0e1a] p-4">
                <button
                  className={cn(
                    "w-full rounded-full bg-amber-500 px-6 py-3.5",
                    "text-sm font-semibold text-black",
                    "transition-all duration-200 hover:bg-amber-400",
                    "active:scale-[0.98]"
                  )}
                >
                  Inquire About This Package
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
