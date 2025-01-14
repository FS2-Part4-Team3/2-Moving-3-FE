'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ReviewTabs() {
  const pathName = usePathname();
  const [isSelected, setIsSelected] = useState<'able' | 'my'>('able');

  useEffect(() => {
    if (pathName === '/normal/my-page/writable-review') {
      setIsSelected('able');
    }
    if (pathName === '/normal/my-page/written-review') {
      setIsSelected('my');
    }
  }, [pathName]);

  return (
    <div>
      <div className="lg:w-full md:w-[74.4rem] sm:W-[37.5rem] lg:h-[9.6rem] md:h-[5.4rem] sm:h-[5.4rem] flex items-center lg:gap-[4rem] md:gap-[2.4rem] sm:gap-[2.4remh] bg-white shadow-custom7 lg:px-[26rem] lg:py-[3.2rem] md:px-[7.2rem] md:py-[1rem] sm:px-[2.4rem] sm:py-[1rem] ">
        <Link href="/normal/my-page/writable-review">
          <div
            className={`lg:h-[9.6rem] flex items-center cursor-pointer ${isSelected === 'able' ? 'text-black-400 border-b-[0.4rem] border-blue-400 ' : 'text-gray-400'} `}
            onClick={() => setIsSelected('able')}
          >
            <span className="lg:text-[2.4rem] md:text-[1.4rem] sm:text-[1.4rem] font-semibold ">작성 가능한 리뷰</span>
          </div>
        </Link>
        <Link href="/normal/my-page/written-review">
          <div
            className={`lg:h-[9.6rem] flex items-center cursor-pointer ${isSelected === 'my' ? 'text-black-400 border-b-[0.4rem] border-blue-400' : 'text-gray-400'} `}
            onClick={() => setIsSelected('my')}
          >
            <span className="lg:text-[2.4rem] md:text-[1.4rem] sm:text-[1.4rem] font-semibold ">내가 작성한 리뷰</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
