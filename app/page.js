import React from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import BackgroundSlider from "@/components/BackgroundSlider";

export default function Home() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <BackgroundSlider />
      <div className="text-center space-y-6 px-4 relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-300">
          Welcome to AbsoluteCinema
        </h1>
        <p className="text-xl text-zinc-300 max-w-2xl mx-auto">
          Discover the latest movies and TV shows, all in one place.
        </p>
      </div>
    </div>
  );
}
