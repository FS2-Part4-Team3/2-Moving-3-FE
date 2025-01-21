import Image from 'next/image';
import redHeart from '@/../public/assets/driver/ic_like_on.svg';
import star from '@/../public/assets/driver/ic_star_yellow.svg';
import { DibsDriverPageCardProps } from '@/interfaces/Card/DibsDriverPageCardInterface';
import MovingTypeChips from '../chips/MovingTypeChips';

export default function DibsDriverPageCard({ data }: DibsDriverPageCardProps) {
  return (
    <div className="w-full rounded-[1.6rem] border lg:py-[2rem] lg:px-[2.4rem] sm:py-[1.6rem] sm:px-[1.4rem] border-line-100 shadow-custom3 flex flex-col lg:gap-[1.6rem] sm:gap-[1.4rem]">
      <div className="w-full flex lg:gap-[1.2rem] sm:gap-[0.8rem]">
        {data.serviceType.map((item: string) => (
          <MovingTypeChips type={item as 'SMALL' | 'HOME' | 'OFFICE' | 'APPOINTMENT' | 'WAITING' | 'RECEIVED'} />
        ))}
      </div>
      <div className="w-full rounded-[0.6rem] border border-line-100 lg:py-[1.6rem] lg:px-[1.8rem] sm:p-[1rem] flex lg:gap-[2.4rem] sm:gap-[1.2rem] shadow-custom5">
        <div>
          {data.image && (
            <>
              <Image
                src={data.image}
                alt="profile"
                width={80}
                height={80}
                className="border-2 border-blue-400 rounded-full lg:block sm:hidden"
              />
              <Image
                src={data.image}
                alt="profile"
                width={46}
                height={46}
                className="border-2 border-blue-400 rounded-full lg:hidden sm:block"
              />
            </>
          )}
        </div>
        <div className="w-full flex flex-col lg:gap-[1.6rem] sm:gap-[1.2rem]">
          <div className="w-full flex items-center justify-between">
            <p className="font-semibold lg:text-[1.8rem] lg:leading-[2.6rem] sm:text-[1.4rem] sm:leading-[2.4rem] text-black-300">
              {data.name} 기사님
            </p>
            <div className="flex lg:gap-[0.4rem] sm:gap-[0.2rem] items-center">
              <Image src={redHeart} alt="heart" width={24} height={24} />
              <p className="font-medium lg:text-[1.8rem] lg:leading-[2.6rem] sm:text-[1.3rem] sm:leading-[2.2rem]">
                {data.likeCount}
              </p>
            </div>
          </div>
          <div className="w-full flex lg:gap-[1.6rem] md:gap-[0.8rem] md:justify-start sm:justify-between items-center">
            <div className="flex lg:gap-[0.6rem] sm:gap-[0.2rem]">
              <Image src={star} alt="star" width={24} height={24} className="lg:block sm:hidden" />
              <Image src={star} alt="star" width={20} height={20} className="lg:hidden sm:block" />
              <p className="font-medium lg:text-[1.6rem] lg:leading-[2.6rem] sm:text-[1.3rem] sm:leading-[2.2rem] text-black-300">
                {data.rating}
              </p>
              <p className="font-medium lg:text-[1.6rem] lg:leading-[2.6rem] sm:text-[1.3rem] sm:leading-[2.2rem] text-gray-300">
                ({data.reviewCount})
              </p>
            </div>
            <div className="border border-line-200 h-[1.4rem]" />
            <div className="flex lg:gap-[0.6rem] sm:gap-[0.2rem]">
              <p className="font-medium lg:text-[1.6rem] lg:leading-[2.6rem] sm:text-[1.3rem] sm:leading-[2.2rem] text-gray-300">
                경력
              </p>
              <p className="font-medium lg:text-[1.6rem] lg:leading-[2.6rem] sm:text-[1.3rem] sm:leading-[2.2rem] text-black-300">
                {data.career}년
              </p>
            </div>
            <div className="border border-line-200 h-[1.4rem]" />
            <div className="flex lg:gap-[0.6rem] sm:gap-[0.2rem]">
              <p className="font-medium lg:text-[1.6rem] lg:leading-[2.6rem] sm:text-[1.3rem] sm:leading-[2.2rem] text-black-300">
                {data.applyCount}건
              </p>
              <p className="font-medium lg:text-[1.6rem] lg:leading-[2.6rem] sm:text-[1.3rem] sm:leading-[2.2rem] text-gray-300">
                확정
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
