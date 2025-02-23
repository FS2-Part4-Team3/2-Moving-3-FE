import { animated, useSpring } from '@react-spring/web';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import arrow from '@/../public/assets/common/dropdown/chevron-down.svg';
import { MapDropdownProps } from '@/interfaces/Dropdown/MapInterface';

export default function MapDropdown({ selectedMenu, setSelectedMenu }: MapDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    if (isDropdownOpen) {
      setIsDropdownVisible(true);
    } else {
      setTimeout(() => setIsDropdownVisible(false), 300);
    }
  }, [isDropdownOpen]);

  const mapDropdownAnimation = useSpring({
    opacity: isDropdownOpen ? 1 : 0,
    transform: isDropdownOpen ? 'translateY(0)' : 'translateY(-10px)',
    height: 'auto',
    config: { tension: 170, friction: 30 },
  });

  return (
    <div className="w-[13rem]">
      <div
        className="border border-line-200 py-[0.6rem] px-[1rem] rounded-[0.8rem] flex justify-between cursor-pointer dark:bg-dark-p"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <p
          className={`font-semibold text-[2.4rem] leading-[2.6rem] ${selectedMenu ? 'text-black dark:text-dark-t' : 'text-gray-400'}`}
        >
          {selectedMenu || '선택'}
        </p>
        <Image src={arrow} alt="arrow" width={20} height={20} />
      </div>
      {isDropdownVisible && (
        <animated.div
          style={mapDropdownAnimation}
          className="absolute flex flex-col items-start justify-center w-[11.5rem] bg-white dark:bg-dark-p rounded-[0.8rem] border border-line-200 mt-[0.8rem]"
        >
          <p
            className="font-medium text-[1.8rem] leading-[2.4rem] py-[0.6rem] px-[1.4rem] cursor-pointer"
            onClick={() => handleMenuClick('출발지')}
          >
            출발지
          </p>
          <p
            className="font-medium text-[1.8rem] leading-[2.4rem] py-[0.6rem] px-[1.4rem] cursor-pointer"
            onClick={() => handleMenuClick('도착지')}
          >
            도착지
          </p>
        </animated.div>
      )}
    </div>
  );
}
