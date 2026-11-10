/**
 * Default head metadata (mirrors the static tags in index.html).
 *
 * FALLBACK — overridden at runtime by the `site.meta` row in `site_content`
 * and applied to document.head on app mount (see src/hooks/useSiteMeta.ts).
 * The static tags in index.html stay as-is: they are what non-JS crawlers read.
 */

export type MetaCopy = {
  title: string;
  description: string;
  keywords: string;
  author: string;
  canonical: string;
  themeColor: string;

  ogType: string;
  ogUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogSiteName: string;
  ogImage: string;
  ogImageAlt: string;

  twitterCard: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  twitterImageAlt: string;

  /** Event JSON-LD, replaces the first ld+json block in the document. */
  eventJsonLd: Record<string, unknown>;
  /** FAQPage JSON-LD, replaces the second ld+json block in the document. */
  faqJsonLd: Record<string, unknown>;
};

export const metaCopy: MetaCopy = {
  title: "Bitcoin Vibecamp — Builder Bootcamp in Próspera, Roatán",
  description:
    "6-day Bitcoin & AI builder bootcamp in Próspera, Roatán — where Bitcoin is legal tender. v0.1 shipped; v0.2 dates TBA.",
  keywords:
    "Bitcoin Vibecamp, Bitcoin hackathon, Próspera, Roatán, Bitcoin builders, Bitcoin legal tender, Honduras, Lightning Network, ZEDE",
  author: "Bitcoin District & friends",
  canonical: "https://bitcoinvibe.camp/",
  themeColor: "#041c2e",

  ogType: "website",
  ogUrl: "https://bitcoinvibe.camp/",
  ogTitle: "Bitcoin Vibecamp — Learn to Build Software with AI",
  ogDescription:
    "Six days on Roatán. AI workshops retreat inside Próspera where Bitcoin is legal tender. v0.2 dates TBA.",
  ogSiteName: "Bitcoin Vibecamp",
  ogImage: "https://bitcoinvibe.camp/og-image.jpg?v=3",
  ogImageAlt:
    "Bitcoin Vibecamp — learn to build software with AI on a pirate island in Próspera, Roatán",

  twitterCard: "summary_large_image",
  twitterTitle: "Bitcoin Vibecamp — Learn to Build Software with AI",
  twitterDescription:
    "Six days on Roatán. AI workshops retreat inside Próspera where Bitcoin is legal tender. v0.2 dates TBA.",
  twitterImage: "https://bitcoinvibe.camp/og-image.jpg?v=3",
  twitterImageAlt: "Bitcoin Vibecamp — Próspera, Roatán",

  eventJsonLd: {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Bitcoin Vibecamp 2026",
    description:
      "Six-day builder bootcamp & hackathon inside Próspera ZEDE, Roatán — where Bitcoin is legal tender.",
    startDate: "2026-08-17",
    endDate: "2026-08-22",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: "Próspera ZEDE, Roatán",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Roatán",
        addressRegion: "Bay Islands",
        addressCountry: "HN",
      },
    },
    image: ["https://bitcoinvibe.camp/og-image.jpg"],
    url: "https://bitcoinvibe.camp/",
    organizer: {
      "@type": "Organization",
      name: "Bitcoin District",
      url: "https://thebitcoindistrict.com",
    },
  },

  faqJsonLd: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Vibecamp?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Vibecamp is a week of hands-on workshops that teach you to build software using AI. It's not a competition — it's intensive teaching and building with a small, motivated group. Together we take on real digital problems in the Próspera ecosystem and ship actual solutions, plus some mini games along the way.",
        },
      },
      {
        "@type": "Question",
        name: "When and where?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Próspera ZEDE, Roatán, Honduras. Six days: days 1–4 workshops + building, day 5 cowork & party, day 6 business networking + Demo Day. v0.2 dates TBA.",
        },
      },
      {
        "@type": "Question",
        name: "What is the daily schedule like?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Mornings: 3–4 workshops, 9:00–13:00, then a lunch break. Afternoons are yours to build at your own tempo with mentors available. After sunset one short vibe-coding lesson and a quick round-up.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need to know how to code?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. We teach you the workflow, the tools and the habits — you'll walk out of Vibecamp able to build and ship your own software.",
        },
      },
      {
        "@type": "Question",
        name: "What is Próspera?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Próspera ZEDE is an early-stage city development on Roatán, Honduras — the only jurisdiction where Bitcoin is legal tender. Functional infrastructure, a growing builder scene, Caribbean nature around it.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need a visa?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most nationalities can enter Honduras without a visa. Check your country's requirements early; we can issue an invitation letter if needed.",
        },
      },
      {
        "@type": "Question",
        name: "How do I get there?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Fly into RTB (Roatán airport). Short drive to Próspera. Group transport coordinated. No car needed.",
        },
      },
      {
        "@type": "Question",
        name: "What's the weather like? What should I pack?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Hot and humid, 28–30°C. Pack light clothes, a rain layer, sunscreen, swimwear, sandals, closed shoes, laptop and chargers.",
        },
      },
    ],
  },
};
