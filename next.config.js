const nextEnv = require('@next/env');

const envs = nextEnv.loadEnvConfig('.env.local', true);

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
      {
        hostname: 'down-aka-id.img.susercontent.com',
        port: '',
      },
    ],
  },
  basePath: envs.combinedEnv.ENV == 'production' ? '/vm1' : undefined,
  output: 'standalone',
};

module.exports = nextConfig;
