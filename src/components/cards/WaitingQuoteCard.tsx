import Image from 'next/image';
import like from '@/../public/assets/driver/ic_like.svg';
import star from '@/../public/assets/driver/ic_star_yellow.svg';
import type { WaitingQuoteCardProps } from '@/interfaces/Card/WaitingQuoteCardInterface';
import WaitingQuoteCardClient from '@/pages/WaitingQuoteCardClient';
import AddressFormat, { DateFormat, priceFormat } from '@/utils/Format';
import MovingTypeChips from '../chips/MovingTypeChips';

export default function WaitingQuoteCard({ data }: WaitingQuoteCardProps) {
  return (
    <div className="max-w-[64rem] rounded-[1.6rem] border border-line-100 pt-[2.8rem] pb-[2.2rem] px-[2.4rem] flex flex-col gap-[2.4rem] shadow-[-0.2rem_-0.2rem_1rem_rgba(220,220,220,0.14)] shadow-[0.2rem_0.2rem_1rem_rgba(220,220,220,0.14)]">
      <div className="flex flex-col gap-[2.4rem]">
        <div className="flex gap-[1.2rem]">
          <MovingTypeChips type="WAITING" />
          <MovingTypeChips type={data.moveInfo.type} />
        </div>
        <div className="flex flex-col gap-[2.4rem]">
          <div className="flex w-full gap-[2.4rem] py-[1.6rem] px-[1.8rem] border border-line-100 rounded-[0.6rem] shadow-[-0.2rem_-0.2rem_1rem_rgba(220,220,220,0.14)]">
            <div className="w-[5.6rem] h-[5.6rem]">
              <Image
                src={data.driver.image}
                alt="profile"
                width={56}
                height={56}
                className="border-2 border-blue-400 rounded-full"
              />
            </div>
            <div className="w-full flex flex-col items-center gap-[0.8rem]">
              <div className="w-full flex justify-between items-center">
                <p className="font-semibold text-[1.8rem] leading-[2.6rem] text-black-300">{data.driver.name}</p>
                <div className="flex gap-[0.4rem] items-center">
                  <Image src={like} alt="like" width={24} height={24} />
                  <p className="font-medium text-[1.8rem] leading-[2.6rem] text-blue-400">{data.driver.favoriteCount}</p>
                </div>
              </div>
              <div className="flex gap-[1.6rem] justify-start items-center w-full">
                <div className="flex gap-[0.6rem] items-center">
                  <Image src={star} alt="star" width={24} height={24} />
                  <p className="font-medium text-[1.6rem] leading-[2.6rem] text-black-300">{data.driver.score}</p>
                  <p className="font-medium text-[1.6rem] leading-[2.6rem] text-gray-300">({data.driver.reviewCount})</p>
                </div>
                <div className="h-[1.4rem] border border-line-200" />
                <div className="flex gap-[0.6rem]">
                  <p className="font-medium text-[1.6rem] leading-[2.6rem] text-gray-300">경력</p>
                  <p className="font-medium text-[1.6rem] leading-[2.6rem] text-black-300">{data.driver.career}년</p>
                </div>
                <div className="h-[1.4rem] border border-line-200" />
                <div className="flex gap-[0.6rem]">
                  <p className="font-medium text-[1.6rem] leading-[2.6rem] text-black-300">{data.driver.applyCount}건</p>
                  <p className="font-medium text-[1.6rem] leading-[2.6rem] text-gray-300">확정</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-[1.6rem]">
            <div className="flex gap-[1.2rem] items-center">
              <p className="rounded-[0.4rem] py-[0.4rem] px-[0.6rem] bg-background-400 font-normal text-[1.8rem] leading-[2.6rem] text-gray-500">
                이사일
              </p>
              <p className="font-medium text-[1.8rem] leading-[2.6rem] text-black-300">{DateFormat(data.moveInfo.date)}</p>
            </div>
            <div className="flex gap-[1.2rem] items-center">
              <p className="rounded-[0.4rem] py-[0.4rem] px-[0.6rem] bg-background-400 font-normal text-[1.8rem] leading-[2.6rem] text-gray-500">
                출발
              </p>
              <p className="font-medium text-[1.8rem] leading-[2.6rem] text-black-300">
                {AddressFormat(data.moveInfo.fromAddress)}
              </p>
            </div>
            <div className="flex gap-[1.2rem] items-center">
              <p className="rounded-[0.4rem] py-[0.4rem] px-[0.6rem] bg-background-400 font-normal text-[1.8rem] leading-[2.6rem] text-gray-500">
                도착
              </p>
              <p className="font-medium text-[1.8rem] leading-[2.6rem] text-black-300">
                {AddressFormat(data.moveInfo.toAddress)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end items-center gap-[1.6rem]">
        <p className="font-medium text-[1.8rem] leading-[2.6rem] text-black-400">견적 금액</p>
        <p className="font-bold text-[2.4rem] leading-[3.2rem] text-black-400">{priceFormat(data.price)}원</p>
      </div>
      <WaitingQuoteCardClient />
    </div>
  );
}
