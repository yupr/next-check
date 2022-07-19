const withPlugins = require('next-compose-plugins');

const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  env: {
    customKey: 'my-value',
  },
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const plugins = [withBundleAnalyzer];

module.exports = withPlugins(plugins, nextConfig);
