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
      <div className="flex items-center lg:gap-[4rem] bg-white shadow-custom7 lg:px-[26rem] lg:py-[3.2rem] ">
        <Link href="/normal/my-page/writable-review">
          <div className={`text-[2.4rem] font-semibold cursor-pointer ${isSelected ? 'text-gray-400' : 'text-black-400'} `}>
            작성 가능한 리뷰
          </div>
        </Link>
        <Link href="/normal/my-page/written-review">
          <div className={`text-[2.4rem] font-semibold cursor-pointer ${isSelected ? 'text-gray-400' : 'text-black-400'} `}>
            내가 작성한 리뷰
          </div>
        </Link>
      </div>
    </div>
  );
}
