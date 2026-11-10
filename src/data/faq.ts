/**
 * Shared FAQ content.
 *
 * Single source of truth for both:
 *  - the landing page FAQ section (shows only the first 4 of each list)
 *  - the /about explainer page (renders every entry)
 *
 * To add a question: append it to the right array. The first four entries of
 * each array are what visitors see on the home page, so keep the strongest
 * questions at the top.
 */

export type FaqItem = { q: string; a: string };

export const vibecampFaqs: FaqItem[] = [
  {
    q: "What is Vibecamp?",
    a: "A week of hands-on workshops that teach you to build software with AI, side by side with a small group of 15–30 people.\n\nMornings are workshops — short blocks, one idea at a time, so you can apply it straight away. Afternoons are for building your own thing, with mentors around when you get stuck. Evenings end with a short session and a daily recap of what everyone shipped.\n\nWe take on real problems from businesses and projects on Roatán, and yes, a few mini games get built along the way.",
  },
  {
    q: "When and where?",
    a: "Próspera, Roatán, Honduras. v0.1 is done; v0.2 dates are TBA — workshops in The Dome, coworking at the Bitcoin Center. [Open in Google Maps](https://www.google.com/maps/search/?api=1&query=Pr%C3%B3spera+ZEDE+Roat%C3%A1n+Honduras).\n\n• Days 1–4: workshops + building\n• Day 5: relaxed cowork + party\n• Day 6: business networking + Demo Day",
  },
  {
    q: "What is the daily schedule like?",
    a: "Mornings, 09:00–13:00: three to four workshops.\n\nAfternoons, 14:00–19:00: you build at your own tempo, with mentors available. Most people cowork in the same space, but nobody is counting.\n\nEvening, 20:00: one short vibe-coding session, then a quick recap — what got done, what's next tomorrow.",
  },
  {
    q: "Do I need to know how to code?",
    a: "No, and around half the room won't. We teach the workflow, the tools and the habits from zero. You leave able to build and ship your own software — not a computer-science graduate, but a builder.",
  },
  {
    q: "What will I actually learn?",
    a: "Driving an AI agent properly, reading what it built, the map of an app (frontend, backend, database, API), git and undoing mistakes, working in the open, deploying to a real address, and taking a Bitcoin payment if that fits your project.\n\nThe full list is on the [explainer page](/about).",
  },
  {
    q: "What kind of projects should I build?",
    a: "Something that runs. A working prototype, an integration, a tool, or real progress on a real problem — not a pitch deck.\n\nProblems from businesses and projects here on Roatán are the most rewarding fit, and Bitcoin-relevant ideas (Lightning UX, merchant tools, wallets, education tooling) work great too. What matters most is scope: pick something you can finish in a week.",
  },
  {
    q: "How much does it cost?",
    a: "500,000 sats standard, 2,000,000 sats all-inclusive.\n\nStandard covers the workshops, the build week, side activities and the networking day. All-inclusive adds accommodation, food, local transport and some bonus activities.\n\nRoatán residents join for free.",
  },
  {
    q: "Who is teaching?",
    a: "Tomek, Dusan, Kevin and Sebastian, plus guests from partner projects. Four teachers for 15–30 people, so you get real attention in the afternoons rather than a lecture hall.",
  },
  {
    q: "How do teams work? Can I come alone?",
    a: "Plenty of people come solo. There's a team formation session on Monday morning where people pitch ideas and find each other, and we help people connect before the event.\n\nTeams are optional. Working alone is fine.",
  },
  {
    q: "How does Demo Day work?",
    a: "Each project gets about 12 minutes to show what it does, and we livestream it. Mentors and the audience give friendly feedback — a share-and-learn session. Showing unfinished work is completely normal.",
  },
  {
    q: "How intense is it?",
    a: "Focused, not punishing. Mornings are structured, afternoons are yours. Some people do long build blocks, others take a beach break and come back for the evening session.",
  },
  {
    q: "What should I prepare before coming?",
    a: "A laptop, and whatever dev tools or vibe-coding platforms you already use — there's no required stack. We send a short setup list a week ahead: a couple of free accounts, nothing to install on the day.\n\nBring one real problem you'd like solved. That's the best raw material for the week.",
  },
  {
    q: "Who should NOT come?",
    a: "If you want to sit and listen to talks all week, this isn't it. Same if you're coming to promote something rather than build something. You don't need to be technical, but you do need to be willing to work on a project and take feedback.",
  },
];

