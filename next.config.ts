import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/accounts/:path*', // client-side path
        destination: 'http://localhost:8000/api/accounts/:path*/',
        // → actual backend (no CORS needed, since the browser thinks it’s talking to your own domain)
      },
    ];
  },
};

export default nextConfig;
