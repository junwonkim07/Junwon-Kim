/**
 * Matches the project cards: plain bordered box, no spotlight and no pixel field.
 */
export function SkillCard({
  label,
  items,
  /** Long entries (awards, certifications) need the full row to avoid ragged wraps. */
  wide = false,
}: {
  label: string;
  items: string[];
  wide?: boolean;
}) {
  return (
    <div
      className={`border-foreground/10 hover:border-foreground/30 bg-background h-full rounded-2xl border p-6 transition-colors ${
        wide ? "sm:col-span-2" : ""
      }`}
    >
      <h3 className="t-eyebrow opacity-45">{label}</h3>
      <ul className={wide ? "mt-5 grid gap-2 sm:grid-cols-2" : "mt-5 space-y-2"}>
        {items.map((item, i) => (
          <li key={i} className="t-meta flex gap-3 opacity-80">
            <span
              aria-hidden
              className="bg-foreground/30 mt-2 size-1 shrink-0 rounded-full"
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
