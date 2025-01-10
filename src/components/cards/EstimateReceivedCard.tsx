'use client';

import Image from 'next/image';
import heart from '@/../public/assets/driver/ic_empty_like.svg';
import star from '@/../public/assets/driver/ic_star_yellow.svg';
import type { EstimateReceivedCardProps } from '@/interfaces/Card/EstimateReceivedCardInterface';
import { priceFormat } from '@/utils/Format';
import MovingTypeChips from '../chips/MovingTypeChips';

export default function EstimateReceivedCard({ data }: EstimateReceivedCardProps) {
  console.log(data);
  return (
    <div className="w-full rounded-[1.6rem] border border-line-100 pt-[2rem] pb-[1.4rem] px-[2.4rem] flex flex-col gap-[1.6rem] shadow-[-0.2rem_-0.2rem_1rem_rgba(220,220,220,0.14)] shadow-[0.2rem_0.2rem_1rem_rgba(220,220,220,0.14)]">
      <MovingTypeChips type={data.moveInfo.type} />
      <p className="font-semibold text-[2rem] leading-[3.2rem] text-black-300">{data.comment}</p>
      <div className="rounded-[0.6rem] border border-line-100 p-[1.6rem] gap-[2.4rem] flex shadow-[0.4rem_-0.2rem_1rem_rgba(220,220,220,0.14)]">
        <Image
          src={data.driver.image}
          alt="profile"
          width={56}
          height={56}
          className="lg:block sm:hidden border-2 border-blue-400 rounded-full"
        />
        <div className="flex flex-col w-full">
          <div className="w-full flex justify-between">
            <p className="font-semibold text-[1.8rem] leading-[2.6rem] text-black-300">{data.driver.name} 기사님</p>
            <div className="flex gap-[0.2rem] items-center">
              <Image src={heart} alt="heart" width={24} height={24} />
              <p className="font-medium text-[1.8rem] leading-[2.6rem]">{data.driver.favoriteCount}</p>
            </div>
          </div>
          <div className="flex gap-[1.6rem] items-center">
            <div className="flex gap-[0.6rem] items-center">
              <Image src={star} alt="star" width={24} height={24} />
              <p className="font-medium text-[1.6rem] leading-[2.6rem] text-black-300">{data.driver.score}</p>
              <p className="font-medium text-[1.6rem] leading-[2.6rem] text-gray-300">({data.driver.reviewCount})</p>
            </div>
            <div className="h-[1.4rem] border border-line-200" />
            <div className="flex gap-[0.6rem] items-center">
              <p className="font-medium text-[1.6rem] leading-[2.6rem] text-gray-300">경력</p>
              <p className="font-medium text-[1.6rem] leading-[2.6rem] text-black-300">{data.driver.career}년</p>
            </div>
            <div className="h-[1.4rem] border border-line-200" />
            <div className="flex gap-[0.6rem] items-center">
              <p className="font-medium text-[1.6rem] leading-[2.6rem] text-black-300">{data.driver.applyCount}건</p>
              <p className="font-medium text-[1.6rem] leading-[2.6rem] text-gray-300">확정</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-[1.6rem] items-center justify-end">
        <p className="font-medium text-[1.8rem] leading-[2.6rem] text-black-400">견적 금액</p>
        <p className="font-bold text-[2.4rem] leading-[3.2rem]">{priceFormat(data.price)}원</p>
      </div>
    </div>
  );
}
