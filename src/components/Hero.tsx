import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { postJSON } from "@/lib/api";
import { useSiteContent } from "@/hooks/useSiteContent";
import logoSun from "@/assets/logo-sun.png";

/**
 * Hero section — full-viewport intro with two-column layout:
 * Left: branding, title, tagline, always-visible CTA buttons
 * Right: countdown timer + email form; on submit the form is replaced by
 *        a "Cabin secured" confirmation box. The page is never gated —
 *        all sections below are visible whether or not the email is entered.
 *
 * All copy comes from the `home.hero` content block (src/data/hero.ts default).
 */
const Hero = () => {
  const { hero: c } = useSiteContent();
  const [scrollX, setScrollX] = useState(0);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollX(window.scrollY * 0.15);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError("");

    const { status } = await postJSON("/api/waitlist", { email: email.trim().toLowerCase() }).catch(() => ({ status: 0 }));

    if (status !== 200 && status !== 201) {
      setError(c.errorMessage);
      setLoading(false);
      return;
    }

    setSubmitted(true);
  };

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-[0.35] pointer-events-none"
      >
        <source src="/bg-video.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/80 via-ocean/60 to-lagoon/40 pointer-events-none" />

      {/* Decorative clouds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="cloud cloud-1" />
        <div className="cloud cloud-2" />
        <div className="cloud cloud-3" />
      </div>

      {/* Bitcoin glow accent */}
      <div className="absolute top-[10%] right-[15%] w-48 h-48 rounded-full bg-bitcoin/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex-1 flex flex-col justify-center w-full">
        {/* Two-column top row */}
        <div className="w-full flex flex-col md:flex-row md:items-start md:justify-between gap-8 md:gap-12">

          {/* Left column — branding & post-signup actions */}
          <div className="flex-1 min-w-0">
            <p className="section-label text-white mb-4" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.35)' }}>
              <span className="text-vibe animate-cursor-blink font-bold mr-1">{">_"}</span>
              {c.dateLocation}
            </p>

            {/* Logo + title */}
            <div className="flex items-center mb-4" style={{ transform: `skewY(-4deg) translateX(${scrollX}px)` }}>
              <img src={logoSun} alt={c.logoAlt} className="h-16 sm:h-20 md:h-28 object-contain breathe-scroll -mr-3 md:-mr-6" />
              <h1 className="font-display text-6xl sm:text-7xl md:text-8xl font-bold text-white lowercase leading-[0.9]" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
                {c.titleLine1}
                <br />
                {c.titleLine2}
              </h1>
            </div>

            <p className="text-white text-lg mb-4 max-w-xl leading-relaxed font-semibold font-body" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.35)' }}>
              {c.taglineLine1}
              <br />
              {c.taglineLine2}{" "}
              <span className="text-bitcoin">{c.taglineHighlight}</span>
              {c.taglineSuffix}
            </p>

            {/* CTA buttons — always visible */}
            <div>
              <p className="text-white text-sm mb-8">
                {c.bylinePrefix}
                <a href={c.organiserUrl} target="_blank" rel="noopener noreferrer" className="text-bitcoin hover:underline font-semibold">{c.organiserLabel}</a>
                {" & "}
                <a href="#friends" onClick={(e) => { e.preventDefault(); scrollTo("friends"); }} className="text-bitcoin hover:underline font-semibold">{c.friendsLabel}</a>
                {c.bylineSuffix}
              </p>

              <div className="flex flex-wrap gap-3">
                <Button variant="default" size="lg" onClick={() => scrollTo("schedule")} className="breathe-hover font-bold text-[#041c2e] hover:opacity-90" style={{ backgroundColor: "#feb607" }}>
                  {c.ctaPrimary}
                </Button>
                <Button variant="outline" size="lg" onClick={() => scrollTo("faq")} className="font-bold border-white/30 text-white hover:bg-white/10">
                  {c.ctaSecondary}
                </Button>
              </div>
            </div>

          </div>

          {/* Right column — countdown + waitlist / confirmation box */}
          <div className="md:w-80 lg:w-96 flex-shrink-0 md:pt-8">
            {!submitted ? (
              <>
                {/* v0.1 recap box (replaced the ticket countdown) */}
                <div className="mb-6 border-l-4 border-bitcoin bg-black/25 backdrop-blur-sm p-5">
                  <p className="font-mono text-xs tracking-widest uppercase text-bitcoin font-bold mb-2">
                    {c.recapLabel}
                  </p>
                  {c.recapLines.map((line) => (
                    <p key={line} className="text-white text-sm font-body leading-relaxed" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.35)' }}>
                      {line}
                    </p>
                  ))}
                </div>

                {/* Nudge line with an animated arrow leading to the email field */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-bitcoin font-bold" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.45)' }}>
                    {c.formNudge}
                  </span>
                  <span aria-hidden className="text-bitcoin text-xl animate-bounce leading-none">↓</span>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-4 border-2 border-bitcoin/60 bg-black/25 backdrop-blur-sm p-4 shadow-[0_0_30px_rgba(254,182,7,0.25)]">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={c.emailPlaceholder}
                    className="w-full px-4 py-3 bg-white/25 border-2 border-white/50 text-white placeholder:text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-bitcoin focus:border-transparent backdrop-blur-sm"
                  />
                  <Button type="submit" variant="default" size="lg" disabled={loading} className="w-full bg-bitcoin hover:bg-bitcoin/80 text-[#041c2e] font-bold text-base py-6">
                    {loading ? c.submitLoadingLabel : c.submitLabel}
                  </Button>
                </form>

                {error && <p className="text-bitcoin text-sm font-semibold mb-4">{error}</p>}
              </>

            ) : (
              /* Post-signup: confirmation box — bigger, pirate vibe, vertically centered */
              <div
                className="relative bg-[#041c2e] border-2 border-bitcoin shadow-[0_0_40px_rgba(254,182,7,0.35)] p-8 min-h-[220px] flex items-center justify-center overflow-hidden animate-fade-in"
              >
                {/* Pirate pattern backdrop */}
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-[0.08] pointer-events-none select-none text-bitcoin font-display text-3xl leading-[1.4] tracking-widest break-words"
                  style={{ transform: "rotate(-8deg) scale(1.2)" }}
                >
                  {c.confirmPattern}
                </div>
                <p className="relative text-bitcoin text-2xl md:text-3xl font-bold font-mono text-center leading-snug tracking-wide">
                  {c.confirmLine1}
                  <br />
                  {c.confirmLine2}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Full-width mission statement at the bottom of the hero */}
      <div className="relative z-10 w-full px-6 pb-12 pt-8 mt-auto text-center">
        {c.missionLines.map((line) => (
          <p key={line} className="text-white text-sm leading-[1.8] font-body mb-1" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.35)' }}>
            {line}
          </p>
        ))}

        <p className="text-white text-xs leading-[1.8] font-mono mt-4" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.35)' }}>
          {c.audienceNote}
        </p>
      </div>
    </section>
  );
};

export default Hero;
