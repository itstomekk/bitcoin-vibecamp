import RevealText from "./RevealText";
import SectionLabel from "./SectionLabel";
import PhotoScrollStrip from "./PhotoScrollStrip";
import { useSiteContent } from "@/hooks/useSiteContent";
import vibe8 from "@/assets/vibe-photos/vibe-8.png.asset.json";
import vibe9 from "@/assets/vibe-photos/vibe-9.png.asset.json";
import vibe10 from "@/assets/vibe-photos/vibe-10.png.asset.json";
import vibe11 from "@/assets/vibe-photos/vibe-11.png.asset.json";
import vibe12 from "@/assets/vibe-photos/vibe-12.png.asset.json";
import vibe13 from "@/assets/vibe-photos/vibe-13.png.asset.json";
import vibe14 from "@/assets/vibe-photos/vibe-14.png.asset.json";

/**
 * "What is Vibecamp" section — explains the hackathon format.
 * Feature pills on the right highlight key aspects.
 * Subtle photo strip below shows past event vibes.
 *
 * Copy comes from the `home.whatisit` content block (src/data/whatisit.ts
 * default). The photos stay here because they are imported assets.
 */
/** Bundled fallback photos, used when `home.whatisit.photos` is empty. */
const defaultPhotos = [
  { src: vibe8.url, alt: "Beach bar hangout" },
  { src: vibe9.url, alt: "Talk at Bitcoin center" },
  { src: vibe10.url, alt: "Coworking on beanbags" },
  { src: vibe11.url, alt: "Evening presentation" },
  { src: vibe12.url, alt: "Chess on the terrace" },
  { src: vibe13.url, alt: "Workshop with mural" },
  { src: vibe14.url, alt: "Nostr talk" },
];

const WhatIsIt = () => {
  const { whatIsIt: c } = useSiteContent();
  const photos = c.photos.length > 0 ? c.photos : defaultPhotos;

  return (
    <section id="what" className="py-24 relative">
      {/* Vertical teaser label */}
      <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-12">
        <div className="sticky top-1/2 -translate-y-1/2">
          <span className="block text-xs font-mono tracking-[0.3em] uppercase text-vibe/40 whitespace-nowrap" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
            {c.verticalLabel}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <SectionLabel>{c.sectionLabel}</SectionLabel>
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left: heading + body */}
          <div className="lg:col-span-7">
            <h2 className="text-4xl md:text-5xl mb-[10%] tracking-wide leading-tight lowercase -ml-1" style={{ transform: "skewY(-4deg)" }}>
              {c.headingLine1}{" "}<br />
              <span className="gradient-text">{c.headingLine2}</span>
            </h2>
            <div className="space-y-6 text-foreground leading-relaxed text-sm max-w-2xl font-body">
              <RevealText
                text={c.body}
                mode="sentence"
                speed={15}
                persistKey="what_p1_v2"
                className="font-body"
              />
            </div>
          </div>

          {/* Right: feature pills */}
          <div className="lg:col-span-5 space-y-3">
            {c.facts.map((f) => (
              <div key={f.title} className="border border-border bg-card p-5 hover:border-vibe/40 transition-colors group breathe-hover">
                <div className="flex items-start gap-4">
                  <span className="text-2xl">{f.emoji}</span>
                  <div>
                    <p className="font-bold text-foreground mb-1">{f.title}</p>
                    <p className="text-sm text-foreground font-body">
                      {f.desc}
                      {f.links && (
                        <>
                          {" "}
                          {f.links.map((l, i) => (
                            <span key={l.url}>
                              <a href={l.url} target="_blank" rel="noopener noreferrer" className="text-bitcoin underline hover:opacity-80">
                                {l.label}
                              </a>
                              {i < f.links!.length - 1 ? " · " : ""}
                            </span>
                          ))}
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full-width photo strip with parallax scroll effect */}
      <div className="mt-16">
        <PhotoScrollStrip photos={photos} />
      </div>
    </section>
  );
};

export default WhatIsIt;
