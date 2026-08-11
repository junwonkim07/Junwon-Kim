"use client";

import { LayeredStack } from "@/components/ui/layered-stack";
import type { Project } from "@/types/portfolio";

/**
 * Work images sit in a LayeredStack: the cards pile up by default and spring
 * apart on pointer interaction. Each card is one project, so the stack is as
 * deep as portfolio.json's projects list.
 */
export function WorkGallery({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;

  return (
    <div className="mt-12">
      <LayeredStack className="mx-auto flex min-h-[26rem] items-center justify-center">
        {projects.map((project) => (
          <a
            key={project.id}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="border-foreground/10 bg-background block w-[18rem] overflow-hidden rounded-2xl border sm:w-[22rem]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.imageSrc}
              alt={project.title}
              className="h-56 w-full object-cover sm:h-64"
              draggable={false}
            />
            <div className="p-4">
              <h3 className="t-h3">{project.title}</h3>
              <p className="t-meta mt-1 opacity-55">{project.description}</p>
            </div>
          </a>
        ))}
      </LayeredStack>

      <ul className="mt-10 grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <li key={project.id}>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <h3 className="t-h3 transition-opacity group-hover:opacity-60">
                {project.title}
              </h3>
              <p className="t-meta mt-2 opacity-60">{project.description}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
