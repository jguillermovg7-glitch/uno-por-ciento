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
  async headers() {
    return [
      {
        source: '/lp-sistema',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