export const prosperaFaqs: FaqItem[] = [
  {
    q: "What is Próspera?",
    a: "Próspera is an early-stage city development on Roatán, Honduras, and the one jurisdiction where Bitcoin is legal tender. Not a finished downtown, not wilderness either: functional infrastructure, a real working environment, Caribbean nature around it.\n\nAbout 100 people live there full time, with a growing builder and startup scene. You'll see construction and a few rough edges, but day to day it works fine.",
  },
  {
    q: "Where exactly does Vibecamp happen?",
    a: "Workshops run in The Dome, the round hall in the Zona of Próspera. Coworking and afternoon building happen at the Bitcoin Center next door. Everything is walkable — coffee, lunch, the sea.",
  },
  {
    q: "How do I get there?",
    a: "Fly into RTB (Roatán airport), then a short drive to Próspera. We coordinate group transport. You don't need a car for Vibecamp: inside Próspera everything is walkable, and for the wider island taxis and group rides work fine.",
  },
  {
    q: "What's the weather like? What should I pack?",
    a: "Hot and humid, 28–30°C (82–86°F). August is low season, so fewer tourists.\n\nPack light clothes, one rain layer, sunscreen, swimwear, sandals and one pair of closed shoes. For work: laptop, chargers, and an extension cable if you have one.",
  },
  {
    q: "How's the internet?",
    a: "Workable, not enterprise-grade — a local ISP plus Starlink. Don't assume 100% uptime; keep offline workflows for anything critical. Power is generally stable and outages are rare.",
  },
  {
    q: "What currency do I need?",
    a: "Bitcoin is the preferred currency inside Próspera and is accepted at many places across Roatán. Outside Próspera the island runs on Honduran lempira and US dollars, and cards work widely.\n\nArrive with a Lightning wallet set up. Bring some USD cash as backup.",
  },
  {
    q: "What about ATMs and phone data?",
    a: "ATMs (including Bitcoin ATMs) are nearby. For connectivity, get an eSIM before you arrive — Airalo is the easiest. Having data when you land saves a lot of hassle.",
  },
  {
    q: "Where do people stay?",
    a: "A mix: some stay inside Próspera, others in apartments and houses nearby, depending on budget. Apartments have kitchens and laundry.\n\nFamilies are welcome — there are families living on site and a Montessori school in the area.",
  },
  {
    q: "How do we eat?",
    a: "Apartments have kitchens, and there are restaurants, cafés and delivery. Some group meals are included in the ticket, and there's an optional meal plan if you'd rather not think about food. A large supermarket is reachable by group ride.",
  },
  {
    q: "Is it safe?",
    a: "Yes. Próspera is a private development and feels orderly, and Roatán is a tourist island that's safe with normal common sense. There's a GP on site for basic medical needs; for anything more serious we'll help you find local services.",
  },
  {
    q: "What are the social rules?",
    a: "No formal code of conduct. Be chill, have fun, respect each other, network with good intentions. Quiet hours after 10pm in residential areas — builders can keep working in the right venues. Ask before taking close-up photos or recording people.\n\nIf something comes up and you can't attend, email vibecamp@thebitcoindistrict.com and we'll sort it out.",
  },
  {
    q: "What's Roatán like outside Próspera?",
    a: "Not remote. Supermarkets, restaurants and tourist infrastructure all exist, and English is widely spoken alongside Spanish. The island isn't very walkable — you get around by taxi or ride, on decent roads by Caribbean standards.\n\nOutside workshop hours: beach, snorkeling, diving, hiking, two gyms, tennis, disc golf, billiards, ping-pong, foosball, restaurants, bars. We organise social events that mix attendees with Próspera residents.",
  },
  {
    q: "How do I connect with Bitcoin District beyond the event?",
    a: "Bitcoin District runs a local community inside Próspera. During the week we introduce you to residents, builders and business owners where it makes sense. There's also a rhythm you can plug into afterwards: coworking Tuesdays, weekly workshops, and Satoshi Saturdays for monthly networking.",
  },
];
