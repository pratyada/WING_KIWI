# WingKiwi — Phase 1 Marketing Website

> "Take Flight to the Land of the Long White Cloud"

A cinematic, scroll-driven storytelling website for WingKiwi — a premium all-inclusive travel brand taking Indian travelers on curated journeys to New Zealand.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Tech Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS** for styling
- **GSAP + ScrollTrigger** for scroll-driven animations and pinned scenes
- **Lenis** for smooth scrolling
- **Framer Motion** for component transitions and modals
- **@react-three/fiber + drei** (available for 3D elements)
- **Radix UI** for accessible form primitives

## Project Structure

```
app/
  layout.tsx          — Root layout with Lenis, fonts, metadata
  page.tsx            — Composes all scenes in scroll order
  globals.css         — Brand colors, animations, utilities
  sitemap.ts          — Auto-generated sitemap
  robots.ts           — Robots.txt config

components/
  scenes/             — One file per scroll scene
    Hero.tsx           — Scene 1: Indian sunrise, word-by-word reveal
    Boarding.tsx       — Scene 2: Plane takeoff, departure cities
    Flight.tsx         — Scene 3: Flight path, background transitions
    Auckland.tsx       — Scene 4: Parallax skyline, stat counters
    Rotorua.tsx        — Scene 5: Geothermal destination
    Queenstown.tsx     — Scene 6: Adventure destination
    MilfordSound.tsx   — Scene 7: Fjord destination
    Hobbiton.tsx       — Scene 8: Fantasy destination
    Packages.tsx       — Scene 9: Three package cards + modals
    WhyWingKiwi.tsx    — Scene 10: Three brand pillars
    HappyGuests.tsx    — Scene 11: Testimonial marquee
    InquiryCTA.tsx     — Scene 12: Inquiry form
    Footer.tsx         — Site footer

  ui/                 — Reusable components
    LenisProvider.tsx  — Smooth scroll wrapper
    ScrollScene.tsx    — GSAP ScrollTrigger pinned scene
    AnimatedText.tsx   — Word-by-word text reveal
    StatCounter.tsx    — Animated number counter
    Navbar.tsx         — Fixed navigation with mobile menu
    LoadingScreen.tsx  — Initial loading overlay
    PackageCard.tsx    — Package display card
    PackageModal.tsx   — Fullscreen package detail modal
    InquiryForm.tsx    — Contact inquiry form

lib/
  cn.ts              — Tailwind class merge utility
  gsap.ts            — GSAP + ScrollTrigger registration
  packages.ts        — Package data, testimonials, departure cities

public/
  images/            — Placeholder images (replace with real assets)
```

## Replacing Images

All images use placeholder gradients. To replace with real photos:

1. Add your images to `public/images/` with these names:
   - `hero-bg.jpg` — Indian sunrise/landscape (1920x1080+)
   - `package-budget.jpg`, `package-explorer.jpg`, `package-luxury.jpg`
   - `rotorua.jpg`, `queenstown.jpg`, `milford-sound.jpg`, `hobbiton.jpg`
   - `testimonial-1.jpg` through `testimonial-5.jpg`
   - `og-image.jpg` — Open Graph image (1200x630)

2. Update the component files — each has a comment marking where to swap the gradient for a `next/image` component.

## Editing Package Content

All package data lives in `lib/packages.ts`. Edit itineraries, prices, inclusions, and exclusions in a single file — changes propagate to cards and modals automatically.

## Environment Variables

None required for Phase 1. The inquiry form logs to console — connect to your backend when ready.

## Deploy to Vercel

```bash
npx vercel
```

Or connect your GitHub repo at vercel.com/new.

## Brand Guidelines

- **Colors**: Navy (#0B1D3A), Amber (#E8913A), Coral (#E8655A), Glacial (#A8D8EA), Fern (#4A7C59)
- **Fonts**: Playfair Display (headlines), Inter (body)
- **Voice**: Warm, premium, cinematic, confident, India-aware

## License

Private — WingKiwi. All rights reserved.
