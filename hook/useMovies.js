"use client";
import { useState, useEffect } from "react";
import apiClient from "@/services/apiclient";

/**
 * @typedef {Object} Movie
 * @property {boolean} adult
 * @property {string} backdrop_path
 * @property {number[]} genre_ids
 * @property {number} id
 * @property {string} original_language
 * @property {string} original_title
 * @property {string} overview
 * @property {number} popularity
 * @property {string} poster_path
 * @property {string} release_date
 * @property {string} title
 * @property {boolean} video
 * @property {number} vote_average
 * @property {number} vote_count
 */

const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("/discover/movie", {
          params: {
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
        console.error("Error fetching movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return { movies, loading, error };
};

export default useMovies;
