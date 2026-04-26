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
  title: "WingKiwi — All-Inclusive New Zealand Journeys for Indian Travelers",
  description:
    "Take flight to the Land of the Long White Cloud. Premium all-inclusive New Zealand travel packages designed exclusively for Indian travelers. Flights, stays, experiences — all in one price.",
  keywords: [
    "New Zealand travel",
    "India to New Zealand",
    "NZ tour packages",
    "all-inclusive NZ trip",
    "WingKiwi",
    "Indian travelers New Zealand",
  ],
  openGraph: {
    title: "WingKiwi — Take Flight to New Zealand",
    description:
      "All-inclusive New Zealand journeys designed for Indian travelers. From ₹1,49,000.",
    type: "website",
    locale: "en_IN",
    // TODO: Replace with actual OG image
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WingKiwi — Take Flight to New Zealand",
    description:
      "All-inclusive New Zealand journeys designed for Indian travelers.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-navy text-offwhite font-body antialiased">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
