"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Carousel_006 } from "@/components/ui/skiper-ui/skiper54";

export interface CarouselPost {
  slug: string;
  title: string;
  image: string;
}

export function BlogCarousel({ posts }: { posts: CarouselPost[] }) {
  const router = useRouter();

  if (posts.length === 0) return null;

  return (
    <div className="relative">
      {/* Carousel_006 renders plain <img> tags with no link affordance and no
          slot for extra attributes, so the click is resolved by matching the
          image's src back to the post it came from. */}
      <div
        onClick={(e) => {
          const img = (e.target as HTMLElement).closest("img");
          if (!img) return;
          const src = img.getAttribute("src");
          const post = posts.find((p) => p.image === src);
          if (post) router.push(`/blog/${post.slug}`);
        }}
        className="cursor-pointer"
      >
        <Carousel_006
          images={posts.map((p) => ({
            src: p.image,
            alt: p.title,
            title: p.title,
          }))}
          autoplay
          loop
          showNavigation
          showPagination
        />
      </div>

      <ul className="sr-only">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link href={`/blog/${p.slug}`}>{p.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
