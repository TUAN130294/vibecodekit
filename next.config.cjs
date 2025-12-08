/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Enable standalone output for Docker deployment
  output: 'standalone',
  // Fix Windows path resolution issues
  webpack: (config, { isServer }) => {
    // Ensure proper path resolution on Windows
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
  // Next.js 14+ uses app directory by default, no need for experimental flag
};

module.exports = nextConfig;

