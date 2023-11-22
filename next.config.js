/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
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
      {
        hostname: 'down-aka-id.img.susercontent.com',
        port: '',
      },
    ],
  },
  output: 'standalone',
  basePath: process.env.NODE_ENV === 'production' ? '/vm1' : undefined,
};

module.exports = nextConfig;
