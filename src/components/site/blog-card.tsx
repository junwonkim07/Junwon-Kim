"use client";

import Link from "next/link";
import { HoverTransition } from "@/components/ui/hover-transition";

export interface BlogCardPost {
  slug: string;
  title: string;
  preview: string;
  image: string;
  date: string;
}

function Face({ post }: { post: BlogCardPost }) {
  return (
    <article className="relative flex h-full flex-col justify-end overflow-hidden">
      {post.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.image}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
      <div className="relative p-5">
        <h3 className="t-h3 text-white">
          {post.title}
        </h3>
        <time className="t-meta mt-2 block text-[0.7rem] text-white/60">
          {post.date}
        </time>
      </div>
    </article>
  );
}

function Reverse({ post }: { post: BlogCardPost }) {
  return (
    <article className="bg-foreground text-background flex h-full flex-col justify-between p-5">
      <p className="t-meta opacity-80">{post.preview}</p>
      <div>
        <p className="font-medium">{post.title}</p>
        <p className="t-eyebrow mt-1 text-[0.7rem] opacity-60">
          Read post →
        </p>
      </div>
    </article>
  );
}

export function BlogCard({ post }: { post: BlogCardPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block">
      <HoverTransition
        effect="morph"
        // morph feeds direction into transformOrigin, and it scales and rotates
        // the whole panel — anchoring to an edge makes it swing in from that
        // side rather than resolve in place.
        direction="center"
        duration={0.72}
        label={`Preview of ${post.title}`}
        defaultComponent={<Face post={post} />}
        hoverComponent={<Reverse post={post} />}
        className="aspect-[4/5] w-full overflow-hidden rounded-2xl"
      />
    </Link>
  );
}
