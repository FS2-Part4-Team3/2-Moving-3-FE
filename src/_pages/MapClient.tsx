'use client';

import { useState } from 'react';
import MapTab from '@/components/Tabs/MapTab';
import MapTextCard from '@/components/cards/MapTextCard';
import KakaoMap from '@/components/map/KakaoMap';
import { useGeoLocation } from '@/hooks/useGeolocation';

interface MapClientProps {
  fromAddress: string;
  toAddress: string;
}

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

  const handleClick = (coordinate: string) => {
    window.location.href = `https://map.kakao.com/link/map/${coordinate}`;
  };

  return (
    <div className="w-[40.6rem] flex flex-col gap-[2rem]">
      <MapTab activeTab={activeTab} setActiveTab={setActiveTab} renderContent={renderContent} />
      <MapTextCard />
    </div>
  );
}
