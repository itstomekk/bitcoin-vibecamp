/**
 * Footer — green "island" gradient with Bitcoin District branding.
 * Minimal: logo, site name, credits, and year.
 * Copy comes from the `site.footer` content block (src/data/footer.ts default).
 */
import bdLogo from "@/assets/bitcoin-district-logo.png";
import { useSiteContent } from "@/hooks/useSiteContent";

const Footer = () => {
  const { footer: c } = useSiteContent();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-to-b from-emerald-800 to-emerald-900 py-8 relative">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-white tracking-wider">
        <div className="flex items-center gap-3">
          <img src={bdLogo} alt={c.logoAlt} className="h-8 object-contain" />
          <span className="font-display text-white font-bold">
            {c.brandLead} <span className="text-bitcoin">{c.brandHighlight}</span>
          </span>
        </div>
        <span>
          <a href={c.organiserUrl} target="_blank" rel="noopener noreferrer" className="hover:text-bitcoin transition-colors text-white">{c.organiserLabel}</a>
          {" & "}
          <button onClick={() => scrollTo("friends")} className="hover:text-bitcoin transition-colors underline-offset-2 hover:underline text-white">{c.friendsLabel}</button>
          {" · "}{c.year}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
