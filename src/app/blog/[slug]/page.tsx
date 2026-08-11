import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/site/markdown";
import { formatDate, getAllPosts, getPostBySlug } from "@/lib/posts";
import { absoluteUrl } from "@/lib/site";
import { portfolio } from "@/lib/portfolio";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.preview,
    openGraph: {
      title: post.title,
      description: post.preview,
      url: absoluteUrl(`/blog/${post.slug}`),
      images: post.image ? [post.image] : undefined,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPost({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: post.image ? [post.image] : undefined,
    datePublished: post.date,
    author: { "@type": "Person", name: portfolio.name },
    description: post.preview,
  };

  return (
    <article className="mx-auto max-w-6xl px-5 sm:px-8">
      {/* JSON.stringify escapes quotes in titles; 3.0 interpolated raw strings
          into the script body and broke on any post with a quote in it. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {post.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.image}
          alt={post.title}
          className="mt-10 h-72 w-full rounded-2xl object-cover sm:h-96"
        />
      )}

      <h1 className="mt-10 text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
        {post.title}
      </h1>
      <p className="mt-3 text-lg opacity-50">{post.tagline}</p>
      <time className="mt-2 block text-xs opacity-40">
        {formatDate(post.date)}
      </time>

      <Markdown content={post.content} />
    </article>
  );
}
