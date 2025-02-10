"use client";
import { useState, useEffect } from "react";
import apiClient from "@/services/apiclient";

const useMovieDetails = (movieId) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const [movieRes, creditsRes, videosRes] = await Promise.all([
          apiClient.get(`/movie/${movieId}`),
          apiClient.get(`/movie/${movieId}/credits`),
          apiClient.get(`/movie/${movieId}/videos`),
        ]);

        const trailers = videosRes.data.results.filter(
          (video) => video.type === "Trailer"
        );

        setMovie({
          ...movieRes.data,
          credits: creditsRes.data,
          trailer: trailers[0],
        });
      } catch (err) {
        setError(err.message);
        console.error("Error fetching movie:", err);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchMovie();
    }
  }, [movieId]);

  return { movie, loading, error };
};

export default useMovieDetails;
