/**
 * Default copy for the tickets section (src/components/TicketsBanner.tsx).
 * FALLBACK — overridden at runtime by the `home.tickets` row in `site_content`.
 */

export type TicketFeature = { text: string; highlight: boolean };

export type Ticket = {
  name: string;
  price: string;
  features: TicketFeature[];
  /** Gold-bordered, emphasised tier. */
  accent: boolean;
};

export type TicketsCopy = {
  /** Heading text, followed by the gold emoji. */
  heading: string;
  headingEmoji: string;
  intro: string;
  /** Static "dates TBA" strip that replaced the old ticket countdown. */
  datesNote: string;
  tickets: Ticket[];
  residentsNote: string;
  inviteLabel: string;
  invitePlaceholder: string;
  inviteButton: string;
  inviteLoadingLabel: string;
  inviteSuccess: string;
};

export const ticketsCopy: TicketsCopy = {
  heading: "tickets for v0.2",
  headingEmoji: "🎟️",
  intro: "Pricing below is what v0.1 ran on — v0.2 will be in the same range. Leave your email and you'll hear the dates first.",
  datesNote: "🏴‍☠️ v0.2 · dates to be announced",
  tickets: [
    {
      name: "Standard",
      price: "500,000 sats",
      features: [
        { text: "6-day event access", highlight: false },
        { text: "Workshops & demos", highlight: false },
        { text: "WiFi + Starlink", highlight: false },
        { text: "Some group meals", highlight: false },
      ],
      accent: false,
    },
    {
      name: "All-Inclusive",
      price: "2,000,000 sats",
      features: [
        { text: "Everything in Standard", highlight: false },
        { text: "Accommodation included", highlight: true },
        { text: "Full meal plan", highlight: true },
        { text: "Local transport", highlight: false },
      ],
      accent: true,
    },
  ],
  residentsNote: "Roatán residents: free",
  inviteLabel: "Bring a friend — drop their email too",
  invitePlaceholder: "friend@email.com",
  inviteButton: "Invite ⚡",
  inviteLoadingLabel: "...",
  inviteSuccess: "✅ Invite sent! We'll email them.",
};
