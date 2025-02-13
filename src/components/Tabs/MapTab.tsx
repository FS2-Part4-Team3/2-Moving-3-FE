'use client';

import { useState } from 'react';

interface MapTabProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  renderContent: () => JSX.Element | null;
}

export default function MapTab({ activeTab, setActiveTab, renderContent }: MapTabProps) {
  // const [activeTab, setActiveTab] = useState('tab1');

  // const renderContent = () => {
  //   switch (activeTab) {
  //     case 'tab1':
  //       return <div className="p-4">탭 1의 내용입니다.</div>;
  //     case 'tab2':
  //       return <div className="p-4">탭 2의 내용입니다.</div>;
  //     case 'tab3':
  //       return <div className="p-4">탭 3의 내용입니다.</div>;
  //     default:
  //       return null;
  //   }
  // };

  return (
    <div className="flex flex-col">
      <div className="flex w-full rounded-[1.2rem] p-[0.6rem] gap-[1rem] bg-background-200">
        <button
          className={`w-full rounded-[0.8rem] py-[0.6rem] px-[1rem] gap-[1rem] font-semibold text-[1.6rem] leading-[2.6rem] ${activeTab === 'tab1' ? 'bg-white shadow-MapTabShadow' : ''}`}
          onClick={() => setActiveTab('tab1')}
        >
          내 위치 - 출발지
        </button>
        <button
          className={`w-full rounded-[0.8rem] py-[0.6rem] px-[1rem] gap-[1rem] font-semibold text-[1.6rem] leading-[2.6rem] ${activeTab === 'tab2' ? 'bg-white shadow-MapTabShadow' : ''}`}
          onClick={() => setActiveTab('tab2')}
        >
          내 위치 - 도착지
        </button>
        <button
          className={`w-full rounded-[0.8rem] py-[0.6rem] px-[1rem] gap-[1rem] font-semibold text-[1.6rem] leading-[2.6rem] ${activeTab === 'tab3' ? 'bg-white shadow-MapTabShadow' : ''}`}
          onClick={() => setActiveTab('tab3')}
        >
          출발지 - 도착지
        </button>
      </div>
      <div className="mt-4">{renderContent()}</div>
    </div>
  );
}
