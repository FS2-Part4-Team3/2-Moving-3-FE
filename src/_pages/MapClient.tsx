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
        return (
          <>
            <div className="p-4">탭 1의 내용입니다.</div>
            <KakaoMap fromAddress={fromAddress} toAddress={toAddress} />
          </>
        );
      case 'tab2':
        return (
          <>
            <div className="p-4">탭 2의 내용입니다.</div>
            <KakaoMap fromAddress={fromAddress} toAddress={toAddress} />
          </>
        );
      case 'tab3':
        return (
          <>
            <div className="p-4">탭 3의 내용입니다.</div>
            <KakaoMap fromAddress={fromAddress} toAddress={toAddress} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-[40.6rem]">
      <MapTab activeTab={activeTab} setActiveTab={setActiveTab} renderContent={renderContent} />
      {/* <KakaoMap /> */}
    </div>
  );
}
