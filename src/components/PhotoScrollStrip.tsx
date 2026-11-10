import { useEffect, useRef, useState } from "react";

interface PhotoScrollStripProps {
  photos: { src: string; alt: string }[];
}

/**
 * PhotoScrollStrip — full-width horizontal photo row that shifts on scroll,
 * matching the parallax feel of ScrollingHeader banners.
 */
const PhotoScrollStrip = ({ photos }: PhotoScrollStripProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const viewH = window.innerHeight;
      const progress = 1 - rect.top / viewH;
      setOffset(-progress * 250);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Duplicate for seamless-looking strip
  const items = [...photos, ...photos];

  return (
    <div ref={ref} className="w-full overflow-hidden py-2 select-none pointer-events-none">
      <div
        className="flex gap-2 transition-transform duration-100 ease-linear"
        style={{ transform: `translateX(${offset}px)`, width: "max-content" }}
      >
        {items.map((p, i) => (
          <img
            key={i}
            src={p.src}
            alt={p.alt}
            loading="lazy"
            className="h-32 md:h-48 w-auto object-cover grayscale-[10%]"
          />
        ))}
      </div>
    </div>
  );
};

export default PhotoScrollStrip;
