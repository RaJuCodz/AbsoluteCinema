"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const BackgroundSlider = () => {
  const images = [
    "/d.jpg",
    "/e.jpg",
    "/f.jpg",
    "/g.jpg",
    "/h.jpg",
    "/i.jpg",
    "/j.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 -z-10">
      {images.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={image}
            alt="Movie Background"
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/70 via-zinc-900/80 to-zinc-950" />
        </div>
      ))}
    </div>
  );
};

export default BackgroundSlider;
