import { remark } from "remark";
import html from "remark-html";
import { AboutSection } from "@/components/site/about-section";
import { BlogCarousel } from "@/components/site/blog-carousel";
import { GithubActivity } from "@/components/site/github-activity";
import { Hero } from "@/components/site/hero";
import { ParallaxGallery } from "@/components/site/parallax-gallery";
import { ProjectShowcase } from "@/components/site/project-showcase";
import { ProjectsGrid } from "@/components/site/projects-grid";
import { VideoShowcase } from "@/components/site/video-showcase";
import { WorkGallery } from "@/components/site/work-gallery";
import { pickImage, pickImages } from "@/lib/images";
import { githubUsername, portfolio } from "@/lib/portfolio";
import { getAllPosts } from "@/lib/posts";

function SectionHeading({
  index,
  title,
  subtitle,
}: {
  index: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex items-baseline gap-4">
      <span className="t-meta opacity-30">{index}</span>
      <div>
        <h2 className="t-h2">{title}</h2>
        {subtitle && <p className="t-meta mt-2 opacity-45">{subtitle}</p>}
      </div>
    </div>
  );
}

export default async function Home() {
  const about = (
    await remark().use(html).process(portfolio.aboutpara)
  ).toString();

  const posts = getAllPosts();

  const carouselPosts = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    image: p.image || pickImage(p.slug),
  }));

  const galleryImages = [
    ...posts.map((p) => p.image).filter(Boolean),
    ...pickImages("parallax", 12),
  ].slice(0, 12);

  const showcaseImage = portfolio.projects[0]?.imageSrc || pickImage("showcase");

  return (
    <>
      {/* The hero is the only transparent region, so the site-wide pixel canvas
          reads there and nowhere else. */}
      <Hero />

      <div className="bg-background relative">
        <ParallaxGallery images={galleryImages} />

        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          {portfolio.projects.length > 0 && (
            <section id="work" className="scroll-mt-24 py-24">
              <SectionHeading
                index="01"
                title="Work."
                subtitle="Things I have shipped"
              />
              <WorkGallery projects={portfolio.projects} />
            </section>
          )}

          <section className="pt-24">
            <SectionHeading
              index="02"
              title="Projects."
              subtitle="Side builds and experiments"
            />
          </section>
        </div>

        {/* Full-bleed: the split panels need the whole viewport to fan out. */}
        <ProjectShowcase services={portfolio.services} imageSrc={showcaseImage} />

        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <section className="pb-24">
            <ProjectsGrid services={portfolio.services} />
          </section>

          <section className="py-24">
            <SectionHeading
              index="03"
              title="Activity."
              subtitle="Contributions over the past year"
            />
            <GithubActivity username={githubUsername()} />
          </section>

          {portfolio.showBlog && carouselPosts.length > 0 && (
            <section className="py-24">
              <SectionHeading
                index="04"
                title="Writing."
                subtitle="Competitive programming write-ups"
              />
              <div className="mt-14">
                <BlogCarousel posts={carouselPosts} />
              </div>
            </section>
          )}

          <section className="py-24">
            <SectionHeading index="05" title="About." />
            <div className="mt-10">
              <AboutSection html={about} />
            </div>
          </section>

          {/* Renders nothing until footage exists. */}
          <VideoShowcase videos={[]} />
        </div>
      </div>
    </>
  );
}
