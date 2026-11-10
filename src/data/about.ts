/**
 * Default copy for the /about explainer page.
 *
 * These values are the FALLBACK. At runtime the page loads the same shape from
 * the `site_content` table (key: `about.copy`) so the text can be edited
 * without a code change — see `src/hooks/useSiteContent.tsx` and the `content`
 * backend function (agent/API editing with the CONTENT_API_KEY header).
 *
 * Strings support **bold** and [label](url) markdown, rendered by RichText.
 */

export type Example = { icon: string; who: string; what: string; accent?: boolean };
export type QA = { q: string; a: string };

export type AboutCopy = {
  heroTitle: string;
  heroLead: string;
  heroSub: string;
  heroStrip: string;

  coreHeading: string;
  coreParagraphs: string[];
  pullQuote: string;

  honestyHeading: string;
  honestyItems: string[];

  /** "The skills you leave with" — a flat bullet list, not a calendar. */
  skillsHeading: string;
  skills: string[];
  skillsNote: string;

  examplesHeading: string;
  examples: Example[];
  examplesNote: string;

  /** "Where is it" — the venue, in plain words. */
  whereHeading: string;
  whereParagraphs: string[];

  objectionsHeading: string;
  objections: QA[];

  teachersHeading: string;
  teachersParagraphs: string[];

  referenceHeading: string;
  referenceIntro: string;

  ctaHeading: string;
  ctaParagraphs: string[];
  ctaButton: string;
  ctaFootnote: string;

  footerLines: string[];
};

