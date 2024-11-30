/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Optional but recommended
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.graphassets.com", // Replace with your domain(s)
      },
    ],
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.graphassets.com",
      },
    ],
  },

};

export default nextConfig;
