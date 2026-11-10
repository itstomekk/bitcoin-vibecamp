import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import SectionLabel from "./SectionLabel";
import FaqAnswer from "./FaqAnswer";
import { type FaqItem } from "@/data/faq";
import { useSiteContent } from "@/hooks/useSiteContent";

/**
 * FAQ — landing page teaser version.
 * Shows only the first 4 questions of each block; everything else lives on
 * the calm /about explainer page. Copy comes from useSiteContent() (database,
 * editable through the content API) with src/data/faq.ts as the fallback.
 */
const FAQ = () => {
  const { vibecampFaqs, prosperaFaqs } = useSiteContent();

  const renderAccordion = (items: FaqItem[], prefix: string) => (
    <Accordion type="single" collapsible className="space-y-2">
      {items.map((f, i) => (
        <AccordionItem key={`${prefix}-${i}`} value={`${prefix}-${i}`} className="border border-white/20 bg-white/5 backdrop-blur-sm px-5">
          <AccordionTrigger className="font-bold text-left text-white hover:no-underline py-4 text-sm">
            {f.q}
          </AccordionTrigger>
          <AccordionContent className="text-white leading-relaxed pb-4 text-sm font-body">
            <FaqAnswer text={f.a} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );

  /** Single explainer link, shown once under the second FAQ block. */
  const explainerButton = (
    <div className="mt-6">
      <p className="font-mono text-xs uppercase tracking-widest text-white mb-3">For more, go to explainer</p>
      <Link
        to="/about"
        className="inline-block border-2 border-bitcoin bg-bitcoin/10 px-6 py-3 font-mono text-xs uppercase tracking-widest text-white hover:bg-bitcoin hover:text-[#041c2e] transition-colors"
      >
        Go to explainer →
      </Link>
    </div>
  );

  return (
    <section id="faq" className="py-24 relative overflow-hidden" style={{
      background: "linear-gradient(180deg, hsl(195, 70%, 55%) 0%, hsl(200, 75%, 40%) 30%, hsl(205, 80%, 28%) 60%, hsl(210, 85%, 18%) 100%)"
    }}>
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <SectionLabel><span className="text-white">FAQ</span></SectionLabel>
        <h2 className="text-4xl md:text-5xl tracking-wide mb-16 lowercase text-white -ml-1" style={{ transform: "skewY(-4deg)" }}>common questions 🤔</h2>

        <h3 className="text-2xl font-bold mb-4 font-display lowercase text-white" style={{ transform: "skewY(-2deg)" }}>about vibecamp</h3>
        {renderAccordion(vibecampFaqs.slice(0, 4), "vc")}

        <h3 className="text-2xl font-bold mb-4 mt-16 font-display lowercase text-white" style={{ transform: "skewY(-2deg)" }}>about próspera & roatán</h3>
        {renderAccordion(prosperaFaqs.slice(0, 4), "pr")}
        {explainerButton}


        <p className="text-center text-xs text-white font-mono mt-10">
          Questions? Email{" "}
          <a href="mailto:vibecamp@thebitcoindistrict.com" className="text-bitcoin hover:underline">
            vibecamp@thebitcoindistrict.com
          </a>
        </p>
      </div>

      {/* Palm trees growing from the bottom */}
      <div className="absolute bottom-0 left-0 right-0 text-6xl sm:text-8xl flex justify-around pointer-events-none opacity-40 leading-none" style={{ transform: "translateY(10%)" }}>
        <span>🌴</span>
        <span className="hidden sm:block">🌴</span>
        <span>🌴</span>
        <span className="hidden md:block">🌴</span>
        <span>🌴</span>
      </div>
    </section>
  );
};

export default FAQ;
