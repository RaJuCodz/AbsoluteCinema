/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: ["i.pinimg.com", "image.tmdb.org"],
  },
};

// module.exports = withVideos();
export default nextConfig;
