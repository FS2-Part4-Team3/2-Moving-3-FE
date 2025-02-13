'use client';

import { useState } from 'react';

export default function MapTab() {
  const [activeTab, setActiveTab] = useState('tab1');

  const renderContent = () => {
    switch (activeTab) {
      case 'tab1':
        return <div className="p-4">탭 1의 내용입니다.</div>;
      case 'tab2':
        return <div className="p-4">탭 2의 내용입니다.</div>;
      case 'tab3':
        return <div className="p-4">탭 3의 내용입니다.</div>;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex border-b">
        <button
          className={`py-2 px-4 ${activeTab === 'tab1' ? 'border-b-2 border-blue-500' : 'border-transparent'}`}
          onClick={() => setActiveTab('tab1')}
        >
          내 위치 - 출발지
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'tab2' ? 'border-b-2 border-blue-500' : 'border-transparent'}`}
          onClick={() => setActiveTab('tab2')}
        >
          내 위치 - 도착지
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'tab3' ? 'border-b-2 border-blue-500' : 'border-transparent'}`}
          onClick={() => setActiveTab('tab3')}
        >
          출발지 - 도착지
        </button>
      </div>
      <div className="mt-4">{renderContent()}</div>
    </div>
  );
}
