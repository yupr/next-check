/** @type {import('next').NextConfig} */

console.log('IS_DEVELOPMENT', process.env.IS_DEVELOPMENT);

module.exports = {
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  // trailingSlash: true,
  env: {
    customKey: 'my-value',
  },
};
