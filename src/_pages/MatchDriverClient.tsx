'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';
import { getDriverListData } from '@/api/DriverService';
import FindDriverCard from '@/components/cards/FindDriverCard';
import type { DriverListResponse } from '@/interfaces/API/DriverServiceInterface';
import type { RootState } from '@/store/store';

export default function MatchDriverClient() {
  const { page, pageSize, keyword, orderBy, area, serviceType } = useSelector((state: RootState) => state.drivers);
  const { type } = useSelector((state: RootState) => state.signIn);
  const { ref, inView } = useInView();

  const path = type === 'user' ? `/normal/match-driver/` : `/match-driver/`;

  const {
    data: drivers,
    isLoading: driversLoading,
    error: driversError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<DriverListResponse>({
    queryKey: ['drivers', keyword, orderBy, area, serviceType],
    queryFn: ({ pageParam }) => {
      return getDriverListData(pageParam as number, pageSize, keyword, orderBy, area, serviceType);
    },
    getNextPageParam: (lastPage, allPages) => {
      const currentPage = allPages.length;
      const totalPages = Math.ceil(lastPage.totalCount / pageSize);
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    initialPageParam: page,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [inView]);

  if (driversLoading) {
    return <div>Loading...</div>;
  }

  if (driversError) {
    return <div>Error</div>;
  }

  return (
    <div>
      <div className="flex flex-col lg:gap-[4.8rem] md:gap-[3.2rem] sm:gap-[2.4rem]">
        {drivers
          ? drivers.pages.flatMap(page =>
              page.list.map(driver => (
                <Link key={driver.id} href={`${path}/${driver.id}`}>
                  <FindDriverCard data={driver} />
                </Link>
              )),
            )
          : []}
      </div>
      {hasNextPage && <div ref={ref}>Loading...</div>}
    </div>
  );
}
