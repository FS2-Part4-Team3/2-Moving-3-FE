'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoMapProps {
  fromAddress: string;
  toAddress: string;
}

export default function KakaoMap({ fromAddress, toAddress }: KakaoMapProps) {
  const apiKey: string | undefined = process.env.NEXT_PUBLIC_KAKAOMAP_KEY;

  useEffect(() => {
    const script: HTMLScriptElement = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&libraries=services&autoload=false`;
    document.head.appendChild(script);

    script.addEventListener('load', () => {
      window.kakao.maps.load(() => {
        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.addressSearch('제주특별자치도 제주시 첨단로 242', function (result: any, status: any) {
          if (status === window.kakao.maps.services.Status.OK) {
            let coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

            let container = document.getElementById('map');
            let options = {
              center: coords,
              level: 3,
            };
            let map = new window.kakao.maps.Map(container, options);

            let marker = new window.kakao.maps.Marker({
              map: map,
              position: coords,
            });

            let infowindow = new window.kakao.maps.InfoWindow({
              content: '<div style="width:150px;text-align:center;padding:6px 0;color:black;">' + '카카오 본사' + '</div>',
            });
            infowindow.open(map, marker);
          }
        });
      });
    });
  }, []);

  return <div id="map" style={{ height: '361px', width: '406px' }} />;
}
