/**
 * RichText — renders an editable copy string.
 *
 * Supports (kept intentionally tiny, no markdown dependency):
 *   - newlines, preserved
 *   - [label](url) links, opened in a new tab
 *   - **bold** segments
 *
 * Used by the /about page so text stored in the database (and edited through
 * the content API) can carry light formatting.
 */
const TOKEN_RE = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;

interface RichTextProps {
  text: string;
  linkClassName?: string;
}

const RichText = ({ text, linkClassName = "underline underline-offset-2 text-primary" }: RichTextProps) => {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  TOKEN_RE.lastIndex = 0;
  while ((match = TOKEN_RE.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));

    if (match[3] !== undefined) {
      nodes.push(<strong key={match.index}>{match[3]}</strong>);
    } else {
      nodes.push(
        <a key={match.index} href={match[2]} target="_blank" rel="noopener noreferrer" className={linkClassName}>
          {match[1]}
        </a>,
      );
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));

  return <span className="whitespace-pre-line">{nodes}</span>;
};

export default RichText;
