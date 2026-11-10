import { useEffect, useRef, useState } from "react";

interface ScrollingHeaderProps {
  text: string;
  direction?: "left" | "right";
  bgColor?: string;
  textColor?: string;
}

const ScrollingHeader = ({ text, direction = "left", bgColor, textColor }: ScrollingHeaderProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const viewH = window.innerHeight;
      const progress = 1 - rect.top / viewH;
      const move = progress * 300;
      setOffset(direction === "left" ? -move : move);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [direction]);

  return (
    <div
      ref={ref}
      className={`overflow-hidden py-4 md:py-8 select-none pointer-events-none ${bgColor || ""}`}
    >
      <div
        className={`whitespace-nowrap font-display font-bold text-[80px] sm:text-[120px] md:text-[180px] lg:text-[220px] leading-none uppercase tracking-[0.15em] transition-transform duration-100 ease-linear ${textColor || "text-foreground/[0.04]"}`}
        style={{ transform: `translateX(${offset}px)` }}
      >
        {text} · {text} · {text}
      </div>
    </div>
  );
};

export default ScrollingHeader;
