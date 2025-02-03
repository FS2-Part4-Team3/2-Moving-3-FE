import Image from 'next/image';
import standardProfile from '@/../public/assets/common/gnb/standard_profile.svg';
import like from '@/../public/assets/driver/ic_like.svg';
import star from '@/../public/assets/driver/ic_star_yellow.svg';
import WaitingQuoteCardClient from '@/_pages/WaitingQuoteCardClient';
import type { WaitingQuoteCardProps } from '@/interfaces/Card/WaitingQuoteCardInterface';
import AddressFormat, { DateFormat, priceFormat } from '@/utils/Format';
import MovingTypeChips from '../chips/MovingTypeChips';

export default function WaitingQuoteCard({ data }: WaitingQuoteCardProps) {
  return (
    <div className="w-full rounded-[1.6rem] border border-line-100 pt-[2.8rem] pb-[2.2rem] px-[2.4rem] flex flex-col lg:gap-[2.4rem] sm:gap-[1rem] shadow-[0.2rem_-0.2rem_1rem_rgba(220,220,220,0.14)] bg-white">
      <div className="flex flex-col lg:gap-[2.4rem] sm:gap-[1.4rem]">
        <div className="flex lg:gap-[1.2rem] sm:gap-[0.8rem]">
          <MovingTypeChips type="WAITING" />
          <MovingTypeChips type={data.moveInfo.type} />
        </div>
        <div className="flex flex-col lg:gap-[2.4rem] sm:gap-[1.4rem]">
          <div className="flex w-full lg:gap-[2.4rem] sm:gap-[1.2rem] py-[1.6rem] lg:px-[1.8rem] sm:px-[1rem] border border-line-100 rounded-[0.6rem] shadow-[-0.2rem_-0.2rem_1rem_rgba(220,220,220,0.14)]">
            {data.driver.image ? (
              <>
                <div className="w-[5.6rem] h-[5.6rem] lg:block sm:hidden">
                  <Image
                    src={data.driver.image}
                    alt="profile"
                    width={56}
                    height={56}
                    className="border-2 border-blue-400 rounded-full"
                  />
                </div>
                <div className="w-[4.6rem] h-[4.6rem] lg:hidden sm:block">
                  <Image
                    src={data.driver.image}
                    alt="profile"
                    width={46}
                    height={46}
                    className="border-2 border-blue-400 rounded-full"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="w-[5.6rem] h-[5.6rem] lg:block sm:hidden">
                  <Image
                    src={standardProfile}
                    alt="profile"
                    width={56}
                    height={56}
                    className="border-2 border-blue-400 rounded-full"
                  />
                </div>
                <div className="w-[4.6rem] h-[4.6rem] lg:hidden sm:block">
                  <Image
                    src={standardProfile}
                    alt="profile"
                    width={46}
                    height={46}
                    className="border-2 border-blue-400 rounded-full"
                  />
                </div>
              </>
            )}
            <div className="w-full flex flex-col items-center lg:gap-[0.8rem] sm:gap-[1.6rem]">
              <div className="w-full flex justify-between items-center">
                <p className="font-semibold lg:text-[1.8rem] lg:leading-[2.6rem] sm:text-[1.4rem] sm:leading-[2.4rem] text-black-300">
                  {data.driver.name}
                </p>
                <div className="flex lg:gap-[0.4rem] sm:gap-[0.2rem] items-center">
                  <Image src={like} alt="like" width={24} height={24} />
                  <p className="font-medium lg:text-[1.8rem] lg:leading-[2.6rem] sm:text-[1.3rem] sm:leading-[2.2rem] text-blue-400">
                    {data.driver.favoriteCount}
                  </p>
                </div>
              </div>
              <div className="flex lg:gap-[1.6rem] sm:gap-[0.8rem] justify-start items-center w-full">
                <div className="flex lg:gap-[0.6rem] sm:gap-[0.2rem] items-center">
                  <Image src={star} alt="star" width={24} height={24} className="lg:block sm:hidden" />
                  <Image src={star} alt="star" width={20} height={20} className="lg:hidden sm:block" />
                  <p className="font-medium lg:text-[1.6rem] sm:text-[1.3rem] lg:leading-[2.6rem] sm:leading-[2.2rem] text-black-300">
                    {data.driver.score}
                  </p>
                  <p className="font-medium lg:text-[1.6rem] lg:leading-[2.6rem] sm:text-[1.3rem] sm:leading-[2.2rem] text-gray-300">
                    ({data.driver.reviewCount})
                  </p>
                </div>
                <div className="h-[1.4rem] border border-line-200" />
                <div className="flex lg:gap-[0.6rem] sm:gap-[0.4rem]">
                  <p className="font-medium lg:text-[1.6rem] lg:leading-[2.6rem] sm:text-[1.3rem] sm:leading-[2.2rem] text-gray-300">
                    경력
                  </p>
                  <p className="font-medium lg:text-[1.6rem] lg:leading-[2.6rem] sm:text-[1.3rem] sm:leading-[2.2rem] text-black-300">
                    {data.driver.career}년
                  </p>
                </div>
                <div className="h-[1.4rem] border border-line-200" />
                <div className="flex lg:gap-[0.6rem] sm:gap-[0.4rem]">
                  <p className="font-medium lg:text-[1.6rem] lg:leading-[2.6rem] sm:text-[1.3rem] sm:leading-[2.2rem] text-black-300">
                    {data.driver.applyCount}건
                  </p>
                  <p className="font-medium lg:text-[1.6rem] lg:leading-[2.6rem] sm:text-[1.3rem] sm:leading-[2.2rem] text-gray-300">
                    확정
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex lg:flex-row sm:flex-col lg:gap-[1.6rem] sm:gap-[1.4rem] items-center">
            <div className="flex gap-[0.6rem] items-center sm:w-full lg:w-auto">
              <p className="rounded-[0.4rem] lg:py-[0.4rem] sm:py-[0.2rem] px-[0.6rem] bg-background-400 font-normal sm:text-[1.4rem] lg:leading-[2.6rem] sm:leading-[2.4rem] text-gray-500">
                이사일
              </p>
              <p className="font-medium lg:leading-[2.6rem] sm:text-[1.4rem] sm:leading-[2.4rem] text-black-300">
                {DateFormat(data.moveInfo.date)}
              </p>
            </div>
            <div className="h-[1.6rem] border border-line-200 sm:hidden lg:block" />
            <div className="flex sm:flex-row lg:gap-[1.6rem] sm:gap-[1.4rem] sm:justify-start sm:w-full lg:w-auto items-center">
              <div className="flex gap-[0.6rem] items-center">
                <p className="rounded-[0.4rem] lg:py-[0.4rem] sm:py-[0.2rem] px-[0.6rem] bg-background-400 font-normal sm:text-[1.4rem] lg:leading-[2.6rem] sm:leading-[2.4rem] text-gray-500">
                  출발
                </p>
                <p className="font-medium lg:leading-[2.6rem] sm:text-[1.4rem] sm:leading-[2.4rem] text-black-300">
                  {AddressFormat(data.moveInfo.fromAddress)}
                </p>
              </div>
              <div className="h-[1.6rem] border border-line-200" />
              <div className="flex gap-[0.6rem] items-center">
                <p className="rounded-[0.4rem] lg:py-[0.4rem] sm:py-[0.2rem] px-[0.6rem] bg-background-400 font-normal sm:text-[1.4rem] lg:leading-[2.6rem] sm:leading-[2.4rem] text-gray-500">
                  도착
                </p>
                <p className="font-medium lg:leading-[2.6rem] sm:text-[1.4rem] sm:leading-[2.4rem] text-black-300">
                  {AddressFormat(data.moveInfo.toAddress)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end items-center lg:gap-[1.6rem] sm:gap-[0.8rem]">
        <p className="font-medium lg:text-[1.8rem] lg:leading-[2.6rem] sm:text-[1.4rem] sm:leading-[2.4rem] text-black-400">
          견적 금액
        </p>
        <p className="font-bold lg:text-[2.4rem] lg:leading-[3.2rem] sm:text-[1.8rem] sm:leading-[2.6rem] text-black-400">
          {priceFormat(data.price)}원
        </p>
      </div>
      <WaitingQuoteCardClient dataId={data.id} />
    </div>
  );
}
