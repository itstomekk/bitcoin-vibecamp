import RevealText from "./RevealText";
import SectionLabel from "./SectionLabel";
import { useSiteContent } from "@/hooks/useSiteContent";
import photoBeach from "@/assets/photo-beach.png";
import photoTeam from "@/assets/photo-team.png";
import photoAerial from "@/assets/photo-aerial.png";
import photoSunset from "@/assets/photo-sunset.png";

/**
 * Location section — details about Próspera and Roatán.
 * Left column is sticky on desktop with photos and Telegram link.
 * Right column has info cards about the venue and island.
 *
 * Copy comes from the `home.whyprospera` content block
 * (src/data/whyprospera.ts default); the photos are imported assets.
 */
const WhyProspera = () => {
  const { whyProspera: c } = useSiteContent();

  return (
    <section id="location" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left: sticky sidebar with heading, description, photos */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
            <SectionLabel>{c.sectionLabel}</SectionLabel>
            <h2 className="text-4xl md:text-5xl tracking-wide mb-16 leading-tight lowercase -ml-1" style={{ transform: "skewY(-4deg)" }}>
              {c.headingLine1}{" "}<br />
              <span className="gradient-text">{c.headingHighlight}</span> {c.headingEmoji}
            </h2>
            <RevealText
              text={c.lead}
              mode="sentence"
              speed={20}
              persistKey="location_desc"
              className="text-foreground text-sm leading-relaxed mb-6 font-body"
            />
            <p className="text-xs text-foreground leading-relaxed border-l-2 border-bitcoin/30 pl-4 font-body mb-6">
              {c.note}
            </p>

            {/* Photo gallery */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              <img src={photoBeach} alt="Próspera beach" className="w-full h-24 object-cover" />
              <img src={photoTeam} alt="Team at Próspera" className="w-full h-24 object-cover" />
              <img src={photoAerial} alt="Aerial view" className="w-full h-24 object-cover" />
              <img src={photoSunset} alt="Sunset view" className="w-full h-24 object-cover" />
            </div>

            <a
              href={c.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#0088cc]/10 border border-[#0088cc]/30 text-[#0088cc] hover:bg-[#0088cc]/20 transition-colors font-mono text-xs tracking-wider uppercase font-semibold"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
              {c.telegramLabel}
            </a>

            {/* Bitcoin District website link */}
            <a
              href={c.districtUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-bitcoin/10 border border-bitcoin/30 text-bitcoin hover:bg-bitcoin/20 transition-colors font-mono text-xs tracking-wider uppercase font-semibold"
            >
              {c.districtLabel}
            </a>
          </div>

          {/* Right: info cards grid */}
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4">
            {c.cards.map((card) => (
              <div key={card.title} className="bg-card border border-border p-6 hover:border-bitcoin/40 transition-colors group breathe-hover">
                <span className="text-3xl mb-4 block">{card.emoji}</span>
                <h3 className="text-lg font-bold mb-2">{card.title}</h3>
                <p className="text-sm text-foreground leading-relaxed font-body">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyProspera;
