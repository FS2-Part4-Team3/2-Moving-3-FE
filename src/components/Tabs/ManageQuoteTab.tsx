'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ManageQuoteTab() {
  const pathname = usePathname();
  const [selectTab, setSelectTab] = useState<'sent' | 'rejected'>('sent');

  useEffect(() => {
    if (pathname === '/driver/my-quote/sent') {
      setSelectTab('sent');
    } else if (pathname === '/normal/my-quote/rejected') {
      setSelectTab('rejected');
    }
  }, [pathname]);

  return (
    <div className="flex lg:gap-[3.2rem] sm:gap-[2.4rem]">
      <Link href="/driver/my-quote/send">
        <div
          className={`lg:py-[1.6rem] sm:py-[1.5rem] cursor-pointer ${selectTab === 'sent' ? 'border-b-2 border-black-400' : ''}`}
          onClick={() => setSelectTab('sent')}
        >
          <p
            className={`lg:font-semibold lg:text-[2rem] lg:leading-[3.2rem] sm:font-bold sm:text-[1.4rem] sm:leading-[2.4rem] ${selectTab === 'sent' ? 'text-[#2B2B2B]' : 'text-gray-400'}`}
          >
            보낸 견적 조회
          </p>
        </div>
      </Link>
      <Link href="/driver/my-quote/rejected">
        <div
          className={`lg:py-[1.6rem] sm:py-[1.5rem] cursor-pointer ${selectTab === 'rejected' ? 'border-b-2 border-black-400' : ''}`}
          onClick={() => setSelectTab('rejected')}
        >
          <p
            className={`lg:font-semibold lg:text-[2rem] lg:leading-[3.2rem] sm:font-bold sm:text-[1.4rem] sm:leading-[2.4rem] ${selectTab === 'rejected' ? 'text-[#2B2B2B]' : 'text-gray-400'}`}
          >
            반려 요청
          </p>
        </div>
      </Link>
    </div>
  );
}
