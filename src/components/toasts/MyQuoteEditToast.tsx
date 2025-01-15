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
    <div>
      <Image src={info} alt="info" width={24} height={24} />
      <p>견적을 보낸 기사님이 있어서 견적서를 수정할 수 없어요!</p>
    </div>
  );
}
