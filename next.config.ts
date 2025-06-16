/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
  },
  async rewrites() {
    return [
      {
        source: '/api/accounts/:path*',
        destination: `${process.env.BACKEND_URL}/api/accounts/:path*/`,
      },
    ];
  },
};
