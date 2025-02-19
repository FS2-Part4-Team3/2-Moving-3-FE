'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import clicked_arrow from '@/../public/assets/common/dropdown/chevron-down-clicked.svg';
import arrow_down from '@/../public/assets/common/dropdown/chevron-down.svg';
import reviewAnalysisTypes from '@/constants/reviewAnalysisMenu';
import { setFilter } from '@/store/slices/reviewAnalysisSlice';

export default function ReviewAnalysisDropdown() {
  const dispatch = useDispatch();

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
    const typeObj = reviewAnalysisTypes.find(r => r.type === menu);
    if (typeObj) {
      dispatch(setFilter(typeObj.code ?? undefined));
    }
    setIsDropdownOpen(false);
  };

  const handleResetClick = () => {
    dispatch(setFilter('ALL'));
    setSelectedMenu(null);
  };

  return (
    <div className="lg:w-[32.8rem] flex lg:flex-col lg:gap-[3.2rem] sm:gap-[1.2rem]">
      <div className="lg:block sm:hidden">
        <div className="border-b border-line-200 py-[1.6rem] px-[1rem] flex justify-between items-center">
          <p className="font-medium text-[2rem] leading-[3.2rem] text-black">필터</p>
          <p className="font-medium text-[1.6rem] leading-[2.6rem] text-gray-300 cursor-pointer" onClick={handleResetClick}>
            초기화
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-[1.6rem] relative">
        <p className="font-semibold text-[1.8rem] leading-[2.6rem] text-black-400 lg:block sm:hidden">지역을 선택해주세요</p>
        <div
          className={`lg:w-full lg:h-[6.4rem] sm:w-[8rem] sm:h-[3.6rem] lg:rounded-[1.6rem] sm:rounded-[0.8rem] border lg:py-[1.6rem] lg:px-[2.4rem] sm:py-[0.6rem] sm:pr-[1rem] sm:pl-[1.4rem] flex items-center justify-between cursor-pointer mb-[0.8rem] ${
            selectedMenu ? 'border-blue-300 bg-blue-50' : 'border-gray-100'
          }`}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <p
            className={`font-medium lg:text-[1.8rem] sm:text-[1.4rem] lg:leading-[2.6rem] sm:leading-[2.4rem] ${
              isDropdownOpen ? 'text-blue-300' : 'text-black-400'
            }`}
          >
            {selectedMenu || '지역'}
          </p>
          <Image
            src={isDropdownOpen ? clicked_arrow : arrow_down}
            alt="arrow"
            width={36}
            height={36}
            className="lg:block sm:hidden"
          />
          <Image
            src={isDropdownOpen ? clicked_arrow : arrow_down}
            alt="arrow"
            width={20}
            height={20}
            className="lg:hidden sm:block"
          />
        </div>
        {isDropdownOpen && (
          <div className="absolute w-auto border bg-white border-line-200 top-full lg:rounded-[1.6rem] sm:rounded-[0.8rem] pr-[0.5rem] py-[0.6rem] z-[2]">
            <div className="grid grid-cols-2 lg:h-[32rem] sm:h-[18rem] lg:w-auto sm:w-[15rem] overflow-y-auto overflow-x-hidden">
              {reviewAnalysisTypes.map((region, index) => (
                <div
                  key={index}
                  className={`lg:w-[16.4rem] lg:h-[6.4rem] lg:py-[1.6rem] lg:px-[2.4rem] sm:w-[7.5rem] sm:h-[3.6rem] sm:py-[0.6rem] sm:px-[1.4rem] font-medium lg:text-[1.8rem] sm:text-[1.4rem] lg:leading-[2.6rem] sm:leading-[2.4rem] text-black-400 cursor-pointer ${
                    index % 2 === 0 ? 'border-r border-line-200' : ''
                  }`}
                  onClick={() => handleMenuClick(region.type)}
                >
                  {region.type}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
