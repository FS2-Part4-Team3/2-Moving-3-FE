'use client';

import { useState } from 'react';

export default function ReviewTabs() {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div>
      <div className="flex items-center lg:gap-[4rem] bg-white shadow-custom7 lg:px-[26rem] lg:py-[3.2rem] ">
        <div className={`text-[2.4rem] font-semibold cursor-pointer `}>작성 가능한 리뷰</div>
        <div className={`text-[2.4rem] font-semibold cursor-pointer `}>내가 작성한 리뷰</div>
      </div>
    </div>
  );
}
