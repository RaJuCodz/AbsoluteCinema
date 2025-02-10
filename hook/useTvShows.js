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
 * @property {string} first_air_date

 * @property {string} name
 * @property {boolean} video
 * @property {number} vote_average
 * @property {number} vote_count
 */

const useTvShows = () => {
  const [TvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTvShows = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("/discover/tv");
        setTvShows(response.data.results);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching movies:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTvShows();
  }, []);

  return { TvShows, loading, error };
};

export default useTvShows;
