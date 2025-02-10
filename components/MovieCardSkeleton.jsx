const MovieCardSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="aspect-[2/3] bg-zinc-800/50 rounded-lg" />
      <div className="mt-2 space-y-2">
        <div className="h-4 bg-zinc-800/50 rounded w-3/4" />
        <div className="flex items-center gap-2 mt-1">
          <div className="h-3 bg-zinc-800/50 rounded w-16" />
          <div className="h-3 bg-zinc-800/50 rounded w-3" />
          <div className="h-3 bg-zinc-800/50 rounded w-12" />
        </div>
      </div>
    </div>
  );
};

export default MovieCardSkeleton;
