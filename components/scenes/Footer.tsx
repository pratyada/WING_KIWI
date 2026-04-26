"use client";

const quickLinks = [
  { label: "Journey", href: "#journey" },
  { label: "Packages", href: "#packages" },
  { label: "Why Us", href: "#why-us" },
  { label: "Contact", href: "#contact" },
  { label: "Privacy", href: "/privacy" },
];

const socials = [
  {
    label: "Instagram",
    href: "https://instagram.com/wingkiwi",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com/wingkiwi",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@wingkiwi",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/919800000000",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-navy-dark border-t border-white/10 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
        {/* Logo & Tagline */}
        <div className="flex flex-col gap-3">
          <span className="font-display text-2xl text-offwhite">
            WingKiwi
          </span>
          <p className="text-offwhite/60 text-sm leading-relaxed">
            Take Flight to the Land of the Long White Cloud
          </p>

          {/* Social icons */}
          <div className="flex gap-3 mt-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-offwhite/60 hover:text-amber hover:border-amber/40 transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-3 md:items-center">
          <span className="text-offwhite/40 text-xs uppercase tracking-widest font-medium mb-1">
            Quick Links
          </span>
          {quickLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-offwhite/60 hover:text-offwhite transition-colors text-sm"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-3 md:items-end">
          <span className="text-offwhite/40 text-xs uppercase tracking-widest font-medium mb-1">
            Contact
          </span>
          <a
            href="mailto:hello@wingkiwi.com"
            className="text-offwhite/60 hover:text-offwhite transition-colors text-sm"
          >
            hello@wingkiwi.com
          </a>
          <a
            href="tel:+919800000000"
            className="text-offwhite/60 hover:text-offwhite transition-colors text-sm"
          >
            +91 98XXX XXXXX
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-white/5 text-center">
        <p className="text-offwhite/40 text-xs">
          &copy; 2026 WingKiwi. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
