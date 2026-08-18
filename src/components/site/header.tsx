"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { TextRoll } from "@/components/ui/skiper-ui/skiper58";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { scrollToHash } from "@/components/site/smooth-scroll";
import { contactHref, portfolio } from "@/lib/portfolio";

const links = [
  { label: "Work", href: "/#work", show: true },
  { label: "Blog", href: "/blog", show: portfolio.showBlog },
  { label: "Resume", href: "/resume", show: portfolio.showResume },
].filter((l) => l.show);

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const contact = contactHref();

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-foreground/10 bg-background/70 border-b backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 sm:px-8">
        {/* leading-none on the wrapper would re-crop what TextRoll just fixed;
            the roll needs the full line box to translate against. */}
        <Link href="/" className="shrink-0 text-base font-semibold sm:text-lg">
          <TextRoll>{`${portfolio.name}.`}</TextRoll>
        </Link>

        <div className="flex items-center gap-5 sm:gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              // Hash links jump instantly, and on this site they also fight
              // Lenis, which owns scrolling. When the target is already on the
              // current page, animate to it instead. From another page the
              // click falls through to a normal navigation.
              onClick={(e) => {
                const [path, hash] = link.href.split("#");
                if (!hash) return;
                const samePage = pathname === (path || "/");
                if (samePage && scrollToHash(`#${hash}`)) {
                  e.preventDefault();
                }
              }}
              className="text-sm font-medium tracking-tight"
            >
              <TextRoll>{link.label}</TextRoll>
            </Link>
          ))}

          {contact && (
            <Button asChild variant="outline" size="sm" className="rounded-full">
              <a href={contact}>Contact</a>
            </Button>
          )}

          {mounted && portfolio.darkMode && <ThemeToggle />}
        </div>
      </nav>
    </header>
  );
}
