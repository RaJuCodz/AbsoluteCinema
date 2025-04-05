"use client";
import { useRef, useEffect } from "react";

const VideoBackground = () => {
  const videoRef = useRef(null);

  // Initialize video when component mounts
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 1;
      videoRef.current.muted = false;
    }
  }, []);

  return (
    <div className="absolute inset-0 -z-10">
      <video
        ref={videoRef}
        autoPlay
        muted={false}
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/background-video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/70 via-zinc-900/80 to-zinc-950" />
    </div>
  );
};

export default VideoBackground;
