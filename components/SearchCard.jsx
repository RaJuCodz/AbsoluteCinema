"use client";
import Image from "next/image";
import { Play, Star } from "lucide-react";

const SearchCard = ({ item, onClick }) => {
  return (
    <div
      className="flex gap-4 p-3 rounded-lg hover:bg-zinc-800/50 transition-colors cursor-pointer"
      onClick={onClick}
    >
      {/* Poster */}
      <div className="relative w-16 h-24 flex-shrink-0 rounded-md overflow-hidden">
        <Image
          src={`https://image.tmdb.org/t/p/w154${item.poster_path}`}
          alt={item.title || item.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-zinc-100 truncate">
          {item.title || item.name}
        </h3>
        <div className="flex items-center gap-2 mt-1 text-xs text-zinc-400">
          <div className="flex items-center">
            <Star className="w-3 h-3 text-yellow-500 mr-1" />
            {item.vote_average?.toFixed(1)}
          </div>
          <span>•</span>
          <span>
            {new Date(item.release_date || item.first_air_date).getFullYear()}
          </span>
        </div>
        <p className="text-xs text-zinc-500 mt-2 line-clamp-2">
          {item.overview}
        </p>
      </div>
    </div>
  );
};

export default SearchCard;
