// Required by output: "export" — metadata routes are dynamic by default and
// cannot be emitted as files without this.
export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { absoluteUrl } from "@/lib/site";

// Replaces the 3.0 postbuild script, which globbed pages/*.js and so listed the
// dev-only /edit route that robots.txt simultaneously disallowed.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/blog", "/resume"].map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "/" ? 1 : 0.8,
  }));

  const posts = getAllPosts().map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.date),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...posts];
}
