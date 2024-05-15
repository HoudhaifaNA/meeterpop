/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Remote patterns to display images from any domain
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
