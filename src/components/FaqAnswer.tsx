/**
 * FaqAnswer — renders an FAQ answer string.
 * Supports newlines (preserved) and inline [label](url) markdown links.
 */
const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;

interface FaqAnswerProps {
  text: string;
  linkClassName?: string;
}

const FaqAnswer = ({ text, linkClassName = "text-bitcoin underline underline-offset-2" }: FaqAnswerProps) => {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  LINK_RE.lastIndex = 0;
  while ((match = LINK_RE.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    nodes.push(
      <a
        key={match.index}
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
      >
        {match[1]}
      </a>,
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));

  return <span className="whitespace-pre-line">{nodes}</span>;
};

export default FaqAnswer;
