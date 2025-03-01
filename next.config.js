/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['placehold.co', 'images.ctfassets.net'], // placehold.coとContentfulの画像ドメインを許可
    unoptimized: process.env.NODE_ENV === 'development', // 開発環境では最適化をスキップ
  },
}

module.exports = nextConfig