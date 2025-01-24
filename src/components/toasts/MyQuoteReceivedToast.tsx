import Image from 'next/image';
import info from '@/../public/assets/toast/ic_blue_info.svg';

export default function MyQuoteReceivedToast() {
  return (
    <div className="w-full rounded-[1.2rem] border border-blue-200 lg:gap-[1.6rem] sm:gap-[0.8rem] lg:py-[2.4rem] lg:px-[3.2rem] sm:py-[1rem] sm:px-[2.4rem] flex items-center bg-blue-100 shadow-custom10">
      <Image src={info} alt="info" width={24} height={24} />
      <p className="font-semibold lg:text-[1.6rem] lg:leading-[2.6rem] sm:text-[1.3rem] sm:leading-[2.2rem] text-blue-300">
        확정하지 않은 견적이에요!
      </p>
    </div>
  );
}
