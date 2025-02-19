'use client';

import Image from 'next/image';
import standardProfile from '@/../public/assets/common/gnb/standard_profile.svg';
import heart from '@/../public/assets/driver/ic_empty_like.svg';
import red_heart from '@/../public/assets/driver/ic_like_on.svg';
import star from '@/../public/assets/driver/ic_star_yellow.svg';
import type { EstimateReceivedCardProps } from '@/interfaces/Card/EstimateReceivedCardInterface';
import { priceFormat } from '@/utils/Format';
import MovingTypeChips from '../chips/MovingTypeChips';

export default function EstimateReceivedCard({ data, serviceType, isConfirmed }: EstimateReceivedCardProps) {
  return (
    <div className="w-full rounded-[1.6rem] border border-line-100 lg:pt-[2rem] lg:pb-[1.4rem] lg:px-[2.4rem] sm:pt-[1.6rem] sm:pb-[1rem] sm:px-[1.4rem] flex flex-col lg:gap-[1.6rem] sm:gap-[1.4rem] shadow-[0.2rem_-0.2rem_1rem_rgba(220,220,220,0.14)] dark:bg-dark-p">
      <div className="flex lg:gap-[1.2rem] sm:gap-[0.8rem]">
        {isConfirmed && <MovingTypeChips type="RECEIVED" />}
        <MovingTypeChips type={serviceType} />
        {data.isSpecificRequest && <MovingTypeChips type="APPOINTMENT" />}
      </div>
      <p className="font-semibold lg:text-[2rem] sm:text-[1.4rem] lg:leading-[3.2rem] sm:leading-[2.4rem] text-black-300 dark:text-dark-t">
        {data.comment}
      </p>
      <div className="rounded-[0.6rem] border border-line-100 lg:p-[1.6rem] sm:p-[1rem] lg:gap-[2.4rem] sm:gap-[1.2rem] flex shadow-[0.4rem_0.4rem_1rem_rgba(220,220,220,0.14)]">
        {data.driver.image ? (
          <>
            <Image
              src={data.driver.image}
              alt="profile"
              width={56}
              height={56}
              className="lg:block sm:hidden border-2 border-blue-400 rounded-full"
            />
            <div className="w-[4.6rem] h-[4.6rem] lg:hidden sm:block">
              <Image
                src={data.driver.image}
                alt="profile"
                width={46}
                height={46}
                className="lg:hidden sm:block border-2 border-blue-400 rounded-full"
              />
            </div>
          </>
        ) : (
          <>
            <Image
              src={standardProfile}
              alt="profile"
              width={56}
              height={56}
              className="lg:block sm:hidden border-2 border-blue-400 rounded-full"
            />
            <div className="w-[4.6rem] h-[4.6rem] lg:hidden sm:block">
              <Image
                src={standardProfile}
                alt="profile"
                width={46}
                height={46}
                className="lg:hidden sm:block border-2 border-blue-400 rounded-full"
              />
            </div>
          </>
        )}
        <div className="flex flex-col w-full">
          <div className="w-full flex justify-between">
            <p className="font-semibold lg:text-[1.8rem] lg:leading-[2.6rem] sm:text-[1.4rem] sm:leading-[2.4rem] text-black-300 dark:text-dark-t">
              {data.driver.name} 기사님
            </p>
            <div className="flex gap-[0.2rem] items-center">
              <Image src={data.driver.isliked ? red_heart : heart} alt="heart" width={24} height={24} />
              <p className="font-medium lg:text-[1.8rem] lg:leading-[2.6rem] sm:text-[1.3rem] sm:leading-[2.2rem] text-blue-400 dark:text-dark-t">
                {data.driver.likeCount}
              </p>
            </div>
          </div>
          <div className="flex lg:gap-[1.6rem] sm:gap-[0.8rem] items-center">
            <div className="flex lg:gap-[0.6rem] sm:gap-[0.2rem] items-center">
              <Image src={star} alt="star" width={24} height={24} className="lg:block sm:hidden" />
              <Image src={star} alt="star" width={20} height={20} className="lg:hidden sm:block" />
              <p className="font-medium lg:text-[1.6rem] lg:leading-[2.6rem] sm:text-[1.3rem] sm:leading-[2.2rem] text-black-300 dark:text-dark-t">
                {data.driver.rating}
              </p>
              <p className="font-medium lg:text-[1.6rem] lg:leading-[2.6rem] sm:text-[1.3rem] sm:leading-[2.2rem] text-gray-300">
                ({data.driver.reviewCount})
              </p>
            </div>
            <div className="h-[1.4rem] border border-line-200" />
            <div className="flex lg:gap-[0.6rem] sm:gap-[0.4rem] items-center">
              <p className="font-medium lg:text-[1.6rem] lg:leading-[2.6rem] sm:text-[1.3rem] sm:leading-[2.2rem] text-gray-300">
                경력
              </p>
              <p className="font-medium lg:text-[1.6rem] lg:leading-[2.6rem] sm:text-[1.3rem] sm:leading-[2.2rem] text-black-300 dark:text-dark-t">
                {data.driver.career}년
              </p>
            </div>
            <div className="h-[1.4rem] border border-line-200" />
            <div className="flex lg:gap-[0.6rem] sm:gap-[0.4rem] items-center">
              <p className="font-medium lg:text-[1.6rem] lg:leading-[2.6rem] sm:text-[1.3rem] sm:leading-[2.2rem] text-black-300 dark:text-dark-t">
                {data.driver.applyCount}건
              </p>
              <p className="font-medium lg:text-[1.6rem] lg:leading-[2.6rem] sm:text-[1.3rem] sm:leading-[2.2rem] text-gray-300">
                확정
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex lg:gap-[1.6rem] sm:gap-[0.8rem] items-center justify-end">
        <p className="font-medium lg:text-[1.8rem] lg:leading-[2.6rem] sm:text-[1.4rem] sm:leading-[2.4rem] text-black-400 dark:text-dark-t">
          견적 금액
        </p>
        <p className="font-bold lg:text-[2.4rem] lg:leading-[3.2rem] sm:text-[1.8rem] sm:leading-[2.6rem] text-black-400 dark:text-dark-t">
          {priceFormat(data.price)}원
        </p>
      </div>
    </div>
  );
}
