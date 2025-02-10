"use client";
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import useSearch from "@/hook/useSearch";
import { useDebounce } from "@/hook/useDebounce";
import { Search, Film, Tv } from "lucide-react";
import SearchCard from "./SearchCard";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);
  const router = useRouter();
  const { searchResults, loading, searchAll } = useSearch();
  const debouncedSearch = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedSearch) {
      searchAll(debouncedSearch);
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [debouncedSearch, searchAll]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavigate = (type, id) => {
    setIsOpen(false);
    setQuery("");
    router.push(`/${type}/${id}`);
  };

  const hasResults =
    searchResults.movies.length > 0 || searchResults.tvShows.length > 0;

  return (
    <div className="relative w-full max-w-md" ref={searchRef}>
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-zinc-400" />
        <Input
          type="text"
          placeholder="Search movies & TV shows..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-8 bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-400 focus-visible:ring-yellow-500"
        />
      </div>

      {isOpen && hasResults && (
        <div className="absolute mt-2 w-[40rem] -left-44 bg-zinc-900/95 backdrop-blur-sm rounded-xl shadow-xl border border-zinc-800/50 overflow-hidden z-50">
          <div className="max-h-[80vh] overflow-y-auto">
            <div className="grid grid-cols-2 divide-x divide-zinc-800">
              {/* Movies Section */}
              {searchResults.movies.length > 0 && (
                <div className="p-2">
                  <div className="flex items-center gap-2 px-3 py-2 text-zinc-400">
                    <Film size={16} />
                    <span className="text-sm font-medium">Movies</span>
                  </div>
                  <div className="space-y-1">
                    {searchResults.movies.slice(0, 5).map((movie) => (
                      <SearchCard
                        key={movie.id}
                        item={movie}
                        onClick={() => handleNavigate("movie", movie.id)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* TV Shows Section */}
              {searchResults.tvShows.length > 0 && (
                <div className="p-2">
                  <div className="flex items-center gap-2 px-3 py-2 text-zinc-400">
                    <Tv size={16} />
                    <span className="text-sm font-medium">TV Shows</span>
                  </div>
                  <div className="space-y-1">
                    {searchResults.tvShows.slice(0, 5).map((show) => (
                      <SearchCard
                        key={show.id}
                        item={show}
                        onClick={() => handleNavigate("tv", show.id)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {isOpen && loading && (
        <div className="absolute mt-2 w-full bg-zinc-900/95 backdrop-blur-sm rounded-xl shadow-xl border border-zinc-800/50 p-4 text-center text-zinc-400">
          Searching...
        </div>
      )}
    </div>
  );
};

export default SearchBar;
