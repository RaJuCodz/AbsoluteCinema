import React from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import VideoBackground from "@/components/VideoBackground";
import { Github } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center">
      <VideoBackground />
      <div className="text-center space-y-6 px-4 relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-300">
          Welcome to AbsoluteCinema
        </h1>
        <p className="text-xl text-zinc-300 max-w-2xl mx-auto">
          Discover the latest movies and TV shows, all in one place.
        </p>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 text-center z-10">
        <div className="flex flex-col items-center gap-2">
          <p className="text-zinc-400">
            Created with ❤️ by{" "}
            <a
              href="https://github.com/RajuCodz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-500 hover:text-yellow-400 transition-colors font-medium"
            >
              RajuCodz
            </a>
          </p>
          <a
            href="https://github.com/RajuCodz"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-zinc-400 hover:text-yellow-500 transition-colors"
          >
            <Github className="w-5 h-5" />
            <span className="text-sm">View on GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
}
