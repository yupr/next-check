/** @type {import('next').NextConfig} */

console.log('IS_DEVELOPMENT', process.env.IS_DEVELOPMENT);

module.exports = {
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  env: {
    customKey: 'my-value',
  },
};
