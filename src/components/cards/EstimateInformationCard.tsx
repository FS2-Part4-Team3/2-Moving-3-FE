import type { EstimationInformationCardProps } from '@/interfaces/Card/EstimationInformationCardInterface';
import { DateIncludeTimeFormat, DateWithoutDayWeeKFormat } from '@/utils/Format';

enum MoveType {
  SMALL = '소형이사',
  HOME = '가정이사',
  OFFICE = '사무실이사',
  APPOINTMENT = '지정 견적 요청',
}

export default function EstimationInformationCard({ data }: EstimationInformationCardProps) {
  return (
    <div className="flex flex-col gap-[4rem]">
      <p className="font-semibold text-[2.4rem] leading-[3.2rem] text-black-400">견적 정보</p>
      <div className="rounded-[1.6rem] border border-line-100 py-[3.2rem] px-[4rem] bg-background-100 flex gap-[3.2rem]">
        <div className="flex flex-col gap-[0.8rem] font-normal text-[2rem] leading-[3.2rem] text-gray-300">
          <p>견적 요청일</p>
          <p>서비스</p>
          <p>이용일</p>
          <p>출발지</p>
          <p>도착지</p>
        </div>
        <div className="flex flex-col gap-[0.8rem] font-normal text-[2rem] leading-[3.2rem] text-black-400">
          <p>{DateWithoutDayWeeKFormat(data.updatedAt)}</p>
          <p>{MoveType[data.moveInfo.type]}</p>
          <p>{DateIncludeTimeFormat(data.moveInfo.date)}</p>
          <p>{data.moveInfo.fromAddress}</p>
          <p>{data.moveInfo.toAddress}</p>
        </div>
      </div>
    </div>
  );
}
