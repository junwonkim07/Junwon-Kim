"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/**
 * Lenis is mounted once for the whole app. Skiper 30 instantiates its own Lenis
 * inside the gallery component, which would mean a second RAF loop hijacking
 * scroll on any page that renders more than one scroll-driven section.
 * Respects prefers-reduced-motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ duration: 1.1 });
    let frame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
