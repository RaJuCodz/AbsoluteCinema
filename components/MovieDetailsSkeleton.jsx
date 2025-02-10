const MovieDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Backdrop Skeleton */}
      <div className="relative h-[60vh] w-full bg-zinc-800/50 animate-pulse" />

      {/* Content */}
      <div className="relative -mt-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Poster Skeleton */}
            <div className="flex-shrink-0 w-[300px] h-[450px] bg-zinc-800/50 rounded-xl animate-pulse" />

            {/* Details Skeleton */}
            <div className="flex-1 space-y-6">
              <div className="h-8 bg-zinc-800/50 rounded w-3/4 animate-pulse" />
              <div className="flex gap-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-4 bg-zinc-800/50 rounded w-20 animate-pulse"
                  />
                ))}
              </div>
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-4 bg-zinc-800/50 rounded w-full animate-pulse"
                  />
                ))}
              </div>
              <div className="flex gap-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-8 bg-zinc-800/50 rounded-full w-24 animate-pulse"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsSkeleton;
