import Image from 'next/image';
import appointment from '@/../public/assets/chips/ic_appointment.svg';
import company_mov from '@/../public/assets/chips/ic_company_moving.svg';
import home_mov from '@/../public/assets/chips/ic_home_moving.svg';
import small_mov from '@/../public/assets/chips/ic_small_moving.svg';
import type { MovingTypeChipsProps } from '@/interfaces/chip/MovingTypeChipInterface';

export default function MovingTypeChips({ type }: MovingTypeChipsProps) {
  return (
    <div>
      {type === 'SMALL' && (
        <div className="w-fit">
          <div className="flex items-center rounded-[0.4rem] lg:py-[0.4rem] sm:py-[0.2rem] lg:px-[0.5rem] sm:pr-[0.6rem] sm:pl-[0.2rem] lg:gap-[0.4rem] sm:gap-[0.2rem] bg-blue-100">
            <Image src={small_mov} alt="logo" width={24} height={24} className="lg:block sm:hidden" />
            <Image src={small_mov} alt="logo" width={20} height={20} className="lg:hidden sm:block" />
            <p className="font-semibold lg:text-[1.6rem] sm:text-[1.3rem] lg:leading-[2.6rem] sm:leading-[2.2rem] text-blue-300">
              소형이사
            </p>
          </div>
        </div>
      )}
      {type === 'HOME' && (
        <div className="w-fit">
          <div className="flex items-center rounded-[0.4rem] lg:py-[0.4rem] sm:py-[0.2rem] lg:px-[0.5rem] sm:pr-[0.6rem] sm:pl-[0.2rem] lg:gap-[0.4rem] sm:gap-[0.2rem] bg-blue-100">
            <Image src={home_mov} alt="logo" width={24} height={24} className="lg:block sm:hidden" />
            <Image src={home_mov} alt="logo" width={20} height={20} className="lg:hidden sm:block" />
            <p className="font-semibold lg:text-[1.6rem] sm:text-[1.3rem] lg:leading-[2.6rem] sm:leading-[2.2rem] text-blue-300">
              가정이사
            </p>
          </div>
        </div>
      )}
      {type === 'OFFICE' && (
        <div className="w-fit">
          <div className="flex items-center rounded-[0.4rem] lg:py-[0.4rem] sm:py-[0.2rem] lg:px-[0.5rem] sm:pr-[0.6rem] sm:pl-[0.2rem] lg:gap-[0.4rem] sm:gap-[0.2rem] bg-blue-100">
            <Image src={company_mov} alt="logo" width={24} height={24} className="lg:block sm:hidden" />
            <Image src={company_mov} alt="logo" width={20} height={20} className="lg:hidden sm:block" />
            <p className="font-semibold lg:text-[1.6rem] sm:text-[1.3rem] lg:leading-[2.6rem] sm:leading-[2.2rem] text-blue-300">
              사무실이사
            </p>
          </div>
        </div>
      )}
      {type === 'APPOINTMENT' && (
        <div className="w-fit">
          <div className="flex items-center rounded-[0.4rem] lg:py-[0.4rem] sm:py-[0.2rem] lg:px-[0.5rem] sm:pr-[0.6rem] sm:pl-[0.2rem] lg:gap-[0.4rem] sm:gap-[0.2rem] bg-red-100">
            <Image src={appointment} alt="logo" width={24} height={24} className="lg:block sm:hidden" />
            <Image src={appointment} alt="logo" width={20} height={20} className="lg:hidden sm:block" />
            <p className="font-semibold lg:text-[1.6rem] sm:text-[1.3rem] lg:leading-[2.6rem] sm:leading-[2.2rem] text-red-200">
              지정 견적 요청
            </p>
          </div>
        </div>
      )}
      {type === 'WAITING' && (
        <div className="w-fit">
          <div className="flex items-center rounded-[0.4rem] lg:py-[0.4rem] sm:py-[0.2rem] px-[0.6rem] bg-[#F2F3F8]">
            <p className="font-semibold lg:text-[1.6rem] sm:text-[1.3rem] lg:leading-[2.6rem] sm:leading-[2.2rem] text-blue-400">
              견적 대기
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
