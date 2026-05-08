/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost', port: '3000', pathname: '/uploads/**' },
      { protocol: 'http', hostname: 'localhost', port: '3002', pathname: '/uploads/**' },
      { protocol: 'https', hostname: 'kulupbul.com', pathname: '/uploads/**' },
      { protocol: 'https', hostname: 'www.kulupbul.com', pathname: '/uploads/**' },
    ],
  },
}

module.exports = nextConfig
