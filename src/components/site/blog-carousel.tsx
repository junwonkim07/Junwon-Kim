"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Carousel_005 } from "@/components/ui/skiper-ui/skiper51";

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
      {/* Carousel_005 takes only {src, alt} and renders plain <img> tags with no
          slot for extra attributes, so a click is resolved by matching the
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
        {/* Carousel_005 caps itself at max-w-4xl with its own horizontal
            padding; both are dropped so it fills the section width. */}
        <Carousel_005
          className="max-w-none px-0"
          images={posts.map((p) => ({ src: p.image, alt: p.title }))}
          showPagination
          showNavigation
          loop
          autoplay
        />
      </div>

      {/* The carousel is pointer-driven; these keep every post reachable by
          keyboard and to crawlers. */}
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
