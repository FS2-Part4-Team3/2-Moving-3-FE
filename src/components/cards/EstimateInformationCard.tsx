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
    <div>
      <p>견적 정보</p>
      <div>
        <div>
          <p>견적 요청일</p>
          <p>서비스</p>
          <p>이용일</p>
          <p>출발지</p>
          <p>도착지</p>
        </div>
        <div>
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
