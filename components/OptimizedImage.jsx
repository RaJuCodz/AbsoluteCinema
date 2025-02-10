"use client";
import Image from "next/image";
import { useState } from "react";

const OptimizedImage = ({ src, alt, ...props }) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <Image
      src={src}
      alt={alt}
      {...props}
      className={`
        ${props.className || ""}
        ${isLoading ? "blur-sm grayscale" : "blur-0 grayscale-0"}
        transition-all duration-300
      `}
      onLoadingComplete={() => setLoading(false)}
      quality={80}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
};

export default OptimizedImage;
