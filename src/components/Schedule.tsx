/**
 * Schedule / Program section — shows the 6-day agenda.
 * Layout: two rows of a 4-column grid.
 *   Row 1: Days 1–4
 *   Row 2: Days 5–6, right-aligned (the two left cells stay empty)
 * A footer band shows the Mon–Thu daily timetable.
 *
 * All copy (rowOne, rowTwo, everyDay) comes from the `home.schedule` content
 * block — src/data/schedule.ts holds the defaults.
 */
import { Link } from "react-router-dom";
import SectionLabel from "./SectionLabel";

import { useSiteContent } from "@/hooks/useSiteContent";
import type { ScheduleDay } from "@/data/schedule";

/**
 * DayCard — styled like a tear-off calendar card: a colored header strip
 * with the date + day label, then the agenda items on the "page" below.
 */
const DayCard = ({ d }: { d: ScheduleDay }) => (
  <div
    className={`flex flex-col border bg-card transition-all breathe-hover overflow-hidden ${
      d.accent ? "border-bitcoin shadow-md" : "border-border hover:border-bitcoin/40"
    }`}
  >
    {/* Calendar header strip */}
    <div
      className={`flex items-center justify-between px-4 py-2 border-b ${
        d.accent
          ? "bg-bitcoin border-bitcoin text-[#041c2e]"
          : "bg-ocean-deep border-border text-white"
      }`}
    >
      <span className="font-mono text-[10px] tracking-widest uppercase font-bold">{d.day}</span>
      {d.date && <span className="font-display text-sm font-bold tracking-wide">{d.date}</span>}
    </div>

    {/* Punch-hole hint row */}
    <div className="flex justify-center gap-6 pt-2" aria-hidden>
      <span className="block w-2 h-2 bg-border" />
      <span className="block w-2 h-2 bg-border" />
    </div>

    <div className="p-6 pt-4">
      <h3 className="text-xl font-bold mb-4">{d.name}</h3>
      <ul className="space-y-2">
        {d.items.map((item) => (
          <li key={item} className="text-sm text-foreground flex items-start gap-2 font-body">
            <span className="text-bitcoin mt-1 text-xs">▸</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const Schedule = () => {
  const { schedule: c } = useSiteContent();

  return (
    <section id="schedule" className="py-24 bg-secondary/30 relative overflow-hidden">
      {/* Subtle background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-[0.08] pointer-events-none"
      >
        <source src="/bg-video.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionLabel>{c.sectionLabel}</SectionLabel>
        <h2 className="text-4xl md:text-5xl tracking-wide lowercase -ml-1 mb-16" style={{ transform: "skewY(-4deg)" }}>
          {c.headingLead}{" "}<span className="gradient-text">{c.headingHighlight}</span>
        </h2>

        {/* Row 1 — days 1–4 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {c.rowOne.map((d) => <DayCard key={d.day} d={d} />)}
        </div>

        {/* Row 2 — days 5–6, pushed to the right on wide screens */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="hidden lg:block" aria-hidden />
          <div className="hidden lg:block" aria-hidden />
          {c.rowTwo.map((d) => <DayCard key={d.day} d={d} />)}
        </div>

        {/* Every day timetable (Mon–Thu rhythm) */}
        <div className="border border-dashed border-l-4 border-l-bitcoin/50 border-border bg-gradient-to-br from-bitcoin/5 to-card p-6">
          <span className="font-mono text-[10px] tracking-widest uppercase font-semibold text-bitcoin block mb-4">
            {c.everyDayLabel}
          </span>

          {/* Two-column grid keeps the times column-aligned across rows */}
          <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-x-6 gap-y-2">
            {c.everyDay.map((slot) => (
              <div key={slot.time} className="contents">
                <span className="font-mono text-sm text-bitcoin whitespace-nowrap flex items-center gap-2">
                  <span className="text-xs">▸</span>
                  {slot.time}
                </span>
                <span className="text-sm text-foreground font-body mb-2 sm:mb-0">{slot.label}</span>
              </div>
            ))}
          </div>

          <p className="mt-4 pt-4 border-t border-border text-xs text-muted-foreground font-body">
            {c.everyDayNote}
          </p>
        </div>

        {/* Learn more → the /about explainer */}
        <div className="mt-8">
          <Link
            to="/about"
            className="inline-block border-2 border-bitcoin bg-bitcoin/10 px-6 py-3 font-mono text-xs uppercase tracking-widest text-foreground hover:bg-bitcoin hover:text-[#041c2e] transition-colors"
          >
            {c.learnMoreLabel}
          </Link>
        </div>


      </div>
    </section>
  );
};

export default Schedule;
