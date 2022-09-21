const withAntdLess = require("next-plugin-antd-less");

/** @type {import('next').NextConfig} */
const nextConfig = withAntdLess({
  reactStrictMode: true,
  swcMinify: true,
});

module.exports = nextConfig;
