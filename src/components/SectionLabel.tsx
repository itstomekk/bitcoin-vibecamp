interface SectionLabelProps {
  children: React.ReactNode;
}

const SectionLabel = ({ children }: SectionLabelProps) => (
  <p className="section-label flex items-center gap-1">
    <span className="text-vibe animate-cursor-blink font-bold">{">_"}</span>
    <span>{children}</span>
  </p>
);

export default SectionLabel;
