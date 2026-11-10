import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { mergeContent } from "@/lib/content-merge";
import { prosperaFaqs, vibecampFaqs, type FaqItem } from "@/data/faq";
import { aboutCopy, type AboutCopy } from "@/data/about";
import { heroCopy, type HeroCopy } from "@/data/hero";
import { scheduleCopy, type ScheduleCopy } from "@/data/schedule";
import { statsCopy, type StatsCopy } from "@/data/stats";
import { ticketsCopy, type TicketsCopy } from "@/data/tickets";
import { whatIsItCopy, type WhatIsItCopy } from "@/data/whatisit";
import { whyProsperaCopy, type WhyProsperaCopy } from "@/data/whyprospera";
import { friendsCopy, type FriendsCopy } from "@/data/friends";
import { navCopy, type NavCopy } from "@/data/nav";
import { footerCopy, type FooterCopy } from "@/data/footer";
import { metaCopy, type MetaCopy } from "@/data/meta";

/**
 * Site content — every piece of editable copy on the site.
 *
 * Why: all copy can be edited by an external agent / script through the
 * `/api/content` Pages Function (see functions/api/content.ts) or the MCP tools,
 * without touching code. This provider reads the whole `site_content` table in
 * ONE request on app mount and shallow-merges each row over the hardcoded
 * default in src/data/*.ts, so the site NEVER renders empty if the backend is
 * unreachable, a key is missing, or a value is malformed.
 *
 * Deleting a row restores exactly the code default.
 *
 * Keys:
 *   about.copy       -> AboutCopy         (src/data/about.ts)
 *   faq.vibecamp     -> FaqItem[]         (src/data/faq.ts)
 *   faq.prospera     -> FaqItem[]         (src/data/faq.ts)
 *   home.hero        -> HeroCopy          (src/data/hero.ts)
 *   home.schedule    -> ScheduleCopy      (src/data/schedule.ts)
 *   home.stats       -> StatsCopy         (src/data/stats.ts)
 *   home.tickets     -> TicketsCopy       (src/data/tickets.ts)
 *   home.whatisit    -> WhatIsItCopy      (src/data/whatisit.ts)
 *   home.whyprospera -> WhyProsperaCopy   (src/data/whyprospera.ts)
 *   home.friends     -> FriendsCopy       (src/data/friends.ts)
 *   site.nav         -> NavCopy           (src/data/nav.ts)
 *   site.footer      -> FooterCopy        (src/data/footer.ts)
 *   site.meta        -> MetaCopy          (src/data/meta.ts)
 */

export type SiteContent = {
  about: AboutCopy;
  vibecampFaqs: FaqItem[];
  prosperaFaqs: FaqItem[];
  hero: HeroCopy;
  schedule: ScheduleCopy;
  stats: StatsCopy;
  tickets: TicketsCopy;
  whatIsIt: WhatIsItCopy;
  whyProspera: WhyProsperaCopy;
  friends: FriendsCopy;
  nav: NavCopy;
  footer: FooterCopy;
  meta: MetaCopy;
};

const DEFAULTS: SiteContent = {
  about: aboutCopy,
  vibecampFaqs,
  prosperaFaqs,
  hero: heroCopy,
  schedule: scheduleCopy,
  stats: statsCopy,
  tickets: ticketsCopy,
  whatIsIt: whatIsItCopy,
  whyProspera: whyProsperaCopy,
  friends: friendsCopy,
  nav: navCopy,
  footer: footerCopy,
  meta: metaCopy,
};

/** Only accept arrays of {q,a} so bad data can't blank out a section. */
const asFaqList = (value: unknown, fallback: FaqItem[]): FaqItem[] => {
  if (!Array.isArray(value) || value.length === 0) return fallback;
  const items = value.filter(
    (i): i is FaqItem =>
      !!i && typeof i === "object" && typeof (i as FaqItem).q === "string" && typeof (i as FaqItem).a === "string",
  );
  return items.length ? items : fallback;
};

/** Shallow merge: any field absent from the stored object keeps its default. */
const asAbout = (value: unknown): AboutCopy => mergeContent(aboutCopy, value);

const SiteContentContext = createContext<SiteContent>(DEFAULTS);

/** Single fetch for every key, shared with all components below it. */
export const SiteContentProvider = ({ children }: { children: ReactNode }) => {
  const [rows, setRows] = useState<Map<string, unknown> | null>(null);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const res = await fetch("/api/content");
        if (!res.ok) return;
        const data = (await res.json()) as { items?: { key: string; value: unknown }[] };
        if (!active || !Array.isArray(data.items)) return;
        setRows(new Map(data.items.map((row) => [row.key, row.value])));
      } catch {
        /* backend unreachable: keep the code defaults */
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  const value = useMemo<SiteContent>(() => {
    if (!rows) return DEFAULTS;
    const get = (key: string) => rows.get(key);
    return {
      about: rows.has("about.copy") ? asAbout(get("about.copy")) : aboutCopy,
      vibecampFaqs: asFaqList(get("faq.vibecamp"), vibecampFaqs),
      prosperaFaqs: asFaqList(get("faq.prospera"), prosperaFaqs),
      hero: mergeContent(heroCopy, get("home.hero")),
      schedule: mergeContent(scheduleCopy, get("home.schedule")),
      stats: mergeContent(statsCopy, get("home.stats")),
      tickets: mergeContent(ticketsCopy, get("home.tickets")),
      whatIsIt: mergeContent(whatIsItCopy, get("home.whatisit")),
      whyProspera: mergeContent(whyProsperaCopy, get("home.whyprospera")),
      friends: mergeContent(friendsCopy, get("home.friends")),
      nav: mergeContent(navCopy, get("site.nav")),
      footer: mergeContent(footerCopy, get("site.footer")),
      meta: mergeContent(metaCopy, get("site.meta")),
    };
  }, [rows]);

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
};

/**
 * Read the merged site content. Outside a provider it returns the code
 * defaults, so a component can never crash for lack of context.
 */
export const useSiteContent = (): SiteContent => useContext(SiteContentContext);
