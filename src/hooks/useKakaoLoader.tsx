'use client';

import { useKakaoLoader as useKakaoLoaderOrigin } from 'react-kakao-maps-sdk';

export default function useKakaoLoader() {
  useKakaoLoaderOrigin({
    appkey: process.env.NEXT_PUBLIC_KAKAOMAP_KEY as string,
    libraries: ['clusterer', 'drawing', 'services'],
  });
}
