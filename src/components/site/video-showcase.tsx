"use client";

import {
  VideoPlayer,
  VideoPlayerContent,
  VideoPlayerControlBar,
  VideoPlayerMuteButton,
  VideoPlayerPlayButton,
  VideoPlayerTimeDisplay,
  VideoPlayerTimeRange,
  VideoPlayerVolumeRange,
} from "@/components/ui/skiper-ui/skiper67";

export interface Video {
  src: string;
  poster?: string;
  title?: string;
}

/**
 * Skiper 67, wired and ready. Nothing renders until a video is passed in — the
 * site has no footage yet, so the home page passes an empty list.
 */
export function VideoShowcase({ videos }: { videos: Video[] }) {
  if (videos.length === 0) return null;

  return (
    <div className="grid gap-8 sm:grid-cols-2">
      {videos.map((video) => (
        <figure key={video.src}>
          <VideoPlayer className="overflow-hidden rounded-2xl">
            <VideoPlayerContent
              src={video.src}
              poster={video.poster}
              preload="metadata"
              crossOrigin=""
              slot="media"
            />
            <VideoPlayerControlBar>
              <VideoPlayerPlayButton />
              <VideoPlayerTimeRange />
              <VideoPlayerTimeDisplay showDuration />
              <VideoPlayerMuteButton />
              <VideoPlayerVolumeRange />
            </VideoPlayerControlBar>
          </VideoPlayer>
          {video.title && (
            <figcaption className="mt-3 text-sm opacity-50">
              {video.title}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
