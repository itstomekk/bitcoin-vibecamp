/**
 * Default copy for the Friends section (src/components/Friends.tsx).
 * FALLBACK — overridden at runtime by the `home.friends` row in `site_content`.
 *
 * Text and links only: partner logos are imported assets and stay in the
 * component, matched by partner `name`.
 */

export type Partner = {
  name: string;
  /** null renders the non-linked "Shadowy Supercoders" card. */
  url: string | null;
  desc: string;
};

export type Person = { name: string; url: string | null };

export type FriendsCopy = {
  sectionLabel: string;
  /** Heading: plain word, then the highlighted word + emoji. */
  headingLead: string;
  headingHighlight: string;
  headingEmoji: string;
  intro: string;
  partners: Partner[];
  people: Person[];
  /** Hidden invite revealed under the Shadowy Supercoders card. */
  buzzLabel: string;
  buzzUrl: string;
  ctaLabel: string;
  ctaEmail: string;
};

export const friendsCopy: FriendsCopy = {
  sectionLabel: "Friends",
  headingLead: "Our",
  headingHighlight: "friends",
  headingEmoji: "🤝",
  intro: "We're on the same ship.",
  partners: [
    { name: "Bitcoin District", url: "https://thebitcoindistrict.com", desc: "Community for Bitcoin builders" },
    { name: "Próspera", url: "https://prospera.co", desc: "Free city on Roatán" },
    { name: "AmityAge", url: "https://amityage.com", desc: "Education through and thanks to mining" },
    { name: "Shakespeare", url: "https://shakespeare.diy/", desc: "Vibe coding for Nostr & Bitcoin apps" },
    { name: "Alby", url: "https://getalby.com", desc: "Lightning wallet & identity for the web" },
    { name: "PPQ.ai", url: "https://ppq.ai", desc: "AI for builders" },
    { name: "Shadowy Supercoders", url: null, desc: "+ You" },
  ],
  people: [
    { name: "Dusan", url: "https://www.dusanmatuska.com/" },
    { name: "Tomek", url: "https://x.com/itstomekk" },
    { name: "Francis", url: "https://www.francismars.com/" },
    { name: "Sync", url: "https://primal.net/Sync" },
  ],
  buzzLabel: "Join the Buzz 🐝",
  buzzUrl:
    "https://bitcoindistrict.communities.buzz.xyz/invite/v2.iLgASnyFXoEJFI-6IOWJw8z2OwX_p3_2WNGAG-ynETc",
  ctaLabel: "Become a friend ✉️",
  ctaEmail: "vibecamp@thebitcoindistrict.com",
};
