'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoMapProps {
  fromAddress?: string;
  toAddress?: string;
}

export default function KakaoMap({ fromAddress, toAddress }: KakaoMapProps) {
  const apiKey: string | undefined = process.env.NEXT_PUBLIC_KAKAOMAP_KEY;
  const [positions, setPositions] = useState<{ title: string; latlng: any }[]>([]);

  useEffect(() => {
    setPositions([]);

    const script: HTMLScriptElement = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&libraries=services&autoload=false`;
    document.head.appendChild(script);

    script.addEventListener('load', () => {
      window.kakao.maps.load(() => {
        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.addressSearch(`${fromAddress}`, function (result: any, status: any) {
          if (status === window.kakao.maps.services.Status.OK) {
            let coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
            console.log('출발지');
            setPositions(prev => [
              ...prev,
              {
                title: '출발지',
                latlng: coords,
              },
            ]);
          }
        });

        geocoder.addressSearch(`${toAddress}`, function (result: any, status: any) {
          if (status === window.kakao.maps.services.Status.OK) {
            let coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

            console.log('도착지');
            setPositions(prev => [
              ...prev,
              {
                title: '도착지',
                latlng: coords,
              },
            ]);
          }
        });
      });
    });
  }, [fromAddress, toAddress]);

  useEffect(() => {
    if (positions.length === 0) return;

    let container = document.getElementById('map');
    let options = {
      center: positions[0].latlng,
      level: 10,
    };
    let map = new window.kakao.maps.Map(container, options);

    let imageSrc = 'http://t1.daumcdn.net/localimg/localimages/07/2018/pc/img/marker_spot.png';

    positions.forEach(pos => {
      let markerImage = new kakao.maps.MarkerImage(imageSrc, new kakao.maps.Size(24, 35));

      let marker = new window.kakao.maps.Marker({
        map: map,
        position: pos.latlng,
        title: pos.title,
        image: markerImage,
      });

      let infowindow = new window.kakao.maps.InfoWindow({
        content: `<div style="width:150px;text-align:center;padding:6px 0;color:black;">${pos.title}</div>`,
      });

      infowindow.open(map, marker);
    });

    if (positions.length === 2) {
      const midLat = (positions[0].latlng.getLat() + positions[1].latlng.getLat()) / 2;
      const midLng = (positions[0].latlng.getLng() + positions[1].latlng.getLng()) / 2;
      const midCoords = new window.kakao.maps.LatLng(midLat, midLng);
      map.setCenter(midCoords);
    }
  }, [positions]);

  return <div id="map" style={{ height: '361px', width: '406px' }} />;
}
