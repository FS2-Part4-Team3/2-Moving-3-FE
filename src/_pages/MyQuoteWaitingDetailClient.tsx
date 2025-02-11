'use client';

import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getUserEstimationDetailData } from '@/api/EstimationService';
import EstimationInformationCard from '@/components/cards/EstimateInformationCard';
import FindDriverCard from '@/components/cards/FindDriverCard';
import { MyQuoteDetailData, MyQuoteWaitingDetailClientProps } from '@/interfaces/Page/MyQuoteDetailInterface';
import { priceFormat } from '@/utils/Format';
import DetailButtonClient from './DriverDetail/DetailButtonClient';
import SharingPageClient from './SharingPageClient';

export default function MyQuoteWaitingDetailClient({ id }: MyQuoteWaitingDetailClientProps) {
  const [estimationData, setEstimationData] = useState<MyQuoteDetailData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEstimationData() {
      try {
        const data = await getUserEstimationDetailData(id);
        setEstimationData(data);
      } catch (error) {
        console.error('데이터 가져오기 실패:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchEstimationData();
  }, [id]);

  if (loading) {
    return <div className="text-center">로딩 중...</div>;
  }

  if (!estimationData || estimationData.estimationInfo.id !== id) {
    notFound();
  }

  const { estimationInfo, moveInfo, driver, designatedRequest } = estimationData;
  const transformedMoveInfo = { ...moveInfo, id: moveInfo.moveInfoId };

  return (
    <div className="flex flex-row gap-[11.7rem] lg:pt-[2.4rem] sm:pt-[0.8rem] sm:pb-[10rem] justify-center">
      <div className="flex flex-col lg:w-[95.5rem] md:w-[60rem] sm:w-[32.7rem] lg:gap-[4rem] sm:gap-[2.4rem]">
        <FindDriverCard data={driver} type="WAITING" />
        <div className="lg:hidden sm:block">
          <div className="border border-line-100 w-full mb-[2.4rem]"></div>
          <div className="flex flex-col gap-[1.6rem] py-[1rem]">
            <p className="md:text-[1.6rem] md:leading-[2.6rem] sm:text-[1.4rem] sm:leading-[2.4rem] font-semibold text-black-400">
              견적서 공유하기
            </p>
            <div className="flex flex-row gap-[1.6rem]">
              <SharingPageClient />
            </div>
          </div>
        </div>
        <div className="border border-line-100 w-full"></div>
        <div className="gap-[3.2rem]">
          <p className="lg:text-[2.4rem] lg:leading-[3.2rem] sm:text-[1.6rem] sm:leading-[2.6rem] font-semibold text-black-400">
            견적가
          </p>
          <p className="lg:text-[3.2rem] lg:leading-[4.6rem] sm:text-[2rem] sm:leading-[3.2rem] font-bold text-black-400">
            {priceFormat(estimationInfo.price)}원
          </p>
        </div>
        <div className="border border-line-100 w-full"></div>
        <EstimationInformationCard data={transformedMoveInfo} />
      </div>
      <div className="lg:block sm:hidden">
        <div className="flex flex-col w-[32.8rem] gap-[4rem]">
          <div className="flex flex-col gap-[3.2rem]">
            <DetailButtonClient type="quoteWaiting" id={id} />
          </div>
          <div className="border border-line-100 w-full"></div>
          <div className="flex flex-col gap-[2.2rem]">
            <p className="text-[2rem] leading-[3.2rem] font-semibold text-black-400">견적서 공유하기</p>
            <div className="flex flex-row gap-[1.6rem]">
              <SharingPageClient />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
