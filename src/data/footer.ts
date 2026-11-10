/**
 * Default copy for the footer (src/components/Footer.tsx).
 * FALLBACK — overridden at runtime by the `site.footer` row in `site_content`.
 */

export type FooterCopy = {
  logoAlt: string;
  /** Brand: plain word, then the gold word. */
  brandLead: string;
  brandHighlight: string;
  organiserLabel: string;
  organiserUrl: string;
  friendsLabel: string;
  year: string;
};

export const footerCopy: FooterCopy = {
  logoAlt: "Bitcoin District",
  brandLead: "Bitcoin",
  brandHighlight: "Vibecamp",
  organiserLabel: "Bitcoin District",
  organiserUrl: "https://thebitcoindistrict.com",
  friendsLabel: "friends",
  year: "2026",
};
