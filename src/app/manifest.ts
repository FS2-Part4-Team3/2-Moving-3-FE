import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Moving',
    short_name: 'Moving',
    description: '이사 소비자와 이사 전문가 매칭 서비스',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [
      {
        src: 'https://www.moving.wiki/favicon.ico ',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
  };
}
