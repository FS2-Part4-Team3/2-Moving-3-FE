import { useState } from 'react';

export default function WaitingQuoteTab() {
  const [selectTab, setSelectTab] = useState<'wait' | 'estimate'>('wait');
  return (
    <div className="flex gap-[3.2rem] pt-[1.6rem]">
      <div
        className={`py-[1.6rem] cursor-pointer ${selectTab === 'wait' ? 'border-b-2 border-black-400' : ''}`}
        onClick={() => setSelectTab('wait')}
      >
        <p className={`font-semibold text-[2rem] leading-[3.2rem] ${selectTab === 'wait' ? 'text-[#2B2B2B]' : 'text-gray-400'}`}>
          대기 중인 견적
        </p>
      </div>
      <div
        className={`py-[1.6rem] cursor-pointer ${selectTab === 'estimate' ? 'border-b-2 border-black-400' : ''}`}
        onClick={() => setSelectTab('estimate')}
      >
        <p
          className={`font-semibold text-[2rem] leading-[3.2rem] ${selectTab === 'estimate' ? 'text-[#2B2B2B]' : 'text-gray-400'}`}
        >
          받았던 견적
        </p>
      </div>
    </div>
  );
}
