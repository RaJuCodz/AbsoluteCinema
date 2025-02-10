import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    api_key: process.env.NEXT_PUBLIC_API_KEY,
  };
  return config;
});

export default apiClient;
