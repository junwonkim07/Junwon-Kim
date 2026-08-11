import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "_posts");

export interface Post {
  slug: string;
  title: string;
  tagline: string;
  preview: string;
  image: string;
  date: string;
  content: string;
}

function readPost(fileName: string): Post {
  const slug = fileName.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(postsDirectory, fileName), "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    tagline: data.tagline ?? "",
    preview: data.preview ?? "",
    image: data.image ?? "",
    // gray-matter turns unquoted YAML dates into Date objects, so normalise.
    date: data.date instanceof Date ? data.date.toISOString() : String(data.date ?? ""),
    content,
  };
}

export function getAllPosts(): Post[] {
  return fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith(".md"))
    .map(readPost)
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPostBySlug(slug: string): Post | undefined {
  const file = `${slug}.md`;
  if (!fs.existsSync(path.join(postsDirectory, file))) return undefined;
  return readPost(file);
}

export function formatDate(iso: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
