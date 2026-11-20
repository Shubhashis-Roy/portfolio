/** Tag list; entries in [brackets] render as dashed placeholders. */
export default function Tags({ items, style }: { items: string[]; style?: React.CSSProperties }) {
  return (
    <div className="tags" style={style}>
      {items.map((t) => (
        <span key={t} className={t.startsWith('[') ? 'tag tag-ph' : 'tag'}>{t}</span>
      ))}
    </div>
  );
}
