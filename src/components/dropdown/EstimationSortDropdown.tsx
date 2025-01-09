import Image from 'next/image';
import { useState } from 'react';
import blueArrow from '@/../public/assets/common/dropdown/chevron-down-clicked.svg';
import arrow from '@/../public/assets/common/dropdown/chevron-down.svg';

export default function EstimationSortDropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  return (
    <>
      <div
        className={`w-[19rem] h-[6.4rem] rounded-[1.6rem] py-[1.6rem] px-[2.4rem] flex justify-between items-center cursor-pointer mb-[0.8rem] ${isDropdownOpen ? 'bg-blue-50 border border-blue-300' : 'bg-white border border-line-100'}`}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <p className={`font-normal text-[1.8rem] leading-[2.6rem] ${isDropdownOpen ? 'text-blue-300' : 'text-black-400'}`}>
          전체
        </p>
        <Image src={isDropdownOpen ? blueArrow : arrow} alt="arrow" width={36} height={36} />
      </div>
      {isDropdownOpen && (
        <div className="absolute bg-white rounded-[1.6rem] border border-line-200 shadow-[0.4rem_0.4rem_1rem_rgba(220,220,220,0.25)] w-[32.8rem]">
          <p className="py-[1.6rem] px-[2.4rem] font-medium text-[1.8rem] leading-[2.6rem]">전체</p>
          <p className="py-[1.6rem] px-[2.4rem] font-medium text-[1.8rem] leading-[2.6rem]">확정한 견적서</p>
        </div>
      )}
      <h1>test</h1>
    </>
  );
}
