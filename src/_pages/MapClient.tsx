'use client';

import { useState } from 'react';
import MapTab from '@/components/Tabs/MapTab';
import KakaoMap from '@/components/map/KakaoMap';

interface MapClientProps {
  fromAddress: string;
  toAddress: string;
}

export default function MapClient({ fromAddress, toAddress }: MapClientProps) {
  const [activeTab, setActiveTab] = useState('tab1');

  const renderContent = () => {
    switch (activeTab) {
      case 'tab1':
        return <KakaoMap fromAddress={fromAddress} />;
      case 'tab2':
        return <KakaoMap toAddress={toAddress} />;
      case 'tab3':
        return <KakaoMap fromAddress={fromAddress} toAddress={toAddress} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-[40.6rem]">
      <MapTab activeTab={activeTab} setActiveTab={setActiveTab} renderContent={renderContent} />
    </div>
  );
}
