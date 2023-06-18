/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    disableStaticImages: true,
  },
};
const withImages = require("next-images");

module.exports = nextConfig;
module.exports = withImages();

module.exports = {
  nextConfig,
  withImages: withImages,
};
