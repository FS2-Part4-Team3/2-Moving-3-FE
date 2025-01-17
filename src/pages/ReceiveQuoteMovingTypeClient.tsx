'use client';

import Image from 'next/image';
import { useState } from 'react';
import button from '@/../public/assets/common/dropdown/dropdown-open-button.svg';
import MovingTypeFilterDropdown from '@/components/dropdown/MovingTypeFilterDropdown';

export default function ReceiveQuoteMovingTypeClient() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="flex lg:justify-start sm:justify-between lg:px-0 sm:px-[1rem]">
      <Image
        src={button}
        alt="button"
        width={32}
        height={32}
        onClick={handleClick}
        className="lg:hidden sm:block cursor-pointer"
      />
      {isModalOpen && <MovingTypeFilterDropdown onClick={handleClick} />}
      <div className="lg:block sm:hidden">
        <MovingTypeFilterDropdown onClick={handleClick} />
      </div>
    </div>
  );
}
