/** @type {import('next').NextConfig} */
const nextConfig = {
  // No usar 'export' output para desarrollo
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig