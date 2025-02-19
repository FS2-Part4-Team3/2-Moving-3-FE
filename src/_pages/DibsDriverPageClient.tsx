'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { getDibsDriverListData } from '@/api/DriverService';
import DibsDriverPageCard from '@/components/cards/DibsDriverPageCard';
import { DibsDriverListResponse } from '@/interfaces/API/DriverServiceInterface';

export default function DibsDriverPageClient() {
  const { ref, inView } = useInView();

  const {
    data: dibsDrivers,
    isLoading: dibsDriversLoading,
    error: dibsDriversError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<DibsDriverListResponse>({
    queryKey: ['dibsDrivers'],
    queryFn: ({ pageParam }) => {
      return getDibsDriverListData(pageParam as number, 10);
    },
    getNextPageParam: (lastPage, allPages) => {
      const currentPage = allPages.length;
      const totalPages = Math.ceil(lastPage.totalCount / 10);
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [inView]);

  if (dibsDriversLoading) {
    return <div>Loading</div>;
  }

  if (dibsDriversError) {
    return <div>Error</div>;
  }

  if (!dibsDrivers || dibsDrivers.pages[0].list.length === 0) {
    return <div className="w-full h-[56rem] flex items-center justify-center">EMPTY</div>;
  }

  return (
    <div className="pt-[2.4rem] lg:grid grid-cols-2 sm:flex flex-col gap-[3.2rem] w-full lg:px-[0rem] md:px-[7.2rem] sm:px-[3rem]">
      {dibsDrivers
        ? dibsDrivers.pages.flatMap(page =>
            page.list.map(driver => (
              <Link key={driver.id} href={`/match-driver/${driver.id}`}>
                <div className="w-full lg:px-0 sm:px-[1rem] sm:gap-[2.4rem] md:gap-[3.2rem] lg:gap-[4.8rem] flex flex-col">
                  <DibsDriverPageCard data={driver} />
                </div>
              </Link>
            )),
          )
        : []}
      {hasNextPage && <div ref={ref}>Loading...</div>}
    </div>
  );
}
