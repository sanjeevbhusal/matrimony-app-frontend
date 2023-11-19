/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "github.com",
      "upload.wikimedia.org",
      "utfs.io",
      "avatars.githubusercontent.com",
      "cloudflare-ipfs.com",
    ],
  },
};

module.exports = nextConfig;
