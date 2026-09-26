"use client";

import { useEffect, useRef, useState, type VideoHTMLAttributes } from "react";

interface ViewportVideoProps extends Omit<VideoHTMLAttributes<HTMLVideoElement>, "src" | "autoPlay" | "preload"> {
  src: string;
  mobileSrc?: string;
  fit?: "cover" | "contain";
}

const iosFallbacks: Record<string, string> = {
  "/images/projects/car-parts/car-parts-light.webm": "/images/projects/car-parts/car-parts-light-bg.mp4",
  "/images/projects/car-parts/car-parts-dark.webm": "/images/projects/car-parts/car-parts-dark-bg.mp4",
  "/images/projects/kaspi-home/searchbar-light-2.webm": "/images/projects/kaspi-home/searchbar-light-web.mp4",
  "/images/projects/kaspi-home/searchbar-dark.webm": "/images/projects/kaspi-home/searchbar-dark-web.mp4",
  "/images/projects/kaspi-home/carousel-light-square.webm": "/images/projects/kaspi-home/carousel-light-square-web.mp4",
  "/images/projects/kaspi-home/carousel-dark-square.webm": "/images/projects/kaspi-home/carousel-dark-square-web.mp4",
  "/images/projects/kaspi-home/magnum-light-3.webm": "/images/projects/kaspi-home/magnum-light-web.mp4",
  "/images/projects/kaspi-home/magnum-dark-1.webm": "/images/projects/kaspi-home/magnum-dark-web.mp4",
  "/images/projects/kaspi-home/all-page-light.webm": "/images/projects/kaspi-home/all-page-light-web.mp4",
  "/images/projects/kaspi-home/all-page-dark.webm": "/images/projects/kaspi-home/all-page-dark-web.mp4",
  "/images/projects/kaspi-home/system-light-2.webm": "/images/projects/kaspi-home/system-light-web.mp4",
  "/images/projects/kaspi-home/system-dark.webm": "/images/projects/kaspi-home/system-dark-web.mp4",
};

export function ViewportVideo({ src, mobileSrc, fit = "cover", className, poster, onPlaying, ...props }: ViewportVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let loaded = false;
    const load = () => {
      if (loaded) return;
      loaded = true;
      const isIOS = /iPad|iPhone|iPod/.test(window.navigator.userAgent);
      video.src = isIOS ? (mobileSrc ?? iosFallbacks[src] ?? src) : src;
      video.load();
    };

    const loadObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        load();
        loadObserver.disconnect();
      }
    }, { rootMargin: "400px 0px" });

    const playbackObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          load();
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      }
    }, { threshold: 0.05 });

    loadObserver.observe(video);
    playbackObserver.observe(video);

    return () => {
      loadObserver.disconnect();
      playbackObserver.disconnect();
      video.pause();
    };
  }, [mobileSrc, src]);

  const video = (
    <video
      ref={videoRef}
      {...props}
      className="viewport-video-media"
      poster={poster}
      muted
      loop
      autoPlay
      playsInline
      preload="none"
      onPlaying={(event) => {
        setHasStarted(true);
        onPlaying?.(event);
      }}
    />
  );

  return (
    <span className={`viewport-video-shell viewport-video-fit-${fit}${className ? ` ${className}` : ""}${hasStarted ? " is-playing" : ""}`}>
      {poster ? <img className="viewport-video-poster" src={poster} alt="" aria-hidden="true" /> : null}
      {video}
    </span>
  );
}
