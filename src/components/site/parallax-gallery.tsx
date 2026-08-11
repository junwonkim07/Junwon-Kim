"use client";

import { motion, type MotionValue, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ProgressiveBlur } from "@/components/ui/skiper-ui/skiper41";

/**
 * Skiper 30's multi-speed column parallax, rebuilt so the columns are derived
 * from the images passed in. Upstream hardcodes 13 demo paths, four columns and
 * per-column nth-child offsets, and spins up its own Lenis instance — smooth
 * scrolling is handled globally by <SmoothScroll /> instead.
 */
function Column({
  images,
  y,
  offset,
}: {
  images: string[];
  y: MotionValue<number>;
  offset: string;
}) {
  return (
    <motion.div
      style={{ y, top: offset }}
      className="relative flex h-full w-1/2 min-w-[220px] flex-col gap-[2vw] sm:w-1/3 lg:w-1/4"
    >
      {images.map((src, i) => (
        <div
          key={`${src}-${i}`}
          className="relative h-full w-full overflow-hidden rounded-2xl"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt=""
            aria-hidden
            className="pointer-events-none h-full w-full object-cover"
          />
        </div>
      ))}
    </motion.div>
  );
}

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

  const speeds = [2, 3.3, 1.25, 3];
  // Hooks cannot be called in a loop body, so the four transforms are explicit.
  const y1 = useTransform(scrollYProgress, [0, 1], [0, height * speeds[0]]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * speeds[1]]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * speeds[2]]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * speeds[3]]);
  const ys = [y1, y2, y3, y4];
  const offsets = ["-45%", "-95%", "-45%", "-75%"];

  // Deal out the pool round-robin so each column gets a different sequence.
  const columns = [0, 1, 2, 3].map((c) =>
    images.filter((_, i) => i % 4 === c).slice(0, 3),
  );

  return (
    <div
      ref={gallery}
      className="bg-foreground/5 relative box-border flex h-[175vh] gap-[2vw] overflow-hidden p-[2vw]"
    >
      {columns.map((colImages, i) => (
        <Column
          key={i}
          images={colImages.length ? colImages : images.slice(0, 3)}
          y={ys[i]}
          offset={offsets[i]}
        />
      ))}

      {/* Skiper 41, used as decoration where it cannot interfere with reading:
          it feathers the gallery into the page above and below. */}
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
