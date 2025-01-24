/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['placehold.it', 'example.com', 'avatars.githubusercontent.com', 'moving-bucket-be.s3.ap-northeast-2.amazonaws.com'],
  },
  output: 'standalone',
};

export default nextConfig;
