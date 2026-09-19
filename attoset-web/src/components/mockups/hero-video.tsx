"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";

// Cell edit through the Insights panel, then the Atto conversation.
const clips = ["/videos/hero-cell-v2.mp4", "/videos/hero-atto.mp4"];

const poster = "/images/app-shipments-v3.webp";

/** Tightens up the typing and the pauses between actions in the recordings. */
const SPEED = 1.6;

/**
 * Plays the product-demo clips back to back, looping the sequence.
 * Autoplay requires muted + playsInline across browsers/iOS. Falls back to
 * the still frame when the visitor prefers reduced motion.
 */
export function HeroVideo() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // The element is server-rendered, so `loadedmetadata` can fire before React
  // attaches handlers — set the rate imperatively once each clip is mounted.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = SPEED;
    video.play().catch(() => {});
  }, [index]);

  if (reduce) {
    return (
      <Image
        src={poster}
        alt="An Attoset workspace — a shipments grid beside live insight charts"
        width={3840}
        height={2160}
        quality={90}
        priority
        sizes="(min-width: 1280px) 1024px, (min-width: 1024px) 896px, (min-width: 640px) 768px, 100vw"
        className="absolute inset-0 h-full w-full object-cover"
      />
    );
  }

  return (
    <video
      key={clips[index]}
      ref={videoRef}
      src={clips[index]}
      poster={poster}
      autoPlay
      muted
      playsInline
      preload="auto"
      onLoadedMetadata={(e) => {
        e.currentTarget.playbackRate = SPEED;
      }}
      onEnded={() => setIndex((i) => (i + 1) % clips.length)}
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}
