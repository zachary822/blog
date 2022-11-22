/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  i18n,
  reactStrictMode: true,
  images: {
    domains: [
      "source.unsplash.com",
      "images.unsplash.com",
      "i.imgur.com",
      "api.thoughtbank.app",
    ],
  },
});
