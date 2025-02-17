'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import arrow from '@/../public/assets/common/dropdown/chevron-down_gray.svg';
import sortMenu from '@/constants/sortMenu';
import { setOrderBy } from '@/store/slices/driversSlice';

export default function SortDropdown() {
  const dispatch = useDispatch();

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
    const menuObj = sortMenu.find(m => m.name === menu);
    if (menuObj) {
      dispatch(setOrderBy(menuObj.code ?? 'MostReviewed'));
    }
    setIsDropdownOpen(false);
  };

  return (
    <div>
      <div
        className="w-auto flex items-center gap-[0.2rem] py-[0.6rem] pr-[0.6rem] pl-[0.8rem] cursor-pointer"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <p className="font-semibold text-[1.2rem] leading-[2rem] text-center text-black-400 dark:text-dark-t">
          {selectedMenu || '리뷰 많은 순'}
        </p>
        <Image src={arrow} alt="arrow" width={20} height={20} />
      </div>
      {isDropdownOpen && (
        <div className="absolute bg-white dark:bg-dark-p rounded-[0.8rem] border border-line-100 w-[9.1rem]">
          {sortMenu.map((item, index) => (
            <div
              key={index}
              className="w-[9.1rem] h-[3.2rem] py-[0.6rem] pr-[0.6rem] pl-[0.8rem] gap-[0.2rem] cursor-pointer"
              onClick={() => handleMenuClick(item.name)}
            >
              <p className="font-medium text-[1.2rem] leading-[1.8rem] text-black-400 dark:text-dark-t ">{item.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
