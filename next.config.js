/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
    esmExternals: "loose", // FEEDBACK: had to enable this for the db.js import worker error
  },
}

module.exports = nextConfig
