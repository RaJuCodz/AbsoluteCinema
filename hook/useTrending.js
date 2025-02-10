"use client";
import { useState, useEffect } from "react";
import apiClient from "@/services/apiclient";

const useTrending = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("/trending/movie/week");
        setMovies(response.data.results);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching trending movies:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, []);

  return { movies, loading, error };
};

export default useTrending;
