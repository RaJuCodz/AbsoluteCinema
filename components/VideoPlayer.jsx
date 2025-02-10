"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

const VideoPlayer = ({
  isOpen,
  onClose,
  title,
  mediaType,
  tmdbId,
  season,
  episode,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  // Generate the correct vidsrc URL based on media type and parameters
  const getVideoUrl = () => {
    if (mediaType === "tv" && season && episode) {
      return `https://vidsrc.xyz/embed/tv/${tmdbId}/${season}-${episode}`;
    } else if (mediaType === "tv") {
      return `https://vidsrc.xyz/embed/tv/${tmdbId}`;
    } else {
      return `https://vidsrc.xyz/embed/movie/${tmdbId}`;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
      <div className="relative w-full max-w-7xl mx-4">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-zinc-400 hover:text-zinc-100 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="relative pt-[56.25%]">
          <iframe
            src={getVideoUrl()}
            className="absolute inset-0 w-full h-full rounded-lg"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>

        <div className="mt-4 text-center text-zinc-100 text-lg font-medium">
          {title}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
