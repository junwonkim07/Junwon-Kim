import type { Metadata } from "next";
import { remark } from "remark";
import html from "remark-html";
import { Reveal } from "@/components/site/reveal";
import { ResumeIntro } from "@/components/site/resume-intro";
import { ProgressiveBlur } from "@/components/ui/skiper-ui/skiper41";
import { portfolio } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Resume",
  description: portfolio.resume.tagline,
};

/**
 * Sidebar label, deliberately not t-h2. This sits in a fixed-width column beside
 * the content, and the display-size h2 (~49px) overran that column and collided
 * with the timeline. It reads as a section heading through weight and the
 * numeral, not through size.
 */
function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex min-w-0 items-baseline gap-3 lg:sticky lg:top-28">
      <span className="t-meta opacity-30">{index}</span>
      <h2 className="t-h3">{title}</h2>
    </div>
  );
}

export default async function ResumePage() {
  const { resume, name } = portfolio;
  const description = (
    await remark().use(html).process(resume.description)
  ).toString();

  return (
    <div className="bg-background relative">
      <ResumeIntro
        name={name}
        tagline={resume.tagline}
        descriptionHtml={description}
      />

      {/*
        Edge fade, anchored to the body column rather than the viewport.

        These were fixed bands before, pinned under the header and at the bottom
        of the screen. A viewport-fixed band sits over whatever happens to be
        scrolled beneath it, so it permanently blurred whichever heading or date
        line landed there — the section title was unreadable.

        ProgressiveBlur is absolute internally, so placing it inside this
        relative column puts it on the column's own top and bottom edges: the
        content dissolves where it begins and ends, and the middle stays sharp.
      */}
      <div className="relative mx-auto max-w-5xl px-5 pb-32 sm:px-8">
        <ProgressiveBlur
          position="top"
          backgroundColor="var(--background)"
          height="72px"
          blurAmount="3px"
        />
        <ProgressiveBlur
          position="bottom"
          backgroundColor="var(--background)"
          height="72px"
          blurAmount="3px"
        />
        <section className="grid gap-10 py-28 lg:grid-cols-[200px_minmax(0,1fr)]">
          <SectionLabel index="01" title="Experience" />

          <ol className="border-foreground/10 relative space-y-12 border-l pl-8">
            {resume.experiences.map((exp, i) => (
              <Reveal key={exp.id} delay={i * 0.04}>
                <li className="relative">
                  <span className="bg-foreground/20 absolute top-2 -left-[41px] size-2 rounded-full ring-4 ring-[var(--background)]" />
                  <p className="t-meta opacity-45">
                    {exp.dates} · {exp.type}
                  </p>
                  <h3 className="t-h3 mt-2">
                    {exp.position}
                  </h3>
                  {exp.bullets.length > 0 && (
                    <ul className="mt-3 space-y-1.5">
                      {exp.bullets.map((bullet, j) => (
                        <li
                          key={j}
                          className="text-sm leading-relaxed opacity-60 before:mr-3 before:opacity-40 before:content-['—']"
                        >
                          {bullet.trim()}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              </Reveal>
            ))}
          </ol>
        </section>

        <section className="grid gap-10 py-28 lg:grid-cols-[200px_minmax(0,1fr)]">
          <SectionLabel index="02" title="Education" />
          <ol className="space-y-8">
            {resume.education.map((school, i) => (
              <Reveal key={school.id} delay={i * 0.05}>
                <li className="border-foreground/10 border-b pb-6">
                  <h3 className="t-h3">{school.name}</h3>
                  <p className="t-meta mt-1 opacity-45">
                    {school.dates}
                  </p>
                  {school.note && (
                    <p className="mt-2 text-sm opacity-60">{school.note}</p>
                  )}
                </li>
              </Reveal>
            ))}
          </ol>
        </section>

        {/*
          Was a "Skills" grid of Languages / Frameworks / Awards cards. The
          language and framework lists are gone: they restated what the
          experience entries already show, at less resolution. What remains is
          the awards and certifications, so the section is named for that and
          renders as a plain list like Education rather than a lone card.
        */}
        {resume.others.length > 0 && (
          <section className="grid gap-10 py-28 lg:grid-cols-[200px_minmax(0,1fr)]">
            <SectionLabel index="03" title="Awards" />
            <ol className="space-y-6">
              {resume.others.map((item, i) => {
                // Entries read "Title (Date)". Splitting the trailing
                // parenthetical off gives the same title/date pairing the
                // education and experience entries use.
                const match = item.match(/^(.*?)\s*\(([^()]*\d{4}[^()]*)\)\s*$/);
                const title = match ? match[1] : item;
                const when = match ? match[2] : null;

                return (
                  <Reveal key={item} delay={i * 0.05}>
                    <li className="border-foreground/10 border-b pb-5">
                      <p className="t-h3">{title}</p>
                      {when && <p className="t-meta mt-1 opacity-45">{when}</p>}
                    </li>
                  </Reveal>
                );
              })}
            </ol>
          </section>
        )}
      </div>
    </div>
  );
}
