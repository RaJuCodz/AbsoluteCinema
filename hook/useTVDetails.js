"use client";
import { useState, useEffect } from "react";
import apiClient from "@/services/apiclient";

const useTVDetails = (tvId) => {
  const [show, setShow] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShow = async () => {
      try {
        setLoading(true);
        const [showRes, creditsRes, videosRes] = await Promise.all([
          apiClient.get(`/tv/${tvId}`),
          apiClient.get(`/tv/${tvId}/credits`),
          apiClient.get(`/tv/${tvId}/videos`),
        ]);

        const trailers = videosRes.data.results.filter(
          (video) => video.type === "Trailer"
        );

        setShow({
          ...showRes.data,
          credits: creditsRes.data,
          trailer: trailers[0],
        });
      } catch (err) {
        setError(err.message);
        console.error("Error fetching TV show:", err);
      } finally {
        setLoading(false);
      }
    };

    if (tvId) {
      fetchShow();
    }
  }, [tvId]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      if (!show) return;

      try {
        setLoading(true);
        const response = await apiClient.get(
          `/tv/${tvId}/season/${selectedSeason}`
        );
        setEpisodes(response.data.episodes);
      } catch (err) {
        console.error("Error fetching episodes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, [tvId, selectedSeason, show]);

  return { show, episodes, selectedSeason, setSelectedSeason, loading, error };
};

export default useTVDetails;
