import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FaqAnswer from "@/components/FaqAnswer";
import RichText from "@/components/RichText";
import { type FaqItem } from "@/data/faq";
import { useSiteContent } from "@/hooks/useSiteContent";
import logoDark from "@/assets/logo-dark.png";

/**
 * /about — the explainer + full reference page, laid out as an INFOGRAPHIC.
 *
 * Visual language (matches the landing page FAQ section):
 *   - the whole page sits on the ocean gradient used by <FAQ /> (sky -> deep navy)
 *   - palm trees grow from the bottom of the page, same as the FAQ section
 *   - cards are translucent white/5 with white/20 hairlines + backdrop blur
 *   - headings are lowercase Fredoka, slightly skewed; body is Source Code Pro
 *   - gold (bitcoin) is the single accent; no rounded corners anywhere
 *
 * All copy still comes from useSiteContent() (the `site_content` table, with
 * src/data/about.ts + src/data/faq.ts as fallback), so it stays editable
 * through the content API / MCP tools.
 */

/** Section heading — lowercase Fredoka, slight skew, with a hairline underneath. */
const Heading = ({ children, meta }: { children: React.ReactNode; meta?: string }) => (
  <div className="flex flex-wrap items-end justify-between gap-3 border-b-2 border-white/30 pb-4 mb-8">
    <h2
      className="font-display text-2xl sm:text-3xl lowercase text-white"
      style={{ transform: "skewY(-2deg)" }}
    >
      {children}
    </h2>
    {meta && (
      <span className="border border-bitcoin/60 bg-bitcoin/15 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-bitcoin">
        {meta}
      </span>
    )}
  </div>
);

