/**
 * StatsBar — horizontal stats strip with key event highlights.
 * Copy comes from the `home.stats` content block (src/data/stats.ts default).
 */
import { useSiteContent } from "@/hooks/useSiteContent";

const StatsBar = () => {
  const { stats: c } = useSiteContent();

  return (
    <section className="bg-ocean-deep text-white py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
        {c.stats.map((s) => (
          <div key={s.label} className="text-center group">
            <div className="text-2xl mb-2">{s.emoji}</div>
            <div className="font-display text-2xl md:text-3xl text-bitcoin font-bold mb-2">{s.number}</div>
            <div className="text-xs font-mono text-white tracking-wider uppercase">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsBar;
