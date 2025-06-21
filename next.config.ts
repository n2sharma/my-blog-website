/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',   // ← match any host
        pathname: '/**',  // ← match any path
      },
    ],
    // Optionally keep local images fast:
    // unoptimized: process.env.NODE_ENV === 'development',
  },
};

module.exports = nextConfig;
