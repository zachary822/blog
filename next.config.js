/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

module.exports = {
  i18n,
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["source.unsplash.com", "i.imgur.com", "api.thoughtbank.app"],
  },
};
