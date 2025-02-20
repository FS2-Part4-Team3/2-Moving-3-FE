/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['moving-bucket-be.s3.ap-northeast-2.amazonaws.com', 'lh3.googleusercontent.com'],
  },
  output: 'standalone',
};

export default nextConfig;
