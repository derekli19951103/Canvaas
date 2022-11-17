const withAntdLess = require("next-plugin-antd-less");

/** @type {import('next').NextConfig} */
const nextConfig = withAntdLess({
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  swcMinify: true,
});

module.exports = nextConfig;
