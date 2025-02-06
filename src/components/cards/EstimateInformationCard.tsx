'use client';

import type { EstimationInformationCard } from '@/interfaces/Card/EstimateReceivedCardInterface';
import { DateIncludeTimeFormat, DateWithoutDayWeeKFormat } from '@/utils/Format';

enum MoveType {
  SMALL = '소형이사',
  HOME = '가정이사',
  OFFICE = '사무실이사',
  APPOINTMENT = '지정 견적 요청',
}

export default function EstimationInformationCard({ data }: EstimationInformationCard) {
  return (
    <div className="flex flex-col lg:gap-[4rem] sm:gap-[2.4rem]">
      <p className="font-semibold lg:text-[2.4rem] lg:leading-[3.2rem] sm:text-[1.6rem] sm:leading-[2.6rem] text-black-400">
        견적 정보
      </p>
      <div className="rounded-[1.6rem] border border-line-100 md:py-[3.2rem] md:px-[4rem] sm:p-[1.6rem] bg-background-100 flex lg:gap-[3.2rem] gap-[4rem]">
        <div className="flex flex-col gap-[0.8rem] font-normal lg:text-[2rem] lg:leading-[3.2rem] sm:text-[1.4rem] sm:leading-[2.4rem] text-gray-300">
          <p>견적 요청일</p>
          <p>서비스</p>
          <p>이용일</p>
          <p>출발지</p>
          <p>도착지</p>
        </div>
        <div className="flex flex-col gap-[0.8rem] font-normal lg:text-[2rem] lg:leading-[3.2rem] sm:text-[1.4rem] sm:leading-[2.4rem] text-black-400">
          <p>{DateWithoutDayWeeKFormat(data.createdAt)}</p>
          <p>{MoveType[data.serviceType as 'SMALL' | 'HOME' | 'OFFICE' | 'APPOINTMENT']}</p>
          <p>{DateIncludeTimeFormat(data.date)}</p>
          <p>{data.fromAddress}</p>
          <p>{data.toAddress}</p>
        </div>
      </div>
    </div>
  );
}
