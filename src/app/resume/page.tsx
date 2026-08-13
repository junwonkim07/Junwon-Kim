import type { Metadata } from "next";
import { remark } from "remark";
import html from "remark-html";
import { Reveal } from "@/components/site/reveal";
import { ResumeIntro } from "@/components/site/resume-intro";
import { SkillCard } from "@/components/site/skill-card";
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

  const skillGroups = [
    { label: "Languages", items: resume.languages, wide: false },
    { label: "Frameworks", items: resume.frameworks, wide: false },
    // Award and certification names run long; a half-width card wrapped them
    // mid-title, so this one takes the full row and lays out in two columns.
    { label: "Awards & Certifications", items: resume.others, wide: true },
  ].filter((g) => g.items?.length);

  return (
    <div className="bg-background relative">
      <ResumeIntro
        name={name}
        tagline={resume.tagline}
        descriptionHtml={description}
      />

      <div className="mx-auto max-w-5xl px-5 sm:px-8">
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

        <section className="grid gap-10 py-28 lg:grid-cols-[200px_minmax(0,1fr)]">
          <SectionLabel index="03" title="Skills" />
          <div className="grid gap-4 sm:grid-cols-2">
            {skillGroups.map((group, i) => (
              // The column span belongs on this wrapper: Reveal is the grid
              // item, so a span set on SkillCard inside it did nothing.
              <Reveal
                key={group.label}
                delay={i * 0.05}
                className={group.wide ? "sm:col-span-2" : ""}
              >
                <SkillCard
                  label={group.label}
                  items={group.items}
                  wide={group.wide}
                />
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
