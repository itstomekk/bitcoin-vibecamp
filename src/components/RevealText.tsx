import { useEffect, useRef, useState } from "react";

type RevealMode = "sentence" | "word" | "character";

interface RevealTextProps {
  text: string;
  mode?: RevealMode;
  speed?: number; // ms per unit
  delay?: number; // ms between units
  className?: string;
  showCursor?: boolean;
  persistKey?: string; // localStorage key for persistence
  threshold?: number; // IntersectionObserver threshold
  onComplete?: () => void;
  registerId?: string;
}

// Global orchestration: blocks reveal sequentially
const revealQueue: {
  id: string;
  start: () => void;
  completed: boolean;
}[] = [];

let activeIndex = 0;

function registerBlock(id: string, start: () => void) {
  const existing = revealQueue.find((b) => b.id === id);
  if (existing) {
    existing.start = start;
    return;
  }
  revealQueue.push({ id, start, completed: false });
}

function markComplete(id: string) {
  const block = revealQueue.find((b) => b.id === id);
  if (block) block.completed = true;
  // Start next unfinished block
  tryStartNext();
}

function tryStartNext() {
  while (activeIndex < revealQueue.length && revealQueue[activeIndex].completed) {
    activeIndex++;
  }
  if (activeIndex < revealQueue.length) {
    revealQueue[activeIndex].start();
  }
}

function isBlockReady(id: string): boolean {
  const idx = revealQueue.findIndex((b) => b.id === id);
  if (idx <= 0) return true;
  return revealQueue[idx - 1]?.completed ?? true;
}

// Reset queue when component tree unmounts (page navigation)
export function resetRevealQueue() {
  revealQueue.length = 0;
  activeIndex = 0;
}

const RevealText = ({
  text,
  mode = "sentence",
  speed = 30,
  delay = 200,
  className = "",
  showCursor = true,
  persistKey,
  threshold = 0.2,
  onComplete,
  registerId,
}: RevealTextProps) => {
  const id = registerId || text.slice(0, 40);
  const storageKey = persistKey || `reveal_${id}`;
  
  const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const alreadyRevealed = typeof window !== "undefined" && localStorage.getItem(storageKey) === "done";

  const [revealed, setRevealed] = useState(prefersReducedMotion || alreadyRevealed);
  const [visibleCount, setVisibleCount] = useState(prefersReducedMotion || alreadyRevealed ? Infinity : 0);
  const [isInView, setIsInView] = useState(false);
  const [started, setStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Split text into units
  const units = splitText(text, mode);
  const totalUnits = units.length;

  // Intersection Observer
  useEffect(() => {
    if (revealed) return;
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [revealed, threshold]);

  // Register in queue
  useEffect(() => {
    if (revealed) {
      registerBlock(id, () => {});
      markComplete(id);
      return;
    }
    registerBlock(id, () => setStarted(true));
    // If this is first or previous completed, try starting
    if (isInView && isBlockReady(id)) {
      tryStartNext();
    }
  }, [revealed, id]);

  // When in view and ready, trigger start
  useEffect(() => {
    if (isInView && !started && !revealed && isBlockReady(id)) {
      tryStartNext();
    }
  }, [isInView, started, revealed, id]);

  // Animate reveal
  useEffect(() => {
    if (!started || revealed) return;
    if (visibleCount >= totalUnits) {
      setRevealed(true);
      localStorage.setItem(storageKey, "done");
      markComplete(id);
      onComplete?.();
      return;
    }
    timerRef.current = setTimeout(() => {
      setVisibleCount((c) => c + 1);
    }, visibleCount === 0 ? speed : delay + speed);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [started, revealed, visibleCount, totalUnits, speed, delay, storageKey, id, onComplete]);

  const isFullyRevealed = revealed || visibleCount >= totalUnits;

  return (
    <div ref={containerRef} className={`${className} relative`} style={{ minHeight: "1em" }}>
      <span>
        {units.map((unit, i) => (
          <span
            key={i}
            className={`transition-opacity duration-300 ${
              isFullyRevealed || i < visibleCount ? "opacity-100" : "opacity-0"
            }`}
          >
            {unit}
          </span>
        ))}
      </span>
      {showCursor && !isFullyRevealed && started && (
        <span className="inline-block w-[2px] h-[1em] bg-current ml-0.5 align-middle animate-cursor-blink" />
      )}
    </div>
  );
};

function splitText(text: string, mode: RevealMode): string[] {
  switch (mode) {
    case "sentence":
      // Split on sentence boundaries, keeping delimiters
      return text.split(/(?<=[.!?])\s+/).filter(Boolean);
    case "word":
      return text.split(/(\s+)/).filter(Boolean);
    case "character":
      return text.split("");
  }
}

export default RevealText;
