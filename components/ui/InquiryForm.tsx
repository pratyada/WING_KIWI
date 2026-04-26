"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import { departureCities } from "@/lib/packages";

interface FormData {
  name: string;
  email: string;
  phone: string;
  departureCity: string;
  travelMonth: string;
  packageInterest: string;
  travelers: number;
  message: string;
}

const packageOptions = [
  "Budget Wings",
  "Explorer Wings",
  "Luxury Wings",
  "Not Sure Yet",
];

function getNext12Months(): string[] {
  const months: string[] = [];
  const now = new Date();
  for (let i = 0; i < 12; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    months.push(
      d.toLocaleDateString("en-IN", { month: "long", year: "numeric" })
    );
  }
  return months;
}

const inputClasses = cn(
  "w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3",
  "text-sm text-white placeholder-white/30",
  "outline-none transition-all duration-200",
  "focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20"
);

const labelClasses = "mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/50";

export default function InquiryForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    departureCity: "",
    travelMonth: "",
    packageInterest: "",
    travelers: 2,
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const travelMonths = getNext12Months();

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "travelers" ? Number(value) : value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Inquiry form submitted:", formData);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20">
          <Check className="h-8 w-8 text-emerald-400" />
        </div>
        <h3 className="font-display text-2xl text-white">
          Thank you, we&apos;ll be in touch within 24 hours
        </h3>
        <p className="text-sm text-white/50">
          We respond within 24 hours &middot; No spam, ever
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Row: Name + Email */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClasses}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your full name"
            value={formData.name}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClasses}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>
      </div>

      {/* Row: Phone + Departure City */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={labelClasses}>
            Phone
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-white/40">
              +91
            </span>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              placeholder="98765 43210"
              value={formData.phone}
              onChange={handleChange}
              className={cn(inputClasses, "pl-12")}
            />
          </div>
        </div>
        <div>
          <label htmlFor="departureCity" className={labelClasses}>
            Departure City
          </label>
          <select
            id="departureCity"
            name="departureCity"
            required
            value={formData.departureCity}
            onChange={handleChange}
            className={inputClasses}
          >
            <option value="" disabled>
              Select city
            </option>
            {departureCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Row: Travel Month + Package Interest */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="travelMonth" className={labelClasses}>
            Preferred Travel Month
          </label>
          <select
            id="travelMonth"
            name="travelMonth"
            required
            value={formData.travelMonth}
            onChange={handleChange}
            className={inputClasses}
          >
            <option value="" disabled>
              Select month
            </option>
            {travelMonths.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="packageInterest" className={labelClasses}>
            Package Interest
          </label>
          <select
            id="packageInterest"
            name="packageInterest"
            required
            value={formData.packageInterest}
            onChange={handleChange}
            className={inputClasses}
          >
            <option value="" disabled>
              Select package
            </option>
            {packageOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Number of Travelers */}
      <div>
        <label htmlFor="travelers" className={labelClasses}>
          Number of Travelers
        </label>
        <input
          id="travelers"
          name="travelers"
          type="number"
          min={1}
          max={20}
          required
          value={formData.travelers}
          onChange={handleChange}
          className={cn(inputClasses, "w-32")}
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className={labelClasses}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Tell us about your dream New Zealand trip..."
          value={formData.message}
          onChange={handleChange}
          className={cn(inputClasses, "resize-none")}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className={cn(
          "mt-2 w-full rounded-full bg-amber-500 px-6 py-3.5",
          "text-sm font-semibold text-black",
          "transition-all duration-200 hover:bg-amber-400",
          "active:scale-[0.98]"
        )}
      >
        Send Inquiry
      </button>

      {/* Trust line */}
      <p className="text-center text-xs text-white/30">
        We respond within 24 hours &middot; No spam, ever
      </p>
    </form>
  );
}
