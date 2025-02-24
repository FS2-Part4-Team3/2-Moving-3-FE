'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function WaitingQuoteTab() {
  const pathname = usePathname();
  const [selectTab, setSelectTab] = useState<'wait' | 'estimate' | 'edit'>('wait');

  useEffect(() => {
    if (pathname === '/normal/my-quote/waiting') {
      setSelectTab('wait');
    } else if (pathname === '/normal/my-quote/received') {
      setSelectTab('estimate');
    } else if (pathname === '/normal/my-quote/edit') {
      setSelectTab('edit');
    }
  }, [pathname]);

  return (
    <div className="flex lg:gap-[3.2rem] sm:gap-[2.4rem] lg:pt-[1.6rem] sm:pt-[1rem] bg-white dark:bg-dark-p border-b border-line-100 lg:px-[0rem] md:px-[7.2rem] sm:px-[2.4rem]">
      <Link href="/normal/my-quote/waiting">
        <div
          className={`lg:py-[1.6rem] sm:py-[1.5rem] cursor-pointer ${selectTab === 'wait' ? 'border-b-2 border-black-400 dark:border-dark-t' : ''}`}
          onClick={() => setSelectTab('wait')}
        >
          <p
            className={`lg:font-semibold lg:text-[2rem] lg:leading-[3.2rem] sm:font-bold sm:text-[1.4rem] sm:leading-[2.4rem] ${selectTab === 'wait' ? 'text-[#2B2B2B] dark:text-dark-t' : 'text-gray-400'}`}
          >
            대기 중인 견적
          </p>
        </div>
      </Link>
      <Link href="/normal/my-quote/received">
        <div
          className={`lg:py-[1.6rem] sm:py-[1.5rem] cursor-pointer ${selectTab === 'estimate' ? 'border-b-2 border-black-400 dark:border-dark-t' : ''}`}
          onClick={() => setSelectTab('estimate')}
        >
          <p
            className={`lg:font-semibold lg:text-[2rem] lg:leading-[3.2rem] sm:font-bold sm:text-[1.4rem] sm:leading-[2.4rem] ${selectTab === 'estimate' ? 'text-[#2B2B2B] dark:text-dark-t' : 'text-gray-400'}`}
          >
            받았던 견적
          </p>
        </div>
      </Link>
      <Link href="/normal/my-quote/edit">
        <div
          className={`lg:py-[1.6rem] sm:py-[1.5rem] cursor-pointer ${selectTab === 'edit' ? 'border-b-2 border-black-400 dark:border-dark-t' : ''}`}
          onClick={() => setSelectTab('edit')}
        >
          <p
            className={`lg:font-semibold lg:text-[2rem] lg:leading-[3.2rem] sm:font-bold sm:text-[1.4rem] sm:leading-[2.4rem] ${selectTab === 'edit' ? 'text-[#2B2B2B] dark:text-dark-t' : 'text-gray-400'}`}
          >
            이사 정보
          </p>
        </div>
      </Link>
    </div>
  );
}
