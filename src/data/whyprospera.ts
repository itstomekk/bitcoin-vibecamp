/**
 * Default copy for the Location section (src/components/WhyProspera.tsx).
 * FALLBACK — overridden at runtime by the `home.whyprospera` row in
 * `site_content`. Photos stay in the component (imported assets).
 */

export type LocationCard = { emoji: string; title: string; desc: string };

export type WhyProsperaCopy = {
  sectionLabel: string;
  /** Heading: plain line, then the gradient word + emoji. */
  headingLine1: string;
  headingHighlight: string;
  headingEmoji: string;
  /** Lead sentence, revealed sentence by sentence. */
  lead: string;
  /** Practical note in the gold-ruled box. */
  note: string;
  telegramLabel: string;
  telegramUrl: string;
  districtLabel: string;
  districtUrl: string;
  cards: LocationCard[];
};

export const whyProsperaCopy: WhyProsperaCopy = {
  sectionLabel: "The Location",
  headingLine1: "Próspera,",
  headingHighlight: "Roatán",
  headingEmoji: "🌴",
  lead: "A private jurisdiction on a Caribbean island. Bitcoin is legal tender here.",
  note: "Accommodation is inside or near Próspera. Some group meals included. Full meal plan available. Kitchen in every apartment.",
  telegramLabel: "Join Bitcoin District chat",
  telegramUrl: "https://telegram.thebitcoindistrict.com",
  districtLabel: "Visit Bitcoin District",
  districtUrl: "https://thebitcoindistrict.com",
  cards: [
    { emoji: "₿", title: "Bitcoin legal tender", desc: "Inside Próspera, Bitcoin is the official unit of account. Most businesses accept it." },
    { emoji: "🏛️", title: "Bitcoin ecosystem", desc: "BIG! Bitcoin Center & Bitcoin District with activist network, multiple projects, neighborhood under construction." },
    { emoji: "🔓", title: "24/7 access", desc: "All venues available around the clock. Build at 2am if that's when you're sharp." },
    { emoji: "🏘️", title: "~100 long-term residents", desc: "Próspera is a functioning neighborhood, not an event pop-up. Families live here." },
    { emoji: "🌊", title: "Roatán island", desc: "Caribbean island off Honduras. Beaches, reef diving, two gyms, tennis, restaurants. August is low season." },
    { emoji: "✈️", title: "Getting there", desc: "Fly into RTB (Roatán airport). Short transfer to Próspera. English widely spoken." },
  ],
};