export const aboutCopy: AboutCopy = {
  heroTitle: "what is vibecoding?",
  heroLead: "You say what you want in plain words. The AI writes the code.",
  heroSub:
    "That's it. The rest of this page is what that actually means, what you'd learn in a week of it, and where it happens.",
  heroStrip: "Bitcoin Vibecamp · v0.2 dates TBA · Próspera, Roatán · Free if you live here",

  coreHeading: "the code stopped being the hard part",
  coreParagraphs: [
    "Software is text. Very picky text. Writing it used to mean a year or two of tutorials before you could make anything someone else would use.",
    "Now you describe the thing and the AI writes it. That's vibecoding. It works, and it is genuinely fast.",
    "The catch: the AI does exactly what you asked, mistakes included. If you don't know roughly how a website is put together, you can't tell it what went wrong — and you stall on day two.",
    "So the week isn't about the tool. It's about being able to steer it, and to keep steering it after you fly home.",
  ],
  pullQuote: "the hard part didn't disappear. it moved.",

  honestyHeading: "three things up front",
  honestyItems: [
    "**The AI is wrong sometimes, and confident about it.** Spotting that is a skill, and we drill it.",
    "**You need to understand what it built.** Otherwise you can't change it later. A whole day goes on this.",
    "**A week is a week.** You leave with something real and running, and the habits to keep going. Not a company.",
  ],

  skillsHeading: "the skills you leave with",
  skills: [
    "Driving an AI agent properly — describing, planning, correcting, and knowing when to start over.",
    "Reading what the AI built well enough to change it yourself.",
    "The map of an app: frontend, backend, database, API — what each part does and where things break.",
    "Getting something live on the internet, on a real address, that stays up.",
    "Version control and git: saving work, branching, undoing a bad afternoon without panic.",
    "Working in the open — forks, pull requests, and contributing to someone else's code.",
    "Handing work between agents and models instead of babysitting one chat.",
    "Taking a Bitcoin or Lightning payment, if that fits what you're building.",
    "Debugging: reading an error, isolating it, and asking the right question about it.",
  ],
  skillsNote:
    "**The point is independence.** By Friday you can ask for a change to your own project and put it live without asking us.",

  examplesHeading: "what people actually build here",
  examples: [
    { icon: "🤿", who: "A dive shop", what: "a booking form, so the day's trips stop living in WhatsApp and sit on one page." },
    { icon: "🍤", who: "A restaurant", what: "a menu you edit yourself in a minute, two languages, tonight's specials on it." },
    { icon: "🏨", who: "A small hotel", what: "a direct booking page of your own, next to the booking sites." },
    { icon: "🛥️", who: "A tour operator", what: "one page showing what's running this week, with reservations that don't need a phone call." },
    { icon: "🧾", who: "A freelancer", what: "an invoice and quote page that takes Lightning, so getting paid isn't three messages." },
    { icon: "🎟️", who: "A community organiser", what: "an events page with sign-ups, instead of a poster in a group chat." },
    { icon: "🎮", who: "A developer", what: "a small game, a bot, or a tool for something you personally do every week." },
    { icon: "💡", who: "Anyone with an idea", what: "no business needed. Plenty of people arrive with something they've meant to build for years.", accent: true },
  ],
  examplesNote:
    "**Scope beats ambition.** The projects that finish are the ones you can describe in one sentence.",

  whereHeading: "where is it",
  whereParagraphs: [
    "In **Próspera**, on Roatán — the island jurisdiction where Bitcoin is legal tender. Workshops run in **The Dome**, the round hall in the Zona, and we cowork out of the **Bitcoin Center** next door.",
    "Everything is walkable from there: coffee, lunch, the sea. Afternoons happen wherever you work best — a desk in the Center, a table outside, or the beach.",
    "Getting there: fly into RTB, then a short drive. We coordinate group rides. [Open in Google Maps](https://www.google.com/maps/search/?api=1&query=Pr%C3%B3spera+ZEDE+Roat%C3%A1n+Honduras)",
  ],

  objectionsHeading: "questions people ask",
  objections: [
    {
      q: "\u201cI don't know anything about computers.\u201d",
      a: "That's who the beginner track is for. Around half the room won't have written a line of code. You describe what you want in plain words and we teach the rest from zero.",
    },
    {
      q: "\u201cI can't leave my business for a week.\u201d",
      a: "Send someone — a manager, a family member, whoever runs your Facebook page. Seats are transferable, and the person you send comes back able to do this for you.",
    },
    {
      q: "\u201cIs this a Bitcoin sales pitch?\u201d",
      a: "No. Bitcoin turns up where it's useful — payments on launch day, and the party. The rest of the week is building your thing.",
    },
    {
      q: "\u201cWhat do I need to bring?\u201d",
      a: "A laptop and one real problem worth solving. We send a short setup list a week ahead — a couple of free accounts, nothing to install on the day.",
    },
    {
      q: "\u201cWhy is it free for residents?\u201d",
      a: "Because we want locals in the room, not only visitors. That's the whole reason.",
    },
  ],

  teachersHeading: "who's teaching",
  teachersParagraphs: [
    "Tomek, Dusan, Kevin and Sebastian, for a room of 15 to 30 people. Small enough that everyone knows everyone by Tuesday.",
    "It runs sideways too. Half the room codes, half doesn't, and both halves know things the other doesn't. The person who fixes your layout might be the person whose booking form you fix.",
  ],

  referenceHeading: "everything else",
  referenceIntro:
    "Dates, costs, projects, and the practical stuff about Próspera and Roatán. Open the question you need.",

  ctaHeading: "live on Roatán? your seat is free.",
  ctaParagraphs: [
    "All four teaching days, lunch included, plus Friday's party and Saturday's networking. You bring a laptop and get yourself to Próspera — we help organise shared rides.",
    "One seat per business, so the reach stays wide, and it's transferable: if you can't come, send whoever handles your website.",
  ],
  ctaButton: "Claim a seat",
  ctaFootnote: "Not from Roatán?",

  footerLines: [
    "Bitcoin Vibecamp · Próspera, Roatán, Honduras · v0.2 dates TBA",
    "15–30 people · four teaching days · brought by Bitcoin District & friends",
    "vibecamp@thebitcoindistrict.com · bitcoinvibe.camp",
  ],
};
