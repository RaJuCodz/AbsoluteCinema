"use client";
import useTvShows from "@/hook/useTvShows";
import MovieCard from "@/components/MovieCard";

const TvshowsPage = () => {
  const { TvShows, loading, error } = useTvShows();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-zinc-400">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-zinc-100 mb-8">Tv Shows</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {TvShows.map((TvShow) => (
            <MovieCard key={TvShow.id} movie={TvShow} mediaType="tv" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TvshowsPage;
