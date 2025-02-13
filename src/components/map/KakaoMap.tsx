'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoMapProps {
  activeTab: 'tab1' | 'tab2' | 'tab3';
  fromAddress?: string;
  toAddress?: string;
  curLocation?: {
    latitude: number;
    longitude: number;
  };
  setFromCoordinate: React.Dispatch<React.SetStateAction<{ La: number; Ma: number } | null>>;
  setToCoordinate: React.Dispatch<React.SetStateAction<{ La: number; Ma: number } | null>>;
}

export default function KakaoMap({
  activeTab,
  fromAddress,
  toAddress,
  curLocation,
  setFromCoordinate,
  setToCoordinate,
}: KakaoMapProps) {
  const apiKey: string | undefined = process.env.NEXT_PUBLIC_KAKAOMAP_KEY;
  const [positions, setPositions] = useState<{ title: string; latlng: any }[]>([]);

  useEffect(() => {
    const script: HTMLScriptElement = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&libraries=services&autoload=false`;
    document.head.appendChild(script);

    script.addEventListener('load', () => {
      window.kakao.maps.load(() => {
        const geocoder = new window.kakao.maps.services.Geocoder();

        let newPositions: { title: string; latlng: any }[] = [];
        let promises: Promise<void>[] = []; // 비동기 처리 배열

        const addressSearch = (address: string, title: string) => {
          return new Promise<void>((resolve, reject) => {
            geocoder.addressSearch(address, (result: any, status: any) => {
              if (status === window.kakao.maps.services.Status.OK) {
                let coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
                if (title === '출발지') setFromCoordinate(coords);
                if (title === '도착지') setToCoordinate(coords);
                if (!newPositions.some(pos => pos.title === title)) {
                  newPositions.push({ title, latlng: coords });
                }
                resolve();
              } else {
                reject(`주소 ${address} 변환 실패`);
              }
            });
          });
        };

        // activeTab에 따른 초기값 설정
        if (activeTab === 'tab1') {
          // tab1: 출발지와 현재 위치만
          if (fromAddress) {
            promises.push(addressSearch(fromAddress, '출발지'));
          }
          if (curLocation) {
            let coords = new window.kakao.maps.LatLng(curLocation.latitude, curLocation.longitude);
            if (!newPositions.some(pos => pos.title === '현재 위치')) {
              newPositions.push({ title: '현재 위치', latlng: coords });
            }
          }
        } else if (activeTab === 'tab2') {
          // tab2: 현재 위치와 도착지만
          if (curLocation) {
            let coords = new window.kakao.maps.LatLng(curLocation.latitude, curLocation.longitude);
            if (!newPositions.some(pos => pos.title === '현재 위치')) {
              newPositions.push({ title: '현재 위치', latlng: coords });
            }
          }
          if (toAddress) {
            promises.push(addressSearch(toAddress, '도착지'));
          }
        } else if (activeTab === 'tab3') {
          // tab3: 출발지와 도착지만
          if (fromAddress) {
            promises.push(addressSearch(fromAddress, '출발지'));
          }
          if (toAddress) {
            promises.push(addressSearch(toAddress, '도착지'));
          }
        }

        // 모든 주소 변환 작업이 완료된 후 상태를 갱신
        Promise.all(promises)
          .then(() => {
            setPositions(newPositions); // 한 번만 setPositions 호출
          })
          .catch(error => {
            console.error(error);
          });
      });
    });
  }, [fromAddress, toAddress, curLocation, activeTab]);

  useEffect(() => {
    if (positions.length < 2) return;

    let container = document.getElementById('map');
    let options = {
      center: positions[0].latlng,
      level: 10,
    };
    let map = new window.kakao.maps.Map(container, options);

    let imageSrc = 'http://t1.daumcdn.net/localimg/localimages/07/2018/pc/img/marker_spot.png';
    positions.forEach(pos => {
      let markerImage = new window.kakao.maps.MarkerImage(imageSrc, new window.kakao.maps.Size(24, 35));

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

    const midLat = (positions[0].latlng.getLat() + positions[1].latlng.getLat()) / 2;
    const midLng = (positions[0].latlng.getLng() + positions[1].latlng.getLng()) / 2;
    const midCoords = new window.kakao.maps.LatLng(midLat, midLng);
    map.setCenter(midCoords);
  }, [positions]);

  return <div id="map" style={{ height: '361px', width: '406px' }} />;
}
