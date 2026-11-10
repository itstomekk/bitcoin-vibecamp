/**
 * Regenerates server/content-defaults.json from the code defaults
 * in src/data/*.ts, so the content API's `GET ?schema=1` can report the exact
 * current default for every editable key (edge functions can't import src/).
 *
 * Run with:  bun run scripts/generate-content-defaults.ts
 */
import { writeFileSync } from "node:fs";
import { aboutCopy } from "../src/data/about";
import { prosperaFaqs, vibecampFaqs } from "../src/data/faq";
import { heroCopy } from "../src/data/hero";
import { scheduleCopy } from "../src/data/schedule";
import { statsCopy } from "../src/data/stats";
import { ticketsCopy } from "../src/data/tickets";
import { whatIsItCopy } from "../src/data/whatisit";
import { whyProsperaCopy } from "../src/data/whyprospera";
import { friendsCopy } from "../src/data/friends";
import { navCopy } from "../src/data/nav";
import { footerCopy } from "../src/data/footer";
import { metaCopy } from "../src/data/meta";

const defaults = {
  "about.copy": aboutCopy,
  "faq.vibecamp": vibecampFaqs,
  "faq.prospera": prosperaFaqs,
  "home.hero": heroCopy,
  "home.schedule": scheduleCopy,
  "home.stats": statsCopy,
  "home.tickets": ticketsCopy,
  "home.whatisit": whatIsItCopy,
  "home.whyprospera": whyProsperaCopy,
  "home.friends": friendsCopy,
  "site.nav": navCopy,
  "site.footer": footerCopy,
  "site.meta": metaCopy,
};

writeFileSync(
  new URL("../server/content-defaults.json", import.meta.url),
  JSON.stringify(defaults, null, 2) + "\n",
);
console.log("wrote server/content-defaults.json");
