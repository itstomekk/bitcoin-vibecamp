/**
 * Default copy for the stats strip (src/components/StatsBar.tsx).
 * FALLBACK — overridden at runtime by the `home.stats` row in `site_content`.
 */

export type Stat = { number: string; label: string; emoji: string };

export type StatsCopy = {
  stats: Stat[];
};

export const statsCopy: StatsCopy = {
  stats: [
    { number: "v0.1", label: "done — model proven", emoji: "✅" },
    { number: "Days 1–4", label: "Workshops & building", emoji: "👨‍💻" },
    { number: "Days 5–6", label: "Demo day + business tourism", emoji: "🛥️" },
    { number: "→", label: "opportunities, friendships, horizons", emoji: "🏝️" },
  ],
};
