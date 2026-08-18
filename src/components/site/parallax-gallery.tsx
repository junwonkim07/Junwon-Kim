"use client";

import { useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Column } from "@/components/ui/skiper-ui/skiper30";
import { ProgressiveBlur } from "@/components/ui/skiper-ui/skiper41";

/**
 * Skiper 30's multi-speed column parallax.
 *
 * Only `Column` is reused. The `Skiper30` demo around it hardcodes nine image
 * paths, a light-only palette, and its own `new Lenis()` — a second smooth
 * scroll instance fighting the app-wide one in <SmoothScroll />. Columns come
 * from the images passed in instead, and the four scroll speeds are driven from
 * here.
 */
export function ParallaxGallery({ images }: { images: string[] }) {
  const gallery = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    const resize = () => setHeight(window.innerHeight);
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Hooks cannot run in a loop, so the four speeds are explicit. Column's own
  // CSS offsets each of the four positions, so exactly four are rendered.
  const y1 = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);
  const ys = [y1, y2, y3, y4];

  // Deal the pool out round-robin so no column repeats its neighbour.
  const columns = [0, 1, 2, 3].map((c) => {
    const own = images.filter((_, i) => i % 4 === c).slice(0, 3);
    return own.length ? own : images.slice(0, 3);
  });

  return (
    <div
      ref={gallery}
      className="bg-foreground/5 relative box-border flex h-[175vh] gap-[2vw] overflow-hidden p-[2vw]"
    >
      {columns.map((colImages, i) => (
        <Column key={i} images={colImages} y={ys[i]} />
      ))}

      {/* Skiper 41, feathering the gallery into the page above and below. */}
      <ProgressiveBlur
        position="top"
        backgroundColor="var(--background)"
        height="140px"
        blurAmount="5px"
      />
      <ProgressiveBlur
        position="bottom"
        backgroundColor="var(--background)"
        height="140px"
        blurAmount="5px"
      />
    </div>
  );
}
