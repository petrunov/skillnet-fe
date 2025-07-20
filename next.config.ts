// next.config.js (or .ts)
module.exports = {
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
  },
  async rewrites() {
    return [
      // 1) First, let Next.js handle login & logout itself
      {
        source: '/api/accounts/login',
        destination: '/api/accounts/login', // points back to your Next.js API
      },
      {
        source: '/api/accounts/logout',
        destination: '/api/accounts/logout',
      },
      // 2) Then proxy everything else under /api/accounts/ to Django
      {
        source: '/api/accounts/:path*',
        destination: `${process.env.BACKEND_URL}/api/accounts/:path*/`,
      },
    ];
  },
};
