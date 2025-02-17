'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import arrow from '@/../public/assets/common/dropdown/chevron-down.svg';
import arrow_gray from '@/../public/assets/common/dropdown/chevron-down_gray.svg';
import sortMenu from '@/constants/driverSortMenu';
import { setOrderBy } from '@/store/slices/movesSlice';

export default function DriverSortDropdown() {
  const dispatch = useDispatch();

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);

  const { theme } = useTheme();

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
    const menuObj = sortMenu.find(m => m.name === menu);
    if (menuObj) {
      dispatch(setOrderBy(menuObj.code ?? 'UpcomingMoveDate'));
    }
    setIsDropdownOpen(false);
  };

  return (
    <div>
      <div
        className="py-[0.8rem] px-[1rem] gap-[1rem] flex items-center cursor-pointer"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <p className="font-medium text-[1.4rem] leading-[2.4rem] text-black-400 dark:text-dark-t">
          {selectedMenu || '이사 빠른 순'}
        </p>
        <Image src={theme === 'dark' ? arrow_gray : arrow} alt="arrow" width={20} height={20} />
      </div>
      {isDropdownOpen && (
        <div className="absolute rounded-[0.8rem] border border-line-100 w-fit bg-white dark:bg-dark-p">
          {sortMenu.map((item, index) => (
            <div
              key={index}
              className="py-[0.8rem] px-[1rem] gap-[1rem] cursor-pointer"
              onClick={() => handleMenuClick(item.name)}
            >
              <p className="font-medium text-[1.4rem] leading-[2.4rem] text-black-400 dark:text-dark-t">{item.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
