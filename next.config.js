/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/lp-sistema',
        destination: '/lp-sistema.html',
      },
    ];
  },
};

module.exports = nextConfig;
