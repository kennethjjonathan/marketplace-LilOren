/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: 'www.static-src.com',
        port: '',
      },
    ],
  },
};

module.exports = nextConfig;
