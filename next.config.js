const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  env: {
    customKey: 'my-value',
  },
};

const plugins = [withBundleAnalyzer];

const defaultConfig = {
  // msw unhandledRejection Error 一時的に回避
  experimental: {
    esmExternals: false,
  },
};

module.exports = async (phase) =>
  withPlugins(plugins, nextConfig)(phase, { defaultConfig });
