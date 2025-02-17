'use client';

import { useQuery } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import { getEstimationsDriverDetail } from '@/api/EstimationService';
import ClientQuoteCard from '@/components/cards/ClientQuoteCard';
import EstimationInformationCard from '@/components/cards/EstimateInformationCard';
import { DriverQuoteDetailData, MyQuoteDetailClientProps } from '@/interfaces/Page/MyQuoteDetailInterface';
import { priceFormat } from '@/utils/Format';
import MapClient from './MapClient';
import SharingPageClient from './SharingPageClient';

export default function MyQuoteSentDetailClient({ id }: MyQuoteDetailClientProps) {
  const {
    data: estimationDataDriver,
    isLoading: isEstimationLoading,
    error: estimationError,
  } = useQuery<DriverQuoteDetailData>({
    queryKey: ['estimationDetail', id],
    queryFn: () => getEstimationsDriverDetail(id),
  });

  if (isEstimationLoading) {
    return <div className="text-center">로딩 중...</div>;
  }

  if (estimationError || !estimationDataDriver || estimationDataDriver.estimationInfo.estimationId !== id) {
    alert('다시 시도 해주세요.');
    notFound();
  }

  const { user, estimationInfo, moveInfo, designatedRequest } = estimationDataDriver;
  const transformedMoveInfo = { ...moveInfo, createdAt: estimationInfo.createdAt };

  return (
    <>
      <div className="flex flex-row gap-[11.7rem] lg:pt-[2.4rem] sm:pt-[0.8rem] sm:pb-[10rem] justify-center">
        <div className="flex flex-col lg:w-[78rem] md:w-[60rem] sm:w-[32.7rem] lg:gap-[4rem] sm:gap-[2.4rem]">
          <ClientQuoteCard data={moveInfo} owner={user.name} designatedRequest={designatedRequest} />
          <div className="lg:hidden sm:block">
            <div className="border border-line-100 w-full mb-[2.4rem]"></div>
            <div className="flex flex-col gap-[1.6rem] py-[1rem]">
              <p className="md:text-[1.6rem] md:leading-[2.6rem] sm:text-[1.4rem] sm:leading-[2.4rem] font-semibold text-black-400">
                견적서 공유하기
              </p>
              <div className="flex flex-row gap-[1.6rem]">
                <SharingPageClient type="quoteSent" />
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
          <div className="lg:hidden sm:block">
            <MapClient
              fromAddress={estimationDataDriver.moveInfo.fromAddress}
              toAddress={estimationDataDriver.moveInfo.toAddress}
            />
          </div>
        </div>
        <div className="lg:block sm:hidden">
          <div className="flex flex-col gap-[2.2rem]">
            <p className="text-[2rem] leading-[3.2rem] font-semibold text-black-400">견적서 공유하기</p>
            <div className="flex flex-row gap-[1.6rem]">
              <SharingPageClient type="quoteSent" />
            </div>
          </div>
          <MapClient
            fromAddress={estimationDataDriver.moveInfo.fromAddress}
            toAddress={estimationDataDriver.moveInfo.toAddress}
          />
        </div>
      </div>
    </>
  );
}
