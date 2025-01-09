import { useState } from 'react';

export default function WaitingQuoteTab() {
  const [selectTab, setSelectTab] = useState<'wait' | 'estimate'>('wait');
  return (
    <div className="flex lg:gap-[3.2rem] sm:gap-[2.4rem]">
      <div
        className={`lg:py-[1.6rem] sm:py-[1.5rem] cursor-pointer ${selectTab === 'wait' ? 'border-b-2 border-black-400' : ''}`}
        onClick={() => setSelectTab('wait')}
      >
        <p
          className={`lg:font-semibold lg:text-[2rem] lg:leading-[3.2rem] sm:font-bold sm:text-[1.4rem] sm:leading-[2.4rem] ${selectTab === 'wait' ? 'text-[#2B2B2B]' : 'text-gray-400'}`}
        >
          대기 중인 견적
        </p>
      </div>
      <div
        className={`lg:py-[1.6rem] sm:py-[1.5rem] cursor-pointer ${selectTab === 'estimate' ? 'border-b-2 border-black-400' : ''}`}
        onClick={() => setSelectTab('estimate')}
      >
        <p
          className={`lg:font-semibold lg:text-[2rem] lg:leading-[3.2rem] sm:font-bold sm:text-[1.4rem] sm:leading-[2.4rem] ${selectTab === 'estimate' ? 'text-[#2B2B2B]' : 'text-gray-400'}`}
        >
          받았던 견적
        </p>
      </div>
    </div>
  );
}
