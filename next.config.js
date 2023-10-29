/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
      {
        protocol: "https",
        hostname: "cdn.revpanel.io",
      },
      {
        protocol: "https",
        hostname: "chart.googleapis.com",
      },
    ],
    dangerouslyAllowSVG: true,
  },
  output: "standalone",
};

module.exports = nextConfig;
