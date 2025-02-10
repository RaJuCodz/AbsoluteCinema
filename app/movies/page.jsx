"use client";
import useMovies from "@/hook/useMovies";
import MovieCard from "@/components/MovieCard";
import { useMovieContext } from "@/context/MovieContext";
import { useEffect } from "react";
import useGenreMovies from "@/hook/useGenreMovies";
import MovieCardSkeleton from "@/components/MovieCardSkeleton";

const MoviesPage = () => {
  const { movies: defaultMovies, loading: defaultLoading, error } = useMovies();
  const {
    movies: genreMovies,
    loading: genreLoading,
    selectedGenre,
    setSelectedGenre,
    setMovies,
  } = useMovieContext();

  const { movies: filteredMovies, loading: filterLoading } = useGenreMovies(
    selectedGenre?.id
  );

  useEffect(() => {
    if (selectedGenre) {
      setMovies(filteredMovies);
    }
  }, [selectedGenre, filteredMovies, setMovies]);

  const loading = defaultLoading || genreLoading || filterLoading;
  const movies = genreMovies.length > 0 ? genreMovies : defaultMovies;

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 py-8">
        <div className="container mx-auto px-4">
          <div className="h-8 bg-zinc-800/50 rounded w-48 mb-8 animate-pulse" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <MovieCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-zinc-100 mb-8">
          {selectedGenre ? `${selectedGenre.name} Movies` : "Popular Movies"}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {error ? (
            <div className="col-span-full text-red-500 text-center">
              {error}
            </div>
          ) : (
            movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} mediaType="movie" />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MoviesPage;
