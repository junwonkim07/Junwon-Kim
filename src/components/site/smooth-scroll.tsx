"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/**
 * Lenis is mounted once for the whole app. Skiper 30 instantiates its own Lenis
 * inside the gallery component, which would mean a second RAF loop hijacking
 * scroll on any page that renders more than one scroll-driven section.
 * Respects prefers-reduced-motion.
 */
let instance: Lenis | null = null;

/**
 * The live Lenis instance, or null when smooth scrolling is off (reduced
 * motion, or before mount). Anchor links need it: Lenis drives scrolling
 * itself, so a plain hash jump fights it instead of animating.
 */
export function getLenis() {
  return instance;
}

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ duration: 1.1 });
    instance = lenis;
    let frame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      instance = null;
    };
  }, []);

  return null;
}

/**
 * Scrolls to an in-page target, animating through Lenis when it is running and
 * falling back to the platform's own smooth scroll when it is not.
 * Returns false when the target does not exist, so callers can let the
 * click through as a normal navigation.
 */
// -96 matches the scroll-mt-24 on the anchored sections. Lenis positions by
// its own offset and ignores scroll-margin, and -64 (the bare header height)
// left the heading tucked 5px under the 69px header.
export function scrollToHash(hash: string, offset = -96) {
  const el = document.querySelector(hash);
  if (!el) return false;

  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(el as HTMLElement, { offset });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
  return true;
}
