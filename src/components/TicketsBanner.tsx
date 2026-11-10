/**
 * TicketsBanner — post-signup ticket pricing section.
 * Shows a "dates TBA" strip, two ticket tiers, and an invite-a-friend form.
 * All copy comes from the `home.tickets` content block
 * (src/data/tickets.ts default).
 */
import { useState } from "react";
import { Button } from "./ui/button";
import { postJSON } from "@/lib/api";
import { useSiteContent } from "@/hooks/useSiteContent";

const TicketsBanner = () => {
  const { tickets: c } = useSiteContent();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    const { status } = await postJSON("/api/waitlist", { email: email.trim().toLowerCase() }).catch(() => ({ status: 0 }));
    if (status !== 200 && status !== 201) {
      setLoading(false);
      return;
    }
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-lagoon via-ocean to-ocean-deep overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-transparent" />
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        {/* Section heading */}
        <h2 className="text-5xl md:text-[80px] leading-[0.85] tracking-wide lowercase text-white -ml-1 mb-16" style={{ transform: "skewY(-4deg)" }}>
          {c.heading}{" "}
          <span className="text-bitcoin">{c.headingEmoji}</span>
        </h2>

        <p className="text-white text-sm mb-10 max-w-lg mx-auto leading-relaxed font-body">
          {c.intro}
        </p>

        {/* Dates TBA strip (replaces the old ticket-sales countdown) */}
        <div className="max-w-sm mx-auto breathe-scroll mb-12 border-2 border-bitcoin/60 bg-black/20 backdrop-blur-sm p-4">
          <p className="font-mono text-sm uppercase tracking-widest text-bitcoin font-bold">{c.datesNote}</p>
        </div>

        {/* Ticket tiers */}
        <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-12">
          {c.tickets.map((t) => (
            <div
              key={t.name}
              className={`p-6 text-left ${
                t.accent
                  ? "bg-white/20 border-2 border-bitcoin shadow-lg shadow-bitcoin/20"
                  : "bg-white/10 border-2 border-white/40"
              }`}
            >
              <p className="font-mono text-[10px] tracking-widest uppercase text-white mb-2">
                {t.name}
              </p>
              <p className="font-display text-2xl font-bold text-white mb-1">₿ {t.price}</p>
              <ul className="space-y-1.5 mt-4">
                {t.features.map((f) => (
                  <li key={f.text} className={`text-xs flex items-start gap-2 font-body ${f.highlight ? "text-bitcoin font-bold text-sm" : "text-white"}`}>
                    <span className="text-bitcoin mt-0.5">▸</span>
                    {f.text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-white text-sm font-body mb-12 max-w-lg mx-auto">
          <span className="text-bitcoin font-bold">{c.residentsNote}</span>
        </p>




        {/* Invite a friend */}
        <div className="max-w-md mx-auto">
          {submitted ? (
            <p className="text-bitcoin font-bold font-body text-sm">{c.inviteSuccess}</p>
          ) : (
            <>
              <p className="text-white text-xs font-mono mb-3 uppercase tracking-wider">{c.inviteLabel}</p>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={c.invitePlaceholder}
                  className="flex-1 px-4 py-3 bg-white/20 border-2 border-white/40 text-white placeholder:text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-bitcoin focus:border-transparent backdrop-blur-sm"
                />
                <Button type="submit" disabled={loading} className="bg-bitcoin hover:bg-bitcoin/80 text-[#041c2e] font-bold">
                  {loading ? c.inviteLoadingLabel : c.inviteButton}
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default TicketsBanner;
