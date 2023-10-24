/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "localhost",
      "ui-avatars.com",
      "cdn.revpanel.io",
      "chart.googleapis.com",
    ],
    dangerouslyAllowSVG: true,
  },
  output: "standalone",
};

module.exports = nextConfig;
