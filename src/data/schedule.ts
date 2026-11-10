/**
 * Default copy for the Program section (src/components/Schedule.tsx).
 *
 * FALLBACK values — overridden at runtime by the `home.schedule` row in
 * `site_content` (shallow merge, per-field validation). The same data is also
 * rendered as the exact agenda on the /about explainer.
 */

export type ScheduleDay = {
  date: string;
  day: string;
  name: string;
  items: string[];
  /** Gold-highlighted card. */
  accent?: boolean;
};

export type ScheduleSlot = { time: string; label: string };

export type ScheduleCopy = {
  sectionLabel: string;
  /** Heading: plain part, then the gradient part. */
  headingLead: string;
  headingHighlight: string;
  /** Days 1–4 — the build week (first row of the grid). */
  rowOne: ScheduleDay[];
  /** Days 5–6 — celebration & networking (second row, right-aligned). */
  rowTwo: ScheduleDay[];
  everyDayLabel: string;
  /** The Mon–Thu daily rhythm, shown as a timetable in the footer band. */
  everyDay: ScheduleSlot[];
  everyDayNote: string;
  /** Label of the link under the timetable that opens the /about explainer. */
  learnMoreLabel: string;
};


export const scheduleCopy: ScheduleCopy = {
  sectionLabel: "Program",
  headingLead: "mornings: workshops.",
  headingHighlight: "afternoons: free vibing under the roatán sun.",

  rowOne: [
    {
      date: "",
      day: "DAY 1",
      name: "Vibecoding foundations",
      items: [
        "What does AI actually do",
        "Agents, not chats: file-based workflows",
        "Prompt, plan, debug, iterate",
        "Choose your stack, build your website",
      ],
    },
    {
      date: "",
      day: "DAY 2",
      name: "Understanding software",
      items: [
        "Basics of software architecture",
        "Frontend, backend, database, APIs",
        "Client vs server",
        "Build a minigame",
        "Model switching",
      ],
    },
    {
      date: "",
      day: "DAY 3",
      name: "Open source & AI collaboration",
      items: [
        "Why and how to open-source",
        "Github flow: code reuse, forks, pull requests",
        "Multiple agents working together",
        "Nostr: authentication and messaging",
      ],
    },
    {
      date: "",
      day: "DAY 4",
      name: "Deploy & release",
      items: [
        "Integrate bitcoin",
        "Domains, env. variables, secrets",
        "Polish & publish",
        "\u201cMake no mistakes.\u201d",
      ],
      accent: true,
    },
  ],
  rowTwo: [
    {
      date: "",
      day: "DAY 5",
      name: "Cowork & celebrate",
      items: ["Morning relaxed cowork", "Beach hangout 🏖️", "Evening party"],
      accent: true,
    },
    {
      date: "",
      day: "DAY 6",
      name: "Business networking",
      items: ["Boattrip / island exploration", "Networking lunch", "Demo Day: pitch & vote"],
    },
  ],
  everyDayLabel: "Every day · days 1–4",
  everyDay: [
    { time: "09:00 – 13:00", label: "workshops & lessons" },
    { time: "14:00 – 19:00", label: "open building — free roaming, cowork, lunch, mentor consults" },
    { time: "20:00", label: "one short session + daily recap" },
  ],
  everyDayNote:
    "Planned agenda for v0.2 — exact dates TBA. Plus social activities and roatán chill throughout. Days 5 and 6 run on their own rhythm.",
  learnMoreLabel: "Learn more → the explainer",
};

