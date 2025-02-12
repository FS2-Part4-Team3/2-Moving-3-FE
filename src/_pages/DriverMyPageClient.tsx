'use client';

import { useQuery } from '@tanstack/react-query';
import { notFound, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getDriverDetailData } from '@/api/DriverService';
import InfoEditDriverCard from '@/components/cards/InfoEditDriverCard';
import { DriverDetailData } from '@/interfaces/Page/DriverDetailInterface';
import { RootState } from '@/store/store';
import ReviewClient from './DriverDetail/ReviewClient';

export default function DriverMyPageClient() {
  const id = useSelector((state: RootState) => state.signIn.id);
  const router = useRouter();

  useEffect(() => {
    if (!id) {
      setTimeout(() => {
        router.push('/driver/sign-in');
      }, 3000);
    }
  }, [id, router]);

  if (!id) {
    return (
      <div className="text-center text-[2rem] font-semibold">
        로그인이 필요한 페이지입니다. <br /> 3초 후 로그인 페이지로 이동합니다.
      </div>
    );
  }

  const {
    data: driverData,
    isLoading,
    isError,
  } = useQuery<DriverDetailData>({
    queryKey: ['driverDetail', id],
    queryFn: () => getDriverDetailData(id),
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
