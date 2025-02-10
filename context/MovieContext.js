"use client";
import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";

const MovieContext = createContext();

export function MovieProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const router = useRouter();

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setMovies([]); // Clear current movies
    router.push("/movies"); // Navigate to movies page
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        setMovies,
        loading,
        setLoading,
        selectedGenre,
        setSelectedGenre,
        handleGenreSelect,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export function useMovieContext() {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovieContext must be used within a MovieProvider");
  }
  return context;
}
