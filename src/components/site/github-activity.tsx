"use client";

import { useEffect, useState } from "react";
import { GithubCalendar } from "@/components/ui/github-calendar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

/**
 * Mount-gated: the calendar fetches contribution data on the client, so
 * rendering it during SSR would only produce an empty grid to hydrate over.
 *
 * The grid is 53 fixed-ratio columns and overflows below roughly 700px. A raw
 * overflow-x-auto leaves a native scrollbar sitting under it on every platform
 * that shows one; ScrollArea — the component Skiper 87 demonstrates — gives it
 * an overlay bar that only appears while scrolling.
 */
export function GithubActivity({ username }: { username: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!username) return null;

  return (
    <div className="mt-10">
      {mounted ? (
        <ScrollArea className="w-full">
          <div className="min-w-[640px]">
            <GithubCalendar
              username={username}
              variant="default"
              shape="rounded"
              colorSchema="green"
              showTotal
            />
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      ) : (
        <div className="h-[140px]" />
      )}
    </div>
  );
}
