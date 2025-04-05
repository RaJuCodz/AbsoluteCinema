"use client";
import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

const VideoBackground = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const videoRef = useRef(null);

  // Handle client-side only rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleMute = () => {
    if (videoRef.current && isClient) {
      const newMutedState = !isMuted;
      setIsMuted(newMutedState);
      videoRef.current.muted = newMutedState;
    }
  };

  if (!isClient) {
    return (
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/70 via-zinc-900/80 to-zinc-950" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 -z-10">
      <video
        ref={videoRef}
        autoPlay
        muted={isMuted}
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/background-video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/70 via-zinc-900/80 to-zinc-950" />

      {/* Mute Toggle Button */}
      <div className="absolute bottom-8 right-8">
        <button
          onClick={toggleMute}
          className="bg-zinc-900/80 backdrop-blur-sm p-2 rounded-lg text-zinc-100 hover:text-yellow-500 transition-colors"
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5" />
          ) : (
            <Volume2 className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default VideoBackground;
