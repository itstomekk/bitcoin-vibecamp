import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logoSun from "@/assets/logo-sun.png";
import { useSiteContent } from "@/hooks/useSiteContent";

/**
 * Navbar — appears once the visitor scrolls past the hero.
 * Labels and anchor ids come from the `site.nav` content block
 * (src/data/nav.ts default).
 */
const Navbar = () => {
  const { nav: c } = useSiteContent();
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <img src={logoSun} alt={c.logoAlt} className="h-10 object-contain" />
        </button>

        <div className="hidden md:flex items-center gap-6">
          {c.items.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-sm font-mono text-foreground hover:text-vibe transition-colors tracking-wide uppercase font-semibold"
            >
              {item.label}
            </button>
          ))}
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 top-16 bg-background z-40 flex flex-col items-center justify-center gap-8">
          {c.items.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="font-display text-2xl text-foreground font-bold"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
