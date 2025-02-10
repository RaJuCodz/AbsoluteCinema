"use client";
import { useParams } from "next/navigation";
import useTVDetails from "@/hook/useTVDetails";
import Image from "next/image";
import { Play, Star, Calendar, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import VideoPlayer from "@/components/VideoPlayer";
import TVShowDetailsSkeleton from "@/components/TVShowDetailsSkeleton";

const TVShowPage = () => {
  const { id } = useParams();
  const { show, episodes, selectedSeason, setSelectedSeason, loading, error } =
    useTVDetails(id);
  const [playingEpisode, setPlayingEpisode] = useState(null);

  if (loading) {
    return <TVShowDetailsSkeleton />;
  }

  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!show) return null;

  const handleWatchEpisode = (episode) => {
    setPlayingEpisode(episode);
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero Section */}
      <div className="relative h-[80vh]">
        <Image
          src={`https://image.tmdb.org/t/p/original${show.backdrop_path}`}
          alt={show.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <div className="max-w-3xl">
              <h1 className="text-5xl font-bold text-zinc-100 mb-4 drop-shadow-lg">
                {show.name}
              </h1>

              <div className="flex items-center gap-4 text-zinc-300 mb-6">
                <div className="flex items-center gap-2">
                  <Star
                    className="w-5 h-5 text-yellow-500"
                    fill="currentColor"
                  />
                  <span className="text-lg">
                    {show.vote_average.toFixed(1)}
                  </span>
                </div>
                <span>•</span>
                <span>{show.first_air_date.split("-")[0]}</span>
                <span>•</span>
                <span>{show.number_of_seasons} Seasons</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {show.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-4 py-1.5 bg-zinc-800/50 backdrop-blur-sm rounded-full text-sm text-zinc-300"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <p className="text-lg text-zinc-300 mb-8 line-clamp-3">
                {show.overview}
              </p>

              <div className="flex gap-4">
                {show.trailer && (
                  <Button
                    size="lg"
                    className="flex items-center gap-2 px-8"
                    onClick={() =>
                      window.open(
                        `https://www.youtube.com/watch?v=${show.trailer.key}`,
                        "_blank"
                      )
                    }
                  >
                    <Play className="w-5 h-5" />
                    Watch Trailer
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="episodes" className="space-y-8">
          <TabsList className="w-full max-w-md mx-auto">
            <TabsTrigger value="episodes" className="flex-1">
              Episodes
            </TabsTrigger>
            <TabsTrigger value="more" className="flex-1">
              More Info
            </TabsTrigger>
          </TabsList>

          <TabsContent value="episodes">
            {/* Season Selector */}
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
              {Array.from({ length: show.number_of_seasons }, (_, i) => (
                <Button
                  key={i + 1}
                  variant={selectedSeason === i + 1 ? "default" : "secondary"}
                  onClick={() => setSelectedSeason(i + 1)}
                  className={`flex-shrink-0 ${
                    selectedSeason === i + 1
                      ? "bg-yellow-500 text-zinc-900 hover:bg-yellow-400"
                      : "bg-zinc-800 text-zinc-100 hover:bg-zinc-700"
                  }`}
                >
                  Season {i + 1}
                </Button>
              ))}
            </div>

            {/* Episodes List */}
            <div className="space-y-4">
              {episodes.map((episode) => (
                <div
                  key={episode.id}
                  className="group bg-zinc-900/50 hover:bg-zinc-900 rounded-lg transition-colors duration-200"
                >
                  <div className="flex gap-6 p-4">
                    {/* Episode Thumbnail */}
                    <div className="relative w-64 aspect-video rounded-md overflow-hidden flex-shrink-0">
                      {episode.still_path ? (
                        <Image
                          src={`https://image.tmdb.org/t/p/w500${episode.still_path}`}
                          alt={episode.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                          <Info className="w-8 h-8 text-zinc-600" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-200" />
                      <Button
                        className="absolute inset-0 m-auto w-12 h-12 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        onClick={() => handleWatchEpisode(episode)}
                      >
                        <Play className="w-6 h-6" />
                      </Button>
                    </div>

                    {/* Episode Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-medium text-zinc-100 group-hover:text-yellow-500 transition-colors">
                            {episode.episode_number}. {episode.name}
                          </h3>
                          <p className="text-sm text-zinc-400 mt-1">
                            {episode.air_date}
                          </p>
                        </div>
                        <div className="text-sm text-zinc-400">
                          {episode.runtime}m
                        </div>
                      </div>
                      <p className="text-sm text-zinc-300 mt-4 line-clamp-2">
                        {episode.overview}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="more">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Cast Section */}
              <div>
                <h2 className="text-2xl font-semibold text-zinc-100 mb-6">
                  Cast
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  {show.credits.cast.slice(0, 6).map((actor) => (
                    <div key={actor.id} className="group">
                      <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-3">
                        {actor.profile_path ? (
                          <Image
                            src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                            alt={actor.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                        ) : (
                          <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                            <Info className="w-8 h-8 text-zinc-600" />
                          </div>
                        )}
                      </div>
                      <h4 className="font-medium text-zinc-100 group-hover:text-yellow-500 transition-colors">
                        {actor.name}
                      </h4>
                      <p className="text-sm text-zinc-400">{actor.character}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Show Details */}
              <div>
                <h2 className="text-2xl font-semibold text-zinc-100 mb-6">
                  Details
                </h2>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm text-zinc-400">Status</dt>
                    <dd className="text-zinc-100">{show.status}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-zinc-400">Network</dt>
                    <dd className="text-zinc-100">
                      {show.networks?.map((network) => network.name).join(", ")}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-zinc-400">Original Language</dt>
                    <dd className="text-zinc-100">
                      {show.original_language?.toUpperCase()}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-zinc-400">First Air Date</dt>
                    <dd className="text-zinc-100">{show.first_air_date}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-zinc-400">Last Air Date</dt>
                    <dd className="text-zinc-100">{show.last_air_date}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <VideoPlayer
        isOpen={!!playingEpisode}
        onClose={() => setPlayingEpisode(null)}
        title={playingEpisode ? `${show.name} - ${playingEpisode.name}` : ""}
        mediaType="tv"
        tmdbId={show.id}
        season={playingEpisode?.season_number}
        episode={playingEpisode?.episode_number}
      />
    </div>
  );
};

export default TVShowPage;
