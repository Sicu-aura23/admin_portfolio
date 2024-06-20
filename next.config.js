/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        // pathname: '/account123/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        // pathname: '/account123/**',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true
  },

}

module.exports = nextConfig
