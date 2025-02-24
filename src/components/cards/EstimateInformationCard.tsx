'use client';

import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMovesDetailData } from '@/api/MovesService';
import { EstimationInformationCardProps } from '@/interfaces/Card/EstimateReceivedCardInterface';
import { setConfirmedEstimation } from '@/store/slices/estimationSlice';
import { RootState } from '@/store/store';
import { DateIncludeTimeFormat, DateWithoutDayWeeKFormat } from '@/utils/Format';
import Empty from '../common/Empty/Empty';

enum MoveType {
  SMALL = '소형이사',
  HOME = '가정이사',
  OFFICE = '사무실이사',
}

export default function EstimationInformationCard({ data }: EstimationInformationCardProps) {
  const dispatch = useDispatch();
  const moveInfoId = useSelector((state: RootState) => state.signIn.moveInfoId);
  const pathname = usePathname();

  const {
    data: moveInfoDetailData,
    isLoading: moveInfoDetailLoading,
    isError: moveInfoDetailError,
  } = useQuery({
    queryKey: ['moveInfoDetailData', moveInfoId],
    queryFn: () => getMovesDetailData(moveInfoId),
    enabled: !!moveInfoId,
  });

  useEffect(() => {
    if (moveInfoDetailData) {
      dispatch(setConfirmedEstimation(moveInfoDetailData.confirmedEstimationId));
    }
  }, [moveInfoDetailData, dispatch]);

  return (
    <div className="flex flex-col lg:gap-[4rem] sm:gap-[2.4rem]">
      <p className="font-semibold lg:text-[2.4rem] lg:leading-[3.2rem] sm:text-[1.6rem] sm:leading-[2.6rem] text-black-400 dark:text-dark-t">
        견적 정보
      </p>
      {!(pathname === '/normal/my-quote/edit' && !moveInfoDetailData) ? (
        <div className="rounded-[1.6rem] border border-line-100 md:py-[3.2rem] md:px-[4rem] sm:p-[1.6rem] bg-background-100 dark:bg-dark-p flex lg:gap-[3.2rem] gap-[4rem]">
          <div className="flex flex-col gap-[0.8rem] font-normal lg:text-[2rem] lg:leading-[3.2rem] sm:text-[1.4rem] sm:leading-[2.4rem] text-gray-300">
            <p>견적 요청일</p>
            <p>서비스</p>
            <p>이용일</p>
            <p>출발지</p>
            <p>도착지</p>
          </div>
          <div className="flex flex-col gap-[0.8rem] font-normal lg:text-[2rem] lg:leading-[3.2rem] sm:text-[1.4rem] sm:leading-[2.4rem] text-black-400 dark:text-dark-t">
            {pathname === '/normal/my-quote/edit'
              ? moveInfoDetailData && (
                  <>
                    <p>{DateWithoutDayWeeKFormat(moveInfoDetailData.createdAt)}</p>
                    <p>{MoveType[moveInfoDetailData.serviceType as 'SMALL' | 'HOME' | 'OFFICE']}</p>
                    <p>{DateIncludeTimeFormat(moveInfoDetailData.date)}</p>
                    <p>{moveInfoDetailData.fromAddress}</p>
                    <p>{moveInfoDetailData.toAddress}</p>
                  </>
                )
              : data && (
                  <>
                    <p>{DateWithoutDayWeeKFormat(data.createdAt)}</p>
                    <p>{MoveType[data.serviceType as 'SMALL' | 'HOME' | 'OFFICE']}</p>
                    <p>{DateIncludeTimeFormat(data.date)}</p>
                    <p>{data.fromAddress}</p>
                    <p>{data.toAddress}</p>
                  </>
                )}
          </div>
        </div>
      ) : (
        <Empty type="RequestEmpty" />
      )}
    </div>
  );
}
