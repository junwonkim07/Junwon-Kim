"use client";

import { HoverExpand_001 } from "@/components/ui/skiper-ui/skiper52";
import type { Project } from "@/types/portfolio";

export function WorkGallery({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;

  const images = projects.map((p) => ({
    src: p.imageSrc,
    alt: p.title,
    code: p.title,
  }));

  return (
    <div className="mt-10">
      <HoverExpand_001 images={images} className="mx-auto px-0" />

      <ul className="mt-8 grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <li key={project.id}>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <h3 className="text-xl font-medium transition-opacity group-hover:opacity-60">
                {project.title}
              </h3>
              <p className="mt-2 text-sm opacity-60">{project.description}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
