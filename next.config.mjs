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
  webpack(config, { isServer }) {
    if (!isServer) {
      config.resolve.alias["react"] = "react/cjs/react.development.js";
      config.resolve.alias["react-dom"] =
        "react-dom/cjs/react-dom.development.js";
    }
    return config;
  },
};

export default nextConfig;
