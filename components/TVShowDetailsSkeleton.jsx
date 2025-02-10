const TVShowDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero Skeleton */}
      <div className="relative h-[80vh] bg-zinc-800/50 animate-pulse">
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <div className="max-w-3xl space-y-6">
              <div className="h-12 bg-zinc-800/50 rounded w-3/4" />
              <div className="flex gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-4 bg-zinc-800/50 rounded w-20" />
                ))}
              </div>
              <div className="flex gap-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-8 bg-zinc-800/50 rounded-full w-24"
                  />
                ))}
              </div>
              <div className="space-y-2">
                {[1, 2].map((i) => (
                  <div key={i} className="h-4 bg-zinc-800/50 rounded w-full" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Episodes Skeleton */}
      <div className="container mx-auto px-4 py-12">
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-zinc-900/50 p-4 rounded-lg">
              <div className="flex gap-6">
                <div className="w-64 aspect-video bg-zinc-800/50 rounded-md" />
                <div className="flex-1 space-y-4">
                  <div className="h-6 bg-zinc-800/50 rounded w-3/4" />
                  <div className="h-4 bg-zinc-800/50 rounded w-1/4" />
                  <div className="h-4 bg-zinc-800/50 rounded w-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TVShowDetailsSkeleton;
