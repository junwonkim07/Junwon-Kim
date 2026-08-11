import type { Metadata } from "next";
import { BlogCard } from "@/components/site/blog-card";
import { pickImage } from "@/lib/images";
import { formatDate, getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Competitive programming solutions and write-ups.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    // Opaque: the pixel canvas is meant to show behind the home hero only.
    <div className="bg-background mx-auto min-h-screen max-w-6xl px-5 sm:px-8">
      <h1 className="t-display pt-16">Blog.</h1>

      <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <li key={post.slug}>
            <BlogCard
              post={{
                slug: post.slug,
                title: post.title,
                preview: post.preview,
                image: post.image || pickImage(post.slug),
                date: formatDate(post.date),
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
