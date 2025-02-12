/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: ["i.pinimg.com", "image.tmdb.org"],
  },
};
const withVideos = require("next-videos");

module.exports = withVideos();
export default nextConfig;
