/**
 * About is a plain reading column again.
 *
 * It briefly held the particle name and the focus ticker; the name now closes
 * the page in the footer and the ticker sits under the hero, where it reads as
 * a subtitle instead of interrupting the prose.
 *
 * bg-background is required, not cosmetic — the site-wide pixel canvas sits at
 * -z-10 and would otherwise show straight through the paragraphs.
 */
export function AboutSection({ html }: { html: string }) {
  return (
    <div className="bg-background">
      <div
        className="t-body-lg space-y-6 opacity-70 [&_strong]:font-semibold [&_strong]:opacity-100"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
