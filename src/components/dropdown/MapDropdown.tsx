import Image from 'next/image';
import { useState } from 'react';
import arrow from '@/../public/assets/common/dropdown/chevron-down.svg';

export default function MapDropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
    setIsDropdownOpen(false);
  };

  return (
    <div className="w-[13rem]">
      <div
        className="border border-line-200 py-[0.6rem] px-[1rem] rounded-[0.8rem] flex justify-between cursor-pointer"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <p className={`font-semibold text-[2.4rem] leading-[2.6rem] ${selectedMenu ? 'text-black' : 'text-gray-400'}`}>
          {selectedMenu || '선택'}
        </p>
        <Image src={arrow} alt="arrow" width={20} height={20} />
      </div>
      {isDropdownOpen && (
        <div className="absolute flex flex-col items-start justify-center w-[11.5rem] bg-white rounded-[0.8rem] border border-line-200 mt-[0.8rem]">
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
        </div>
      )}
    </div>
  );
}
