'use client';

import { useState } from 'react';
import { getKakaoCoordinate, getKakaoKeyword } from '@/api/OpenService';
import MapTab from '@/components/Tabs/MapTab';
import MapTextCard from '@/components/cards/MapTextCard';
import KakaoMap from '@/components/map/KakaoMap';
import { useGeoLocation } from '@/hooks/useGeolocation';
import { MapClientProps } from '@/interfaces/Page/MapInterface';

export default function MapClient({ fromAddress, toAddress }: MapClientProps) {
  const { curLocation } = useGeoLocation();

  const [activeTab, setActiveTab] = useState('tab1');
  const [fromCoordinate, setFromCoordinate] = useState<{ La: number; Ma: number } | null>(null);
  const [toCoordinate, setToCoordinate] = useState<{ La: number; Ma: number } | null>(null);

  const renderContent = () => {
    switch (activeTab) {
      case 'tab1':
        return (
          <KakaoMap
            activeTab={activeTab}
            fromAddress={fromAddress}
            toAddress={toAddress}
            curLocation={curLocation}
            setFromCoordinate={setFromCoordinate}
            setToCoordinate={setToCoordinate}
          />
        );
      case 'tab2':
        return (
          <KakaoMap
            activeTab={activeTab}
            fromAddress={fromAddress}
            toAddress={toAddress}
            curLocation={curLocation}
            setFromCoordinate={setFromCoordinate}
            setToCoordinate={setToCoordinate}
          />
        );
      case 'tab3':
        return (
          <KakaoMap
            activeTab={activeTab}
            fromAddress={fromAddress}
            toAddress={toAddress}
            curLocation={curLocation}
            setFromCoordinate={setFromCoordinate}
            setToCoordinate={setToCoordinate}
          />
        );
      default:
        return null;
    }
  };

  const handleClick = async (coordinate: { La: number; Ma: number } | null, address: string) => {
    if (!coordinate || !address) {
      alert('오류가 발생했습니다. 다시 한 번 시도해주세요.');
      return;
    }

    try {
      const placeData = await getKakaoKeyword(address === '출발지' ? fromAddress : toAddress);
      const myPlaceData = await getKakaoCoordinate(curLocation?.longitude, curLocation?.latitude);

      if (placeData && myPlaceData) {
        const placeName = placeData.documents[0]?.place_name || '';
        const myPlaceName = myPlaceData.documents[0]?.place_name || '';

        const kakaoMapUrl = `https://map.kakao.com/?sName=${encodeURIComponent(myPlaceName)}&eName=${encodeURIComponent(placeName)}`;

        window.location.href = kakaoMapUrl;
      }
    } catch (error) {
      console.error('카카오 API 호출 오류:', error);
      alert('오류가 발생했습니다. 다시 한 번 시도해주세요.');
    }
  };

  return (
    <div className="lg:w-[40.6rem] sm:w-full flex flex-col gap-[2rem]">
      <MapTab activeTab={activeTab} setActiveTab={setActiveTab} renderContent={renderContent} />
      <MapTextCard
        handleClick={(coordinate, address) => handleClick(coordinate, address)}
        fromCoordinate={fromCoordinate}
        toCoordinate={toCoordinate}
      />
    </div>
  );
}
