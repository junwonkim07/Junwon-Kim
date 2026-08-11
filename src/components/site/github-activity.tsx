"use client";

import { useEffect, useState } from "react";
import { GithubCalendar } from "@/components/ui/github-calendar";

/**
 * Mount-gated: the calendar fetches contribution data on the client, so
 * rendering it during SSR would only produce an empty grid to hydrate over.
 */
export function GithubActivity({ username }: { username: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!username) return null;

  return (
    <div className="mt-10 overflow-x-auto">
      {mounted ? (
        <GithubCalendar
          username={username}
          variant="default"
          shape="rounded"
          colorSchema="green"
          showTotal
        />
      ) : (
        <div className="h-[140px]" />
      )}
    </div>
  );
}
