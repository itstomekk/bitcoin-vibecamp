import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/hooks/useSiteContent";
import type { Partner, Person } from "@/data/friends";
import hoodiePerson from "@/assets/hoodie-person.png";
import bitcoinDistrictLogo from "@/assets/partner-logos/Bitcoin-District.png.png.asset.json";
import prosperaLogo from "@/assets/partner-logos/prospera.png.asset.json";
import amityageLogo from "@/assets/partner-logos/amityage.png.asset.json";
import albyLogo from "@/assets/partner-logos/alby-hub_logomark-light.png.png.asset.json";
import payperqLogo from "@/assets/partner-logos/payperq.png.asset.json";
import shakespeareLogo from "@/assets/partner-logos/shakespeare.png.asset.json";

/**
 * Friends section — partners and shadowy supercoders live in a single
 * unified grid. Partners span 2 columns, individual coders span 1.
 *
 * Text and links come from the `home.friends` content block
 * (src/data/friends.ts default). Logos are imported assets and stay here,
 * matched to a partner by name.
 */

/** Partner name -> logo asset. A partner without an entry renders logo-less. */
const LOGOS: Record<string, string> = {
  "Bitcoin District": bitcoinDistrictLogo.url,
  "Próspera": prosperaLogo.url,
  AmityAge: amityageLogo.url,
  Shakespeare: shakespeareLogo.url,
  Alby: albyLogo.url,
  "PPQ.ai": payperqLogo.url,
};

const PartnerCard = ({ p, buzz }: { p: Partner; buzz: { label: string; url: string } }) => {
  const logo = LOGOS[p.name];
  const inner = (
    <>
      <div className="flex items-center gap-3 mb-2">
        {logo && (
          <img src={logo} alt={`${p.name} logo`} className="h-8 w-8 object-contain flex-shrink-0" loading="lazy" />
        )}
        <h3 className="font-display text-2xl font-bold group-hover:text-vibe transition-colors">{p.name}</h3>
      </div>
      <p className="text-sm text-foreground font-body">{p.desc}</p>
    </>
  );
  if (p.url) {
    return (
      <a
        href={p.url}
        target="_blank"
        rel="noopener noreferrer"
        className="sm:col-span-2 h-full min-h-[172px] flex flex-col justify-center border border-border bg-card p-8 hover:border-vibe/40 transition-all breathe-hover group block text-left"
      >
        {inner}
      </a>
    );
  }
  /**
   * Shadowy Supercoders card: fades away on hover, revealing the
   * "Join the Buzz" community invite underneath. Both layers are the same
   * size — the cover layer defines the height (matching the other partner
   * cards) and the reveal is absolutely positioned on top, so hovering
   * never changes the card's height.
   */
  return (
    <div className="sm:col-span-2 relative group text-left h-full min-h-[172px]">
      {/* Revealed layer */}
      <a
        href={buzz.url}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 flex items-center justify-center border border-vibe/40 bg-card opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      >
        <span className="font-display text-2xl font-bold text-vibe">{buzz.label}</span>
      </a>
      {/* Cover layer */}
      <div className="relative h-full flex flex-col justify-center border border-border bg-card p-8 opacity-60 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none">
        {inner}
      </div>
    </div>
  );

};

const CoderCard = ({ person }: { person: Person }) => {
  const Inner = (
    <div className="relative flex flex-col items-center justify-center h-full min-h-[172px] border border-border bg-card p-3 overflow-hidden transition-all hover:border-vibe/40 cursor-pointer group">
      <img
        src={hoodiePerson}
        alt="Anonymous hooded developer silhouette"
        width={512}
        height={512}
        loading="lazy"
        className="h-28 w-auto object-contain transition-opacity duration-300 group-hover:opacity-0"
      />
      <div className="absolute inset-0 flex items-center justify-center p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="font-display font-bold text-vibe text-base text-center">{person.name}</p>
      </div>
    </div>
  );
  return person.url ? (
    <a href={person.url} target="_blank" rel="noopener noreferrer" aria-label={person.name} className="sm:col-span-1">
      {Inner}
    </a>
  ) : (
    <div className="sm:col-span-1" aria-label={person.name}>{Inner}</div>
  );
};

const Friends = () => {
  const { friends: c } = useSiteContent();
  const buzz = { label: c.buzzLabel, url: c.buzzUrl };

  return (
    <section id="friends" className="py-24">
      <div className="max-w-4xl mx-auto px-6">
        <p className="section-label">
          <span className="text-vibe animate-cursor-blink inline-block mr-1">{">_"}</span> {c.sectionLabel}
        </p>
        <h2 className="text-4xl md:text-5xl tracking-wide mb-4 lowercase" style={{ transform: "skewY(-4deg)" }}>
          {c.headingLead} <span className="text-vibe">{c.headingHighlight}</span> {c.headingEmoji}
        </h2>
        <p className="text-foreground text-sm mb-16 max-w-lg font-body mt-6">
          {c.intro}
        </p>

        {/* Unified grid: partners span 2 cols, coders span 1 col */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {c.partners.map((p) => <PartnerCard key={p.name} p={p} buzz={buzz} />)}
          {c.people.map((person) => <CoderCard key={person.name} person={person} />)}
        </div>

        <Button asChild variant="outline" size="lg" className="font-bold border-vibe text-vibe hover:bg-vibe hover:text-white">
          <a href={`mailto:${c.ctaEmail}`}>
            {c.ctaLabel}
          </a>
        </Button>
      </div>
    </section>
  );
};

export default Friends;
