"use client";
import { useState } from "react";
import apiClient from "@/services/apiclient";

const useSearch = () => {
  const [searchResults, setSearchResults] = useState({
    movies: [],
    tvShows: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchAll = async (query) => {
    if (!query.trim()) {
      setSearchResults({ movies: [], tvShows: [] });
      return;
    }

    try {
      setLoading(true);
      const [moviesResponse, tvResponse] = await Promise.all([
        apiClient.get("/search/movie", {
          params: { query },
        }),
        apiClient.get("/search/tv", {
          params: { query },
        }),
      ]);

      setSearchResults({
        movies: moviesResponse.data.results,
        tvShows: tvResponse.data.results,
      });
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Error searching:", err);
    } finally {
      setLoading(false);
    }
  };

  return { searchResults, loading, error, searchAll };
};

export default useSearch;
