"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Play, Star } from "lucide-react";

const MovieCard = ({ movie, mediaType = "movie" }) => {
  const router = useRouter();

  const handleClick = () => {
    const path = mediaType === "tv" ? "/tv/" : "/movie/";
    router.push(`${path}${movie.id}`);
  };

  return (
    <div className="group relative cursor-pointer" onClick={handleClick}>
      <div className="aspect-[2/3] relative overflow-hidden rounded-lg">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title || movie.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center">
            <Play className="w-6 h-6 text-zinc-900" />
          </div>
        </div>
      </div>

      <div className="mt-2">
        <h3 className="text-zinc-100 font-medium truncate group-hover:text-yellow-500 transition-colors">
          {movie.title || movie.name}
        </h3>
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-500 mr-1" />
            {movie.vote_average?.toFixed(1)}
          </div>
          <span>•</span>
          <span>
            {new Date(movie.release_date || movie.first_air_date).getFullYear()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
