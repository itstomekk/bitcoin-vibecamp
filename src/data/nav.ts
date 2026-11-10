/**
 * Default copy for the navbar (src/components/Navbar.tsx).
 * FALLBACK — overridden at runtime by the `site.nav` row in `site_content`.
 */

export type NavItem = { label: string; id: string };

export type NavCopy = {
  logoAlt: string;
  items: NavItem[];
};

export const navCopy: NavCopy = {
  logoAlt: "Bitcoin Vibecamp",
  items: [
    { label: "About", id: "what" },
    { label: "Program", id: "schedule" },
    { label: "Location", id: "location" },
    { label: "Friends", id: "friends" },
    { label: "FAQ", id: "faq" },
  ],
};
