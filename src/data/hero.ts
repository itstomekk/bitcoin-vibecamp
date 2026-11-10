/**
 * Default copy for the landing-page hero (src/components/Hero.tsx).
 *
 * These values are the FALLBACK. At runtime the same shape is loaded from the
 * `site_content` table (key: `home.hero`) and shallow-merged over these
 * defaults — see `src/hooks/useSiteContent.tsx`. Deleting the row restores
 * exactly what you see here.
 */

export type HeroCopy = {
  /** Date + location strip above the logo. */
  dateLocation: string;
  logoAlt: string;
  /** Big lowercase title, rendered on two lines. */
  titleLine1: string;
  titleLine2: string;
  /** Tagline: line 1, then line 2 followed by the gold highlight + suffix. */
  taglineLine1: string;
  taglineLine2: string;
  taglineHighlight: string;
  taglineSuffix: string;
  /** "By <organiser> & <friends>." byline. */
  bylinePrefix: string;
  organiserLabel: string;
  organiserUrl: string;
  friendsLabel: string;
  bylineSuffix: string;
  ctaPrimary: string;
  ctaSecondary: string;
  /** v0.1 recap box above the interest form (replaced the countdown). */
  recapLabel: string;
  recapLines: string[];
  /** Nudge line with the animated arrow that points at the email field. */
  formNudge: string;
  emailPlaceholder: string;
  submitLabel: string;
  submitLoadingLabel: string;
  errorMessage: string;

  /** Post-signup confirmation box (two lines) + its decorative glyph strip. */
  confirmLine1: string;
  confirmLine2: string;
  confirmPattern: string;
  /** Full-width mission statement at the bottom of the hero, one <p> each. */
  missionLines: string[];
  audienceNote: string;
};

export const heroCopy: HeroCopy = {
  dateLocation: "v0.2 · dates TBA 🏝️ Próspera, Roatán, Honduras",
  logoAlt: "Bitcoin Vibecamp",
  titleLine1: "bitcoin",
  titleLine2: "vibecamp",
  taglineLine1: "v0.1 is done — a great experiment, and a proven model.",
  taglineLine2: "AI workshops retreat on the pirate island. Next edition:",
  taglineHighlight: "v0.2, dates TBA",
  taglineSuffix: ".",
  bylinePrefix: "By ",
  organiserLabel: "Bitcoin District",
  organiserUrl: "https://thebitcoindistrict.com",
  friendsLabel: "friends",
  bylineSuffix: ".",
  ctaPrimary: "What's the vibe? ⛵",
  ctaSecondary: "FAQ",
  recapLabel: "v0.1 · shipped",
  recapLines: [
    "The first edition was a great test — and it worked.",
    "v0.2 is coming. Dates to be announced.",
  ],
  formNudge: "Express your interest in v0.2",

  emailPlaceholder: "you@email.com",
  submitLabel: "Join the next crew ⚡",
  submitLoadingLabel: "Joining...",
  errorMessage: "Something went wrong. Try again.",
  confirmLine1: "You're on the list.",
  confirmLine2: "We'll mail you the dates.",
  confirmPattern:
    "☠ ⚓ ☠ ⚓ ☠ ⚓ ☠ ⚓ ☠ ⚓ ☠ ⚓ ☠ ⚓ ☠ ⚓ ☠ ⚓ ☠ ⚓ ☠ ⚓ ☠ ⚓ ☠ ⚓ ☠ ⚓ ☠ ⚓",
  missionLines: [
    "The first edition worked: people arrived with ideas and left with shipped apps.",
    "AI is reshaping everything. Even out here, beyond the system.",
    "In a world where everything is buildable, what would you make? In digital, it's all 1s and 0s in the end — AI just handed everyone the keys.",
  ],
  audienceNote:
    "For developers, founders, hackers, vibe coders, and capable beginners who want to build in public, learn fast, and ship something real.",
};
