'use client';

import type { EstimateReceivedCardProps } from '@/interfaces/Card/EstimateReceivedCardInterface';
import { priceFormat } from '@/utils/Format';
import MovingTypeChips from '../chips/MovingTypeChips';

export default function EstimateReceivedCard({ data }: EstimateReceivedCardProps) {
  console.log(data);
  return (
    <div className="w-full rounded-[1.6rem] border border-line-100 pt-[2rem] pb-[1.4rem] px-[2.4rem] flex flex-col gap-[1.6rem] shadow-[-0.2rem_-0.2rem_1rem_rgba(220,220,220,0.14)] shadow-[0.2rem_0.2rem_1rem_rgba(220,220,220,0.14)]">
      <MovingTypeChips type={data.moveInfo.type} />
      <p className="font-semibold text-[2rem] leading-[3.2rem] text-black-300">{data.comment}</p>
      <div>Profile</div>
      <div className="flex gap-[1.6rem] items-center justify-end">
        <p className="font-medium text-[1.8rem] leading-[2.6rem] text-black-400">견적 금액</p>
        <p className="font-bold text-[2.4rem] leading-[3.2rem]">{priceFormat(data.price)}원</p>
      </div>
    </div>
  );
}
