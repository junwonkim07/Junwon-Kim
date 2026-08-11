"use client";

import { useTheme } from "next-themes";
import { ScrollSplitCard } from "@/components/ui/scroll-split-card";
import { accentsFor } from "@/lib/theme";
import type { Service } from "@/types/portfolio";

function stripUrl(description: string) {
  return description.replace(/\((https?:\/\/[^\s)]+)\)\s*$/, "").trim();
}

/**
 * ScrollSplitCard slices one image into three panels that separate and flip to
 * reveal three cards, over a 500vh scroll. It takes exactly three (`slice(0,3)`
 * upstream), so this is a featured cut — the full list stays in the grid below.
 */
export function ProjectShowcase({
  services,
  imageSrc,
}: {
  services: Service[];
  imageSrc: string;
}) {
  const { resolvedTheme } = useTheme();
  const accents = accentsFor(resolvedTheme);
  const featured = services.slice(0, 3);

  if (featured.length < 3) return null;

  return (
    <ScrollSplitCard
      imageSrc={imageSrc}
      cards={featured.map((service, i) => ({
        title: service.title,
        description: stripUrl(service.description),
        bgColor: accents[i % accents.length],
        textColor: "#0a0a0a",
      }))}
    />
  );
}
