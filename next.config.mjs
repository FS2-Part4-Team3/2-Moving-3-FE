/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['moving-bucket-be.s3.ap-northeast-2.amazonaws.com', 'lh3.googleusercontent.com'],
  },
  output: 'standalone',
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
        ],
      },
    ];
  },
};

export default nextConfig;
