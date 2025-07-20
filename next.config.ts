/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
  },
  async rewrites() {
    return [
      {
        // match /api/accounts/anything **except** login or logout**
        source: '/api/accounts/:path((?!login|logout).* )',
        destination: `${process.env.BACKEND_URL}/api/accounts/:path*`,
      },
    ];
  },
};
