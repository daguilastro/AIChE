import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Opción sencilla: usar 'domains'
    // domains: ['drive.google.com', 'lh3.googleusercontent.com'],

    // Opción más granular: remotePatterns
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'drive.google.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;

export default nextConfig;