/** Foldable question list, used for the objections and both FAQ blocks. */
const QuestionList = ({ items, prefix }: { items: FaqItem[]; prefix: string }) => (
  <Accordion type="single" collapsible className="space-y-2">
    {items.map((f, i) => (
      <AccordionItem
        key={f.q}
        value={`${prefix}-${i}`}
        className="border border-white/20 bg-white/5 backdrop-blur-sm px-5"
      >
        <AccordionTrigger className="font-display text-base text-left text-white hover:no-underline py-4">
          {f.q}
        </AccordionTrigger>
        <AccordionContent className="font-body text-sm leading-relaxed text-white pb-5 border-t border-white/15 pt-4">
          <FaqAnswer text={f.a} linkClassName="underline underline-offset-2 text-bitcoin" />
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
);




const About = () => {
  const { about: c, schedule, vibecampFaqs, prosperaFaqs } = useSiteContent();

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        // Same ocean gradient as the landing-page FAQ section.
        background:
          "linear-gradient(180deg, hsl(195, 70%, 55%) 0%, hsl(200, 75%, 40%) 18%, hsl(205, 80%, 28%) 45%, hsl(210, 85%, 18%) 75%, hsl(212, 88%, 13%) 100%)",
      }}
    >
      <header className="border-b border-white/25 relative z-10">
        <div className="max-w-4xl mx-auto px-5 py-5 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3">
            <img src={logoDark} alt="Bitcoin Vibecamp" className="h-8 object-contain" />
          </Link>
          <Link to="/" className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-white">
            ← Back to site
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-5 pb-40 relative z-10">
        {/* HERO — gold fact strip, oversized skewed title, gold-ruled lead. */}
        <section className="pt-12 sm:pt-16">
          <p className="inline-block border-2 border-bitcoin bg-bitcoin px-3 py-1 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#041c2e]">
            {c.heroStrip}
          </p>
          <h1
            className="font-display text-4xl sm:text-6xl lowercase leading-none text-white mt-6"
            style={{ transform: "skewY(-3deg)" }}
          >
            {c.heroTitle}
          </h1>
          <p className="font-body text-lg sm:text-xl text-white mt-8 border-l-4 border-bitcoin pl-6 leading-relaxed max-w-2xl">
            <RichText text={c.heroLead} />
          </p>
          <p className="font-body text-sm sm:text-base text-white mt-4 pl-6 leading-relaxed max-w-2xl">
            <RichText text={c.heroSub} />
          </p>
        </section>

        {/* THE SHIFT — three-step diagram, then the explainer paragraphs in two columns. */}
        <section className="mt-16">
          <Heading meta="the shift">{c.coreHeading}</Heading>

          {/* Step diagram: the loop in three moves. */}
          <div className="grid sm:grid-cols-3 border border-white/20 bg-white/5 backdrop-blur-sm mb-10">
            {[
              { n: "01", t: "you describe" },
              { n: "02", t: "the ai writes" },
              { n: "03", t: "you steer" },
            ].map((s, i) => (
              <div
                key={s.n}
                className={`flex items-center gap-4 p-5 ${
                  i < 2 ? "border-b sm:border-b-0 sm:border-r border-white/20" : ""
                }`}
              >
                <span className="font-display text-3xl text-bitcoin">{s.n}</span>
                <span className="font-mono text-xs uppercase tracking-widest text-white">{s.t}</span>
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5 font-body text-sm sm:text-base leading-relaxed text-white">
            {c.coreParagraphs.map((p, i) => (
              <p key={i}>
                <RichText text={p} />
              </p>
            ))}
          </div>

          <p className="mt-12 border-y-2 border-bitcoin py-5 font-display text-xl sm:text-3xl lowercase text-bitcoin text-center">
            {c.pullQuote}
          </p>
        </section>

        {/* HONESTY — numbered cards, gold on hover. */}
        <section className="mt-16">
          <Heading meta="read this first">{c.honestyHeading}</Heading>
          <div className="grid md:grid-cols-3 border border-white/20 bg-white/5 backdrop-blur-sm">
            {c.honestyItems.map((item, i) => (
              <div
                key={i}
                className={`group p-6 transition-colors hover:bg-bitcoin/20 ${
                  i < c.honestyItems.length - 1 ? "border-b md:border-b-0 md:border-r border-white/20" : ""
                }`}
              >
                <div className="font-display text-4xl text-white/40 group-hover:text-bitcoin mb-3 transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p className="font-body text-sm leading-relaxed text-white">
                  <RichText text={item} />
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS — flat bullet list of what you can do afterwards. */}
        <section className="mt-16">
          <Heading meta="take-home">{c.skillsHeading}</Heading>
          <ul className="grid sm:grid-cols-2 gap-px bg-white/20 border border-white/20">
            {c.skills.map((s) => (
              <li key={s} className="bg-white/5 backdrop-blur-sm p-5 flex items-start gap-3">
                <span className="font-mono text-bitcoin text-sm mt-0.5">▸</span>
                <span className="font-body text-sm leading-relaxed text-white">
                  <RichText text={s} />
                </span>
              </li>
            ))}
          </ul>
          <p className="font-body text-sm sm:text-base leading-relaxed text-white mt-8 border-l-4 border-bitcoin pl-5">
            <RichText text={c.skillsNote} />
          </p>
        </section>

        {/* EXAMPLES — icon grid of who / what. */}
        <section className="mt-16">
          <Heading meta="built here">{c.examplesHeading}</Heading>
          <div className="grid sm:grid-cols-2 gap-px bg-white/20 border border-white/20">
            {c.examples.map((e) => (
              <div
                key={e.who}
                className={`p-6 backdrop-blur-sm ${e.accent ? "bg-bitcoin/20" : "bg-white/5"}`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span aria-hidden className="text-2xl leading-none">{e.icon}</span>
                  <p className={`font-display text-lg lowercase ${e.accent ? "text-white" : "text-bitcoin"}`}>{e.who}</p>
                </div>
                <p className="font-body text-sm leading-relaxed text-white">
                  <RichText text={e.what} />
                </p>
              </div>
            ))}
          </div>
          <p className="font-body text-sm leading-relaxed text-white mt-6 border-l-4 border-white/40 pl-5">
            <RichText text={c.examplesNote} />
          </p>
        </section>

        {/* WHERE — the venue, in plain words. */}
        <section className="mt-16">
          <Heading meta="the place">{c.whereHeading}</Heading>
          <div className="space-y-4 font-body text-sm sm:text-base leading-relaxed text-white">
            {c.whereParagraphs.map((p, i) => (
              <p key={i} className="border-l-4 border-bitcoin pl-5">
                <RichText text={p} />
              </p>
            ))}
          </div>
        </section>


        {/* EXACT AGENDA — the real day-by-day programme, shared with the
            landing page via the `home.schedule` content block. */}
        <section className="mt-16">
          <Heading meta="exact agenda">the programme, hour by hour</Heading>

          {/* Daily rhythm timetable (Mon–Thu). */}
          <div className="border border-white/20 border-l-4 border-l-bitcoin bg-white/5 backdrop-blur-sm p-6 mb-8">
            <p className="font-mono text-[10px] uppercase tracking-widest text-bitcoin mb-4">{schedule.everyDayLabel}</p>
            <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-x-6 gap-y-2">
              {schedule.everyDay.map((slot) => (
                <div key={slot.time} className="contents">
                  <span className="font-mono text-sm text-bitcoin whitespace-nowrap">{slot.time}</span>
                  <span className="font-body text-sm text-white mb-2 sm:mb-0">{slot.label}</span>
                </div>
              ))}
            </div>
            <p className="font-body text-xs text-white/80 mt-4 pt-4 border-t border-white/20">{schedule.everyDayNote}</p>
          </div>

          {/* Every day of the event with its full item list. */}
          <div className="grid sm:grid-cols-2 gap-px bg-white/20 border border-white/20">
            {[...schedule.rowOne, ...schedule.rowTwo].map((d) => (
              <div key={d.day} className="bg-white/5 backdrop-blur-sm p-6">
                <div className="flex items-baseline justify-between gap-3 mb-3">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-bitcoin">{d.day}</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/80">{d.date}</span>
                </div>
                <p className="font-display text-lg lowercase text-white mb-3">{d.name}</p>
                <ul className="space-y-1.5">
                  {d.items.map((item) => (
                    <li key={item} className="font-body text-sm text-white flex items-start gap-2">
                      <span className="text-bitcoin text-xs mt-1">▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* OBJECTIONS — foldable. */}

        <section className="mt-16">
          <Heading meta="q & a">{c.objectionsHeading}</Heading>
          <QuestionList items={c.objections} prefix="obj" />
        </section>

        {/* TEACHERS. */}
        <section className="mt-16">
          <Heading meta="the room">{c.teachersHeading}</Heading>
          <div className="grid sm:grid-cols-2 gap-6 font-body text-sm sm:text-base leading-relaxed text-white">
            {c.teachersParagraphs.map((p, i) => (
              <p key={i} className="border-l-4 border-bitcoin pl-5">
                <RichText text={p} />
              </p>
            ))}
          </div>
        </section>

        {/* FULL REFERENCE — the complete FAQ knowledge base. */}
        <section className="mt-20">
          <Heading meta="reference">{c.referenceHeading}</Heading>
          <p className="font-body text-sm leading-relaxed text-white -mt-2 mb-8">
            <RichText text={c.referenceIntro} />
          </p>

          <h3 className="font-mono text-[11px] uppercase tracking-widest text-bitcoin mb-4">about vibecamp</h3>
          <QuestionList items={vibecampFaqs} prefix="vc" />

          <h3 className="font-mono text-[11px] uppercase tracking-widest text-bitcoin mt-10 mb-4">
            about próspera &amp; roatán
          </h3>
          <QuestionList items={prosperaFaqs} prefix="pr" />
        </section>

        {/* CTA — hard-shadow button, email-only destination (no form upstream). */}
        <section className="mt-16 border-2 border-bitcoin bg-[#041c2e]/70 backdrop-blur-sm p-6 sm:p-10 text-center shadow-[8px_8px_0px_hsl(var(--bitcoin))]">
          <h2
            className="font-display text-2xl sm:text-4xl lowercase text-white"
            style={{ transform: "skewY(-3deg)" }}
          >
            {c.ctaHeading}
          </h2>
          <div className="space-y-4 font-body text-sm sm:text-base leading-relaxed text-white mt-6 max-w-2xl mx-auto">
            {c.ctaParagraphs.map((p, i) => (
              <p key={i}>
                <RichText text={p} />
              </p>
            ))}
          </div>
          <div className="mt-8 flex flex-col items-center gap-4">
            <a
              href="mailto:vibecamp@thebitcoindistrict.com?subject=Claim%20a%20seat%20%E2%80%94%20Roat%C3%A1n%20resident&body=Name%3A%0ABusiness%3A%0AWhatsApp%3A%0AEmail%3A%0AWhat%20I'd%20like%20to%20build%20(one%20line)%3A"
              className="inline-block border-2 border-[#041c2e] bg-bitcoin px-8 py-4 font-mono text-xs uppercase tracking-widest text-[#041c2e] shadow-[6px_6px_0px_#041c2e] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[3px_3px_0px_#041c2e]"
            >
              {c.ctaButton}
            </a>
            <p className="font-body text-xs text-white">
              Questions:{" "}
              <a href="mailto:vibecamp@thebitcoindistrict.com" className="underline underline-offset-2 text-bitcoin">
                vibecamp@thebitcoindistrict.com
              </a>
            </p>
          </div>
          <p className="font-body text-xs text-white mt-5 italic">
            {c.ctaFootnote}{" "}
            <Link to="/#schedule" className="underline underline-offset-2 text-bitcoin">
              See the full program →
            </Link>
          </p>
        </section>

        {/* FOOTER FACTS. */}
        <section className="mt-14 border-t border-white/25 pt-6">
          <p className="font-mono text-[11px] leading-relaxed uppercase tracking-wider text-white">
            {c.footerLines.map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </p>
          <Link
            to="/"
            className="inline-block mt-8 border-2 border-bitcoin px-6 py-3 font-mono text-xs uppercase tracking-widest text-white hover:bg-bitcoin hover:text-[#041c2e] transition-colors"
          >
            ← Back to Vibecamp
          </Link>
        </section>
      </main>

      {/* Palm trees growing from the bottom — same motif as the FAQ section. */}
      <div
        className="absolute bottom-0 left-0 right-0 text-6xl sm:text-8xl flex justify-around pointer-events-none opacity-40 leading-none z-0"
        style={{ transform: "translateY(10%)" }}
      >
        <span>🌴</span>
        <span className="hidden sm:block">🌴</span>
        <span>🌴</span>
        <span className="hidden md:block">🌴</span>
        <span>🌴</span>
      </div>
    </div>
  );
};

export default About;
