import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/ui/LenisProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wingkiwi.com"),
  title: {
    default: "WingKiwi — All-Inclusive New Zealand Journeys for Indian Travelers",
    template: "%s | WingKiwi",
  },
  description:
    "WingKiwi is India's premier travel brand for New Zealand. All-inclusive 10-day packages from ₹3,50,000 — flights, luxury stays, Hindi-speaking guides, curated experiences, visa & insurance. Zero hassle, pure adventure.",
  keywords: [
    "WingKiwi",
    "New Zealand travel from India",
    "India to New Zealand tour packages",
    "NZ tour packages for Indians",
    "all-inclusive New Zealand trip",
    "New Zealand holiday packages",
    "Queenstown travel package",
    "Milford Sound tour",
    "Hobbiton tour from India",
    "Rotorua geothermal tour",
    "Auckland travel package",
    "New Zealand honeymoon package",
    "luxury New Zealand trip",
    "budget New Zealand tour",
    "Hindi speaking guide New Zealand",
    "vegetarian travel New Zealand",
    "Indian travelers New Zealand",
    "NZ visa assistance India",
    "10 day New Zealand itinerary",
    "New Zealand adventure tour",
    "Aotearoa travel",
    "WingKiwi packages",
    "fly India to Auckland",
    "New Zealand family tour",
    "premium NZ travel India",
  ],
  authors: [{ name: "WingKiwi", url: "https://wingkiwi.com" }],
  creator: "WingKiwi",
  publisher: "WingKiwi",
  category: "Travel",
  openGraph: {
    title: "WingKiwi — Your Travel & Experience Partner in New Zealand",
    description:
      "All-inclusive New Zealand journeys designed for Indian travelers. 10-day curated packages from ₹3,50,000. Flights, luxury stays, Hindi guides, vegetarian dining — everything included.",
    type: "website",
    locale: "en_IN",
    url: "https://wingkiwi.com",
    siteName: "WingKiwi",
  },
  twitter: {
    card: "summary_large_image",
    title: "WingKiwi — All-Inclusive New Zealand Journeys",
    description:
      "India's premier travel brand for New Zealand. 10-day all-inclusive packages from ₹3,50,000. Flights, stays, guides — zero hassle.",
    creator: "@wingkiwi",
    site: "@wingkiwi",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://wingkiwi.com",
  },
  other: {
    "geo.region": "IN",
    "geo.placename": "India",
    "theme-color": "#0B1D3A",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              name: "WingKiwi",
              url: "https://wingkiwi.com",
              description:
                "India's premier all-inclusive travel brand for New Zealand journeys.",
              areaServed: [
                { "@type": "Country", name: "India" },
                { "@type": "Country", name: "New Zealand" },
              ],
              priceRange: "₹3,50,000 - ₹6,29,000",
              address: {
                "@type": "PostalAddress",
                addressCountry: "IN",
              },
              sameAs: [
                "https://instagram.com/wingkiwi",
                "https://facebook.com/wingkiwi",
                "https://youtube.com/@wingkiwi",
              ],
              offers: {
                "@type": "AggregateOffer",
                lowPrice: "350000",
                highPrice: "629000",
                priceCurrency: "INR",
                offerCount: 3,
              },
            }),
          }}
        />
        {/* Structured Data - Product (Travel Package) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: "WingKiwi New Zealand Travel Packages",
              description:
                "All-inclusive 10-day New Zealand travel packages for Indian travelers. Includes flights, accommodation, guided tours, meals, visa assistance and travel insurance.",
              brand: { "@type": "Brand", name: "WingKiwi" },
              offers: [
                {
                  "@type": "Offer",
                  name: "Budget Wings — Experience Kiwi",
                  price: "350000",
                  priceCurrency: "INR",
                  availability: "https://schema.org/InStock",
                },
                {
                  "@type": "Offer",
                  name: "Explorer Wings — Learn & Explore",
                  price: "450000",
                  priceCurrency: "INR",
                  availability: "https://schema.org/InStock",
                },
                {
                  "@type": "Offer",
                  name: "Luxury Wings — Premium Experience",
                  price: "629000",
                  priceCurrency: "INR",
                  availability: "https://schema.org/InStock",
                },
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-navy text-offwhite font-body antialiased">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
