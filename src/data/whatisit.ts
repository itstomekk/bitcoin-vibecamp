/**
 * Default copy for the "What is Vibecamp" section (src/components/WhatIsIt.tsx).
 * FALLBACK — overridden at runtime by the `home.whatisit` row in `site_content`.
 * The photo strip falls back to the bundled assets in the component; set the
 * `photos` array through the content API to swap in new event photos
 * (each item: { src: absolute image URL, alt: description }).
 */

export type Fact = {
  emoji: string;
  title: string;
  desc: string;
  /** Optional links appended after the description. */
  links?: { label: string; url: string }[];
};

export type Photo = { src: string; alt: string };

export type WhatIsItCopy = {
  sectionLabel: string;
  /** Rotated label pinned to the left edge on desktop. */
  verticalLabel: string;
  /** Heading: plain line, then the gradient line. */
  headingLine1: string;
  headingLine2: string;
  /** Body paragraph, revealed sentence by sentence. */
  body: string;
  facts: Fact[];
  /** Empty = use the bundled default photos in the component. */
  photos: Photo[];
};

export const whatIsItCopy: WhatIsItCopy = {
  sectionLabel: "What is Vibecamp",
  verticalLabel: "The default mode is building.",
  headingLine1: "0.5 bootcamp,",
  headingLine2: "0.5 pirate retreat.",
  body:
    "Come with a project, or just an idea; build with your team, find one here or work solo. Learn to create proper software with AI: agentic workflows, vibe coding, and shipping real deployed apps. We teach, you build. Spend the week building with AI on the Caribbean libertarian island. Workshops, talks, and a soft hackathon — for experts and beginners.",
  photos: [],
  facts: [
    {
      emoji: "⚙️",
      title: "format.md",
      desc: "15-30 builders, half are pros, half not yet / small cozy group, everyone knows everyone by day two / workshops + deep focus + socials, on a good vibes.",
    },
    {
      emoji: "🎓",
      title: "learn.md",
      desc: "Learn vibe coding and agentic workflows from people who ship daily. Leave with the app you always dreamed of — built and deployed by you. No coding background needed — we start from git and architecture basics and build up from there.",
    },
    {
      emoji: "🛠️",
      title: "build.md",
      desc: "Soft hackathon: solve a real problem on Roatán, or bring your own dream app idea. Learning first, competition second. Small symbolic prizes for the best local-impact project — the real win is what you ship and learn.",
    },
    {
      emoji: "🏝️",
      title: "Stay longer",
      desc: "Many people stay a bit longer, and most come back later.",
    },
  ],
};
