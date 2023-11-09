/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASEURL: process.env.BASEURL,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'www.static-src.com',
        port: '',
      },
      {
        hostname: 'down-id.img.susercontent.com',
        port: '',
      },
      {
        hostname: 'images.tokopedia.net',
        port: '',
      },
      {
        hostname: 'deo.shopeesz.com',
        port: '',
      },
    ],
  },
  output: 'standalone',
};

module.exports = nextConfig;
