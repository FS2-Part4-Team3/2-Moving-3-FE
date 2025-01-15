'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import info from '@/../public/assets/toast/ic_red_info.svg';
import type { MyQuoteEditToastProps } from '@/interfaces/Toast/MyQuoteEditToastInterface';

export default function MyQuoteEditToast({ onClose }: MyQuoteEditToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 10000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-[3.5rem] left-1/2 transform -translate-x-1/2 lg:w-[120rem] md:w-[60rem] sm:w-[32.7rem] rounded-[1.2rem] border border-red-200 lg:gap-[1.6rem] sm:gap-[0.8rem] lg:py-[2.4rem] lg:px-[3.2rem] sm:py-[1rem] sm:px-[2.4rem] flex items-center bg-red-100">
      <Image src={info} alt="info" width={24} height={24} />
      <p className="font-semibold lg:text-[1.6rem] lg:leading-[2.6rem] sm:text-[1.3rem] sm:leading-[2.2rem] text-red-200 sm:text-center md:text-start">
        견적을 보낸 기사님이 있어서
        <br className="md:hidden sm:block" /> 견적서를 수정할 수 없어요!
      </p>
    </div>
  );
}
