'use client';

import { useQuery } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getDriverDetailData } from '@/api/DriverService';
import { getUserEstimationDetailData } from '@/api/EstimationService';
import EstimationInformationCard from '@/components/cards/EstimateInformationCard';
import FindDriverCard from '@/components/cards/FindDriverCard';
import { MyQuoteDetailClientProps, MyQuoteDetailData } from '@/interfaces/Page/MyQuoteDetailInterface';
import { priceFormat } from '@/utils/Format';
import DetailButtonClient from './DriverDetail/DetailButtonClient';
import MapClient from './MapClient';
import SharingPageClient from './SharingPageClient';

export default function MyQuoteWaitingDetailClient({ id }: MyQuoteDetailClientProps) {
  const [isTabletScreen, setIsTabletScreen] = useState<boolean>(window.innerWidth < 1200);

  useEffect(() => {
    const handleResize = () => {
      setIsTabletScreen(window.innerWidth < 1200);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  const {
    data: estimationData,
    isLoading: isEstimationLoading,
    error: estimationError,
  } = useQuery<MyQuoteDetailData>({
    queryKey: ['estimationDetail', id],
    queryFn: () => getUserEstimationDetailData(id),
  });

  const {
    data: driverData,
    isLoading: isDriverLoading,
    error: driverError,
  } = useQuery({
    queryKey: ['driverDetail', estimationData?.driverId],
    queryFn: () => (estimationData ? getDriverDetailData(estimationData.driverId) : Promise.resolve(null)),
    enabled: !!estimationData,
  });

  if (isEstimationLoading || isDriverLoading) {
    return <div className="text-center">로딩 중...</div>;
  }

  if (estimationError || driverError || !estimationData || estimationData.estimationInfo.id !== id) {
    alert('다시 시도 해주세요.');
    notFound();
  }

  const { estimationInfo, moveInfo, driverId, designatedRequest } = estimationData;
  const transformedMoveInfo = { ...moveInfo, id: moveInfo.moveInfoId };

  const driverIntroduce = estimationInfo.comment;

  return (
    <>
      <div className="w-full flex flex-row gap-[11.7rem] lg:pt-[2.4rem] sm:pt-[0.8rem] sm:px-[2rem] md:px-0 sm:pb-[10rem] justify-center">
        <div className="flex flex-col lg:w-[67rem] md:w-[60rem] sm:w-full lg:gap-[4rem] sm:gap-[2.4rem]">
          <FindDriverCard
            data={{ ...driverData, introduce: driverIntroduce }}
            type="WAITING"
            designatedRequest={designatedRequest}
          />
          <div className="lg:hidden sm:block">
            <div className="border border-line-100 w-full mb-[2.4rem]"></div>
            <div className="flex flex-col gap-[1.6rem] py-[1rem]">
              <p className="md:text-[1.6rem] md:leading-[2.6rem] sm:text-[1.4rem] sm:leading-[2.4rem] font-semibold text-black-400 dark:text-dark-t">
                견적서 공유하기
              </p>
              <div className="flex flex-row gap-[1.6rem]">
                <SharingPageClient type="quoteWaiting" />
              </div>
            </div>
          </div>
          <div className="border border-line-100 w-full"></div>
          <div className="gap-[3.2rem]">
            <p className="lg:text-[2.4rem] lg:leading-[3.2rem] sm:text-[1.6rem] sm:leading-[2.6rem] font-semibold text-black-400 dark:text-dark-t">
              견적가
            </p>
            <p className="lg:text-[3.2rem] lg:leading-[4.6rem] sm:text-[2rem] sm:leading-[3.2rem] font-bold text-black-400 dark:text-dark-t">
              {priceFormat(estimationInfo.price)}원
            </p>
          </div>
          <div className="border border-line-100 w-full"></div>
          <EstimationInformationCard data={transformedMoveInfo} />
          {isTabletScreen && (
            <MapClient fromAddress={estimationData.moveInfo.fromAddress} toAddress={estimationData.moveInfo.toAddress} />
          )}
        </div>
        <div className="lg:block sm:hidden">
          <div className="flex flex-col w-full gap-[4rem]">
            <div className="flex flex-col gap-[3.2rem]">
              <DetailButtonClient type="quoteWaiting" id={driverId} estimationId={id} />
            </div>
            <div className="border border-line-100 w-full"></div>
            <div className="flex flex-col gap-[2.2rem]">
              <p className="text-[2rem] leading-[3.2rem] font-semibold text-black-400 dark:text-dark-t">견적서 공유하기</p>
              <div className="flex flex-row gap-[1.6rem]">
                <SharingPageClient type="quoteWaiting" />
              </div>
            </div>
            {!isTabletScreen && (
              <MapClient fromAddress={estimationData.moveInfo.fromAddress} toAddress={estimationData.moveInfo.toAddress} />
            )}
          </div>
        </div>
      </div>
      <div className="lg:hidden sm:block">
        <div className="fixed py-[1rem] bottom-0 left-0 w-full shadow-custom8 bg-white dark:bg-dark-p flex items-center justify-center z-10">
          <div className="flex flex-row gap-[0.8rem] md:w-[60rem] sm:w-full sm:px-[2rem] md:px-0">
            <DetailButtonClient type="quoteWaiting" id={driverId} estimationId={id} />
          </div>
        </div>
      </div>
    </>
  );
}
