"use client";
import { useState, useEffect } from "react";
import apiClient from "@/services/apiclient";

const useGenreMovies = (genreId) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!genreId) return;

      try {
        setLoading(true);
        const response = await apiClient.get("/discover/movie", {
          params: {
            with_genres: genreId,
            sort_by: "popularity.desc",
            include_adult: false,
            include_video: false,
            page: 1,
          },
        });
        setMovies(response.data.results);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching genre movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [genreId]);

  return { movies, loading, error };
};

export default useGenreMovies;
