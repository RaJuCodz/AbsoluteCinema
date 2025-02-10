"use client";
import { useParams } from "next/navigation";
import useMovieDetails from "@/hook/useMovieDetails";
import Image from "next/image";
import { Play, Star, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import VideoPlayer from "@/components/VideoPlayer";
import MovieDetailsSkeleton from "@/components/MovieDetailsSkeleton";

const MoviePage = () => {
  const { id } = useParams();
  const { movie, loading, error } = useMovieDetails(id);
  const [isPlaying, setIsPlaying] = useState(false);

  if (loading) {
    return <MovieDetailsSkeleton />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!movie) return null;

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Backdrop */}
      <div className="relative h-[60vh] w-full">
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative -mt-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Poster */}
            <div className="flex-shrink-0">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={300}
                height={450}
                className="rounded-xl shadow-2xl"
              />
            </div>

            {/* Details */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-zinc-100 mb-4">
                {movie.title}
              </h1>

              <div className="flex items-center gap-6 text-zinc-400 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>{movie.vote_average.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{movie.runtime} min</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(movie.release_date).getFullYear()}</span>
                </div>
              </div>

              <p className="text-zinc-300 mb-6">{movie.overview}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-zinc-800 rounded-full text-sm text-zinc-300"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                {movie.trailer && (
                  <Button
                    className="flex items-center gap-2"
                    onClick={() =>
                      window.open(
                        `https://www.youtube.com/watch?v=${movie.trailer.key}`,
                        "_blank"
                      )
                    }
                  >
                    <Play className="w-4 h-4" />
                    Watch Trailer
                  </Button>
                )}

                <Button
                  variant="default"
                  className="flex items-center gap-2"
                  onClick={() => setIsPlaying(true)}
                >
                  <Play className="w-4 h-4" />
                  Watch Now
                </Button>
              </div>

              {/* Cast */}
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-zinc-100 mb-4">
                  Cast
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {movie.credits.cast.slice(0, 6).map((actor) => (
                    <div key={actor.id} className="text-center">
                      <div className="relative w-full aspect-[2/3] mb-2">
                        {actor.profile_path ? (
                          <Image
                            src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                            alt={actor.name}
                            fill
                            className="object-cover rounded"
                          />
                        ) : (
                          <div className="w-full h-full bg-zinc-800 rounded" />
                        )}
                      </div>
                      <div className="text-sm text-zinc-100 font-medium truncate">
                        {actor.name}
                      </div>
                      <div className="text-xs text-zinc-400 truncate">
                        {actor.character}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <VideoPlayer
        isOpen={isPlaying}
        onClose={() => setIsPlaying(false)}
        title={movie.title}
        mediaType="movie"
        tmdbId={movie.id}
      />
    </div>
  );
};

export default MoviePage;
