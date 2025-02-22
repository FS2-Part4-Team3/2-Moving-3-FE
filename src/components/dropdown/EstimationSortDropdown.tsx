'use client';

import { animated, useSpring } from '@react-spring/web';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import blueArrow from '@/../public/assets/common/dropdown/chevron-down-clicked.svg';
import arrow from '@/../public/assets/common/dropdown/chevron-down.svg';
import arrow_gray from '@/../public/assets/common/dropdown/chevron-down_gray.svg';
import { EstimationSortDropdownProps } from '@/interfaces/Dropdown/SortMenuInterface';

export default function EstimationSortDropdown({ onChange }: EstimationSortDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<'all' | 'confirmed'>('all');

  const { theme } = useTheme();

  const handleMenuClick = (option: 'all' | 'confirmed') => {
    setSelectedOption(option);
    onChange(option);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    if (isDropdownOpen) {
      setIsDropdownVisible(true);
    } else {
      setTimeout(() => setIsDropdownVisible(false), 300);
    }
  }, [isDropdownOpen]);

  const sortDropdownAnimation = useSpring({
    opacity: isDropdownOpen ? 1 : 0,
    transform: isDropdownOpen ? 'translateY(0)' : 'translateY(-10px)',
    height: 'auto',
    config: { tension: 170, friction: 30 },
  });

  const optionInKo = selectedOption === 'all' ? '전체' : '확정한 견적서';

  return (
    <div>
      <div
        className={`lg:w-[19rem] lg:h-[6.4rem] sm:w-[12.7rem] lg:rounded-[1.6rem] sm:rounded-[0.8rem] lg:py-[1.6rem] sm:py-[0.6rem] lg:px-[2.4rem] sm:pr-[1rem] sm:pl-[1.4rem] flex justify-between items-center cursor-pointer mb-[0.8rem] ${isDropdownOpen ? 'bg-blue-50 dark:bg-dark-p border border-blue-300' : 'bg-white dark:bg-dark-p border border-line-100'}`}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <p
          className={`font-normal lg:text-[1.8rem] sm:text-[1.4rem] lg:leading-[2.6rem] sm:leading-[2.4rem] ${isDropdownOpen ? 'text-blue-300' : 'text-black-400 dark:text-dark-t'}`}
        >
          {optionInKo}
        </p>
        <Image
          src={theme === 'dark' ? (isDropdownOpen ? blueArrow : arrow_gray) : isDropdownOpen ? blueArrow : arrow}
          alt="arrow"
          width={36}
          height={36}
          className="lg:block sm:hidden"
        />
        <Image
          src={theme === 'dark' ? (isDropdownOpen ? blueArrow : arrow_gray) : isDropdownOpen ? blueArrow : arrow}
          alt="arrow"
          width={20}
          height={20}
          className="lg:hidden sm:block"
        />
      </div>
      {isDropdownVisible && (
        <animated.div
          style={sortDropdownAnimation}
          className="absolute bg-white dark:bg-dark-p rounded-[1.6rem] border border-line-200 shadow-[0.4rem_0.4rem_1rem_rgba(220,220,220,0.25)] dark:shadow lg:w-[32.8rem] sm:w-[12.7rem]"
        >
          <p
            className="lg:py-[1.6rem] sm:py-[0.6rem] lg:px-[2.4rem] sm:px-[1.4rem] font-medium lg:text-[1.8rem] lg:leading-[2.6rem] sm:text-[1.4rem] sm:leading-[2.4rem] cursor-pointer"
            onClick={() => {
              handleMenuClick('all');
            }}
          >
            전체
          </p>
          <p
            className="lg:py-[1.6rem] sm:py-[0.6rem] lg:px-[2.4rem] sm:px-[1.4rem] font-medium lg:text-[1.8rem] lg:leading-[2.6rem] sm:text-[1.4rem] sm:leading-[2.4rem] cursor-pointer"
            onClick={() => {
              handleMenuClick('confirmed');
            }}
          >
            확정한 견적서
          </p>
        </animated.div>
      )}
    </div>
  );
}
