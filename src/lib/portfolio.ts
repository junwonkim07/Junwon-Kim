import raw from "@/data/portfolio.json";
import type { Portfolio } from "@/types/portfolio";

export const portfolio = raw as Portfolio;

/**
 * The Contact link is derived from the socials list so there is exactly one
 * place to change it. 3.0 hardcoded the template author's address in four
 * separate buttons and they were still live months later.
 */
export function contactHref() {
  return portfolio.socials.find((s) => s.title === "Email")?.link;
}

/** Derived from the Github social link so the handle has a single source. */
export function githubUsername() {
  const link = portfolio.socials.find((s) => s.title === "Github")?.link ?? "";
  return link.replace(/^https?:\/\/(www\.)?github\.com\//, "").replace(/\/$/, "");
}
