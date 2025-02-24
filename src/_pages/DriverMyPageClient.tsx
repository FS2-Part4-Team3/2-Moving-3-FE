'use client';

import { useQuery } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import { useSelector } from 'react-redux';
import { getDriverDetailData } from '@/api/DriverService';
import InfoEditDriverCard from '@/components/cards/InfoEditDriverCard';
import { DriverDetailData } from '@/interfaces/Page/DriverDetailInterface';
import { RootState } from '@/store/store';
import ReviewClient from './DriverDetail/ReviewClient';

export default function DriverMyPageClient() {
  const id = useSelector((state: RootState) => state.signIn.id);

  const {
    data: driverData,
    isLoading,
    isError,
  } = useQuery<DriverDetailData>({
    queryKey: id ? ['driverDetail', id] : [],
    queryFn: id ? () => getDriverDetailData(id) : undefined,
    enabled: !!id,
  });

  if (isLoading) return <div>로딩 중...</div>;

  if (isError || !driverData || driverData.id !== id) {
    notFound();
  }

  return (
    <div className="flex flex-col lg:w-[120rem] md:w-[60rem] sm:w-[32.7rem] lg:gap-[4rem] sm:gap-[2.4rem] pt-[2.4rem] justify-center">
      <InfoEditDriverCard key={driverData.id} data={driverData} />
      <div className="border border-line-100 w-full"></div>
      <ReviewClient id={driverData.id} />
    </div>
  );
}
