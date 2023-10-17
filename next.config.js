/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "ui-avatars.com", "cdn.revpanel.io"],
    dangerouslyAllowSVG: true
  },
  output: "standalone",
};

module.exports = nextConfig;
