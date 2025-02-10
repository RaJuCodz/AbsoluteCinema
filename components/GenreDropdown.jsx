"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import useGenreMovies from "@/hook/useGenreMovies";
import { useMovieContext } from "@/context/MovieContext";
import MovieCard from "./MovieCard";

const GenreDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const { fetchMoviesByGenre } = useGenreMovies();
  const { setMovies, setSelectedGenre, selectedGenre, setLoading } =
    useMovieContext();
  const genres = [
    {
      id: 28,
      name: "Action",
    },
    {
      id: 12,
      name: "Adventure",
    },
    {
      id: 16,
      name: "Animation",
    },
    {
      id: 35,
      name: "Comedy",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 14,
      name: "Fantasy",
    },
    {
      id: 36,
      name: "History",
    },
    {
      id: 27,
      name: "Horror",
    },
    {
      id: 10402,
      name: "Music",
    },
    {
      id: 9648,
      name: "Mystery",
    },
    {
      id: 10749,
      name: "Romance",
    },
    {
      id: 878,
      name: "Science Fiction",
    },
    {
      id: 10770,
      name: "TV Movie",
    },
    {
      id: 53,
      name: "Thriller",
    },
    {
      id: 10752,
      name: "War",
    },
    {
      id: 37,
      name: "Western",
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleGenreClick = async (genre) => {
    setSelectedGenre(genre);
    setIsOpen(false);
    setLoading(true);

    try {
      const moviesList = await fetchMoviesByGenre(genre.id);
      setMovies(moviesList);
      router.push("/movies", {
        state: { genre: true }, // Add state to history
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`transition-colors ${
          isOpen || selectedGenre
            ? "text-yellow-500"
            : "text-zinc-100 hover:text-yellow-400"
        }`}
      >
        {selectedGenre ? selectedGenre.name : "Genres"}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-zinc-900/95 backdrop-blur-sm rounded-xl shadow-xl border border-zinc-800/50">
          <div className="py-2 max-h-[70vh] overflow-y-auto">
            {genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => handleGenreClick(genre)}
                className="w-full text-left px-4 py-2 text-sm text-zinc-100 hover:bg-zinc-800 hover:text-yellow-400 transition-colors"
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GenreDropdown;
