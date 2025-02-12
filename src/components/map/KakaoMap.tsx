'use client';

import { useEffect, useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';

const ReactKakaoMap = () => {
  const apiKey: string | undefined = process.env.NEXT_PUBLIC_KAKAOMAP_KEY;
  const [scriptLoad, setScriptLoad] = useState<boolean>(false);

  useEffect(() => {
    const script: HTMLScriptElement = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
    document.head.appendChild(script);

    script.addEventListener('load', () => {
      setScriptLoad(true);
    });
  }, []);

  return (
    <div>
      {scriptLoad ? (
        <Map center={{ lat: 33.5563, lng: 126.79581 }} style={{ width: '800px', height: '600px' }} level={3}></Map>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default ReactKakaoMap;
