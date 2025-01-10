import type { ManageQuotationCardProps } from '@/interfaces/Card/ManageQuotationCardInterface';
import AddressFormat, { DateFormat, priceFormat, timeAgoFormat } from '@/utils/Format';
import MovingTypeChips from '../chips/MovingTypeChips';

export default function ManageQuotationCard({ data }: ManageQuotationCardProps) {
  return (
    <div className="w-full rounded-[1.6rem] border border-line-100 lg:pt-[2rem] lg:pb-[1.2rem] lg:px-[2.4rem] sm:py-[1.6rem] sm:px-[1.4rem] flex flex-col lg:gap-[1.6rem] sm:gap-[2.6rem] shadow-[-0.2rem_-0.2rem_1rem_rgba(220,220,220,0.14)] shadow-[0.2rem_0.2rem_1rem_rgba(220,220,220,0.14)]">
      <div className="flex flex-col gap-[1.6rem]">
        <div className="flex justify-between">
          <div className="flex gap-[1.2rem] items-center">
            <p className="rounded-[0.8rem] lg:py-[0.4rem] sm:py-[0.2rem] px-[0.6rem] gap-[0.4rem] bg-[#F2F3F8] font-semibold lg:text-[1.6rem] sm:text-[1.3rem] lg:leading-[2.6rem] sm:leading-[2.2rem] text-blue-400">
              견적 확정
            </p>
            <MovingTypeChips type={data.moveInfo.type} />
          </div>
          <p className="font-normal text-[1.2rem] leading-[1.8rem] text-gray-500">{timeAgoFormat(data.updatedAt)}</p>
        </div>
        <div className="lg:py-[1.6rem] flex flex-col lg:gap-[1.8rem] sm:gap-[1rem]">
          <div className="md:block sm:flex flex-col gap-[1.4rem]">
            <p className="font-semibold lg:text-[2rem] sm:text-[1.6rem] lg:leading-[3.2rem] sm:leading-[2.6rem] text-black-300">
              {data.moveInfo.owner} 고객님
            </p>
            <div className="md:hidden sm:block">
              <div className="flex items-center gap-[1.2rem]">
                <p className="rounded-[0.4rem] lg:py-[0.4rem] sm:py-[0.2rem] px-[0.6rem] bg-background-400 font-normal lg:text-[1.8rem] sm:text-[1.4rem] lg:leading-[2.6rem] sm:leading-[2.4rem] text-gray-500">
                  이사일
                </p>
                <p className="font-medium lg:text-[1.8rem] lg:leading-[2.6rem] sm:text-[1.4rem] sm:leading-[2.4rem] text-black-300">
                  {DateFormat(data.moveInfo.date)}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full border border-line-100" />
          <div className="flex lg:gap-[1.6rem] sm:gap-[1.4rem] items-center">
            <div className="md:block sm:hidden">
              <div className="flex items-center gap-[1.2rem]">
                <p className="rounded-[0.4rem] py-[0.4rem] px-[0.6rem] bg-background-400 font-normal text-[1.8rem] leading-[2.6rem] text-gray-500">
                  이사일
                </p>
                <p className="font-medium text-[1.8rem] leading-[2.6rem] text-black-300">{DateFormat(data.moveInfo.date)}</p>
              </div>
            </div>
            <div className="h-[1.4rem] border border-line-200 md:block sm:hidden" />
            <div className="flex items-center gap-[1.2rem]">
              <p className="rounded-[0.4rem] lg:py-[0.4rem] sm:py-[0.2rem] px-[0.6rem] bg-background-400 font-normal lg:text-[1.8rem] sm:text-[1.4rem] lg:leading-[2.6rem] sm:leading-[2.4rem] text-gray-500">
                출발
              </p>
              <p className="font-medium lg:text-[1.8rem] lg:leading-[2.6rem] sm:text-[1.4rem] sm:leading-[2.4rem] text-black-300">
                {AddressFormat(data.moveInfo.fromAddress)}
              </p>
            </div>
            <div className="h-[1.4rem] border border-line-200" />
            <div className="flex items-center gap-[1.2rem]">
              <p className="rounded-[0.4rem] lg:py-[0.4rem] sm:py-[0.2rem] px-[0.6rem] bg-background-400 font-normal lg:text-[1.8rem] sm:text-[1.4rem] lg:leading-[2.6rem] sm:leading-[2.4rem] text-gray-500">
                도착
              </p>
              <p className="font-medium lg:text-[1.8rem] lg:leading-[2.6rem] sm:text-[1.4rem] sm:leading-[2.4rem] text-black-300">
                {AddressFormat(data.moveInfo.toAddress)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex lg:gap-[1.6rem] sm:gap-[0.8rem] items-center justify-end">
        <p className="font-medium lg:text-[1.8rem] sm:text-[1.4rem] lg:leading-[2.6rem] sm:leading-[2.4rem] text-black-400">
          견적 금액
        </p>
        <p className="font-bold lg:text-[2.4rem] sm:text-[1.8rem] lg:leading-[3.2rem] sm:leading-[2.6rem] text-black-400">
          {priceFormat(data.price)}원
        </p>
      </div>
    </div>
  );
}
