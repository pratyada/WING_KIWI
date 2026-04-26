export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

export interface Package {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  price: string;
  priceNumeric: number;
  bestFor: string;
  duration: string;
  heroImage: string;
  accentColor: string;
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
}

export const packages: Package[] = [
  {
    id: "budget-wings",
    name: "Budget Wings",
    subtitle: "Experience Kiwi",
    tagline: "All the magic, none of the stress",
    price: "₹1,49,000",
    priceNumeric: 149000,
    bestFor: "First-time NZ travelers, young couples, friends groups",
    duration: "10 Days · 9 Nights",
    heroImage: "/images/package-budget.jpg",
    accentColor: "#4A7C59",
    itinerary: [
      { day: 1, title: "Arrival in Auckland", description: "Welcome dinner · Hotel check-in" },
      { day: 2, title: "Auckland City Tour", description: "Sky Tower · Viaduct Harbour" },
      { day: 3, title: "Drive to Rotorua", description: "Geothermal park · Maori cultural night with hangi feast" },
      { day: 4, title: "Hobbiton & Taupo", description: "Hobbiton movie set tour · Drive to Taupo · Lake Taupo viewpoint" },
      { day: 5, title: "Fly to Queenstown", description: "Lakeside evening walk" },
      { day: 6, title: "Queenstown Adventures", description: "Gondola ride · Skyline luge · Free evening" },
      { day: 7, title: "Milford Sound", description: "Day trip to Milford Sound · Scenic cruise" },
      { day: 8, title: "Arrowtown & Wine Country", description: "Heritage walk · Wine country drive · Vineyard visit" },
      { day: 9, title: "Fly to Christchurch", description: "City tour · Farewell dinner" },
      { day: 10, title: "Departure", description: "Airport transfer · Farewell" },
    ],
    inclusions: [
      "Return international flights from major Indian cities",
      "9 nights in 3-star hotels (clean, comfortable, well-rated)",
      "Daily breakfast + 5 group dinners",
      "All inter-city travel (domestic flights, coach, rail where applicable)",
      "All listed sightseeing and entry tickets",
      "Hindi/English-speaking tour manager throughout",
      "Travel insurance",
      "Visa assistance",
    ],
    exclusions: [
      "Lunch (except where mentioned)",
      "Personal expenses, optional adventures (bungee, skydive)",
      "Tips and gratuities",
    ],
  },
  {
    id: "explorer-wings",
    name: "Explorer Wings",
    subtitle: "Learn & Explore with WingKiwi",
    tagline: "Go deeper. See more. Understand the soul of New Zealand.",
    price: "₹2,29,000",
    priceNumeric: 229000,
    bestFor: "Curious travelers, families with teens, culture and nature enthusiasts",
    duration: "10 Days · 9 Nights",
    heroImage: "/images/package-explorer.jpg",
    accentColor: "#6BB5D0",
    itinerary: [
      { day: 1, title: "Arrival in Auckland", description: "Guided welcome walk · Welcome dinner at a harbor restaurant" },
      { day: 2, title: "Waiheke Island", description: "Day trip with vineyard lunch and art trail" },
      { day: 3, title: "Waitomo & Rotorua", description: "Glowworm Caves experience · Continue to Rotorua" },
      { day: 4, title: "Rotorua Deep Dive", description: "Te Puia geothermal and Maori arts institute · Polynesian Spa evening" },
      { day: 5, title: "Hobbiton & Taupo", description: "Extended behind-the-scenes tour · Huka Falls jet boat" },
      { day: 6, title: "Fly to Queenstown", description: "Arrowtown gold-mining heritage tour" },
      { day: 7, title: "Milford Sound", description: "Full-day with kayaking option · Underwater Observatory" },
      { day: 8, title: "Glenorchy & LOTR", description: "Scenic drive · Lord of the Rings filming locations tour" },
      { day: 9, title: "Fly to Christchurch", description: "International Antarctic Centre · Punting on the Avon · Farewell dinner" },
      { day: 10, title: "Departure", description: "Airport transfer · Farewell" },
    ],
    inclusions: [
      "Return international flights from major Indian cities",
      "9 nights in 4-star hotels with character (boutique stays where possible)",
      "Daily breakfast + 7 curated dinners (mix of Indian, local, fine-dining)",
      "All inter-city travel including 2 domestic flights",
      "Premium guided experiences with local experts",
      "Hindi/English-speaking tour manager throughout",
      "Travel insurance, visa assistance, airport transfers",
      "One adventure activity included (your pick — luge, jet boat, or kayak)",
    ],
    exclusions: [
      "Lunches (except 2 included)",
      "Bungee, skydive, helicopter (available as add-ons)",
      "Personal expenses",
    ],
  },
  {
    id: "luxury-wings",
    name: "Luxury Wings",
    subtitle: "Luxury with WingKiwi",
    tagline: "Every detail. Every comfort. Every dream, delivered.",
    price: "₹3,99,000",
    priceNumeric: 399000,
    bestFor: "Honeymooners, anniversary travelers, discerning families, premium experiences",
    duration: "10 Days · 9 Nights",
    heroImage: "/images/package-luxury.jpg",
    accentColor: "#E8913A",
    itinerary: [
      { day: 1, title: "Business-Class Arrival", description: "Private transfer to 5-star hotel · Champagne welcome" },
      { day: 2, title: "Waiheke Island Yacht", description: "Private yacht charter with vineyard lunch" },
      { day: 3, title: "Helicopter to Rotorua", description: "Private geothermal and Maori cultural experience · Luxury lodge stay" },
      { day: 4, title: "Hobbiton & Taupo", description: "Private tour · Helicopter to Taupo · Lakeside spa evening" },
      { day: 5, title: "Private Flight to Queenstown", description: "Eichardt's or Matakauri Lodge stay" },
      { day: 6, title: "Milford Sound Premium", description: "Scenic flight in, cruise, scenic flight out" },
      { day: 7, title: "Mount Cook Glacier", description: "Helicopter to glacier · Private heli-picnic on the ice" },
      { day: 8, title: "Wine Country", description: "Private tour with cellar door tastings · Michelin-recommended dinner" },
      { day: 9, title: "Christchurch & TranzAlpine", description: "Luxury rail journey · Farewell at a heritage estate" },
      { day: 10, title: "Business-Class Departure", description: "Private transfer · Farewell" },
    ],
    inclusions: [
      "Business-class international flights from major Indian cities",
      "9 nights at 5-star luxury lodges and hotels",
      "All meals included with curated fine-dining experiences",
      "Private transfers throughout (no group coaches)",
      "Multiple helicopter and scenic flight experiences",
      "Personal trip concierge available 24/7",
      "Premium travel insurance, expedited visa, lounge access",
      "One signature couple experience (private chef dinner, couples spa, or photographer day)",
    ],
    exclusions: [
      "Personal shopping",
      "Optional extreme adventures",
      "Gratuities (recommended budget provided)",
    ],
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Priya & Rahul Sharma",
    city: "Mumbai",
    packageTaken: "Explorer Wings",
    quote: "WingKiwi made our honeymoon absolutely magical. From Hobbiton to Milford Sound, every moment was perfectly planned. The Hindi-speaking guide made us feel right at home.",
    image: "/images/testimonial-1.jpg",
  },
  {
    id: 2,
    name: "Anjali Desai",
    city: "Ahmedabad",
    packageTaken: "Budget Wings",
    quote: "I was nervous about traveling so far, but WingKiwi took care of everything. The vegetarian food options were incredible, and the Maori cultural night was unforgettable.",
    image: "/images/testimonial-2.jpg",
  },
  {
    id: 3,
    name: "Dr. Vikram Reddy",
    city: "Hyderabad",
    packageTaken: "Luxury Wings",
    quote: "The helicopter picnic on Mount Cook glacier was the highlight of our lives. Every detail was immaculate. This is how luxury travel should be done.",
    image: "/images/testimonial-3.jpg",
  },
  {
    id: 4,
    name: "The Iyer Family",
    city: "Chennai",
    packageTaken: "Explorer Wings",
    quote: "Traveling with our teenagers can be challenging, but WingKiwi kept everyone engaged. The kids loved the luge in Queenstown and we loved the wine country tour!",
    image: "/images/testimonial-4.jpg",
  },
  {
    id: 5,
    name: "Kabir & Meera Singh",
    city: "Delhi",
    packageTaken: "Budget Wings",
    quote: "We compared every NZ package out there. WingKiwi offered the best value with zero hidden costs. The all-inclusive pricing is genuine — no surprises.",
    image: "/images/testimonial-5.jpg",
  },
];

export const departureCities = [
  "Delhi (DEL)",
  "Mumbai (BOM)",
  "Bangalore (BLR)",
  "Chennai (MAA)",
  "Hyderabad (HYD)",
  "Ahmedabad (AMD)",
  "Kolkata (CCU)",
  "Pune (PNQ)",
  "Kochi (COK)",
];
