'use client';

import { useState } from 'react';

export default function ManageQuoteTab() {
  const [selectTab, setSelectTab] = useState<'send' | 'abandon'>('send');
  return (
    <div className="flex lg:gap-[3.2rem] sm:gap-[2.4rem]">
      <div
        className={`lg:py-[1.6rem] sm:py-[1.5rem] cursor-pointer ${selectTab === 'send' ? 'border-b-2 border-black-400' : ''}`}
        onClick={() => setSelectTab('send')}
      >
        <p
          className={`lg:font-semibold lg:text-[2rem] lg:leading-[3.2rem] sm:font-bold sm:text-[1.4rem] sm:leading-[2.4rem] ${selectTab === 'send' ? 'text-[#2B2B2B]' : 'text-gray-400'}`}
        >
          보낸 견적 조회
        </p>
      </div>
      <div
        className={`lg:py-[1.6rem] sm:py-[1.5rem] cursor-pointer ${selectTab === 'abandon' ? 'border-b-2 border-black-400' : ''}`}
        onClick={() => setSelectTab('abandon')}
      >
        <p
          className={`lg:font-semibold lg:text-[2rem] lg:leading-[3.2rem] sm:font-bold sm:text-[1.4rem] sm:leading-[2.4rem] ${selectTab === 'abandon' ? 'text-[#2B2B2B]' : 'text-gray-400'}`}
        >
          반려 요청
        </p>
      </div>
    </div>
  );
}
