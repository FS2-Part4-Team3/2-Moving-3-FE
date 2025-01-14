'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { getDriverListData } from '@/api/DriverService';
import FindDriverCard from '@/components/cards/FindDriverCard';
import SearchBar from '@/components/common/searchbar/SearchBar';
import RegionServiceDropdown from '@/components/dropdown/RegionServiceDropdown';
import SortDropdown from '@/components/dropdown/SortDropdown';
import type { DriverListResponse } from '@/interfaces/API/DriverServiceInterface';

export default function MatchDriver() {
  // const driverData = await getDriverListData(2);

  // console.log(driverData);

  const {
    data: drivers,
    isLoading: driversLoading,
    error: driversError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<DriverListResponse>({
    queryKey: ['drivers'],
    queryFn: ({ pageParam }) => {
      return getDriverListData(pageParam as number);
    },
    getNextPageParam: (lastPage, allPages) => {
      const currentPage = allPages.length;
      const totalPages = Math.ceil(lastPage.totalCount / 10);
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
  });

  if (driversLoading) {
    return <div>Loading...</div>;
  }

  if (driversError) {
    return <div>Error</div>;
  }

  console.log(drivers);

  return (
    <div className="w-full flex items-center justify-center mb-[7rem]">
      <div className="lg:w-[120rem] sm:w-full items-start justify-center flex flex-col">
        <div className="lg:block sm:hidden py-[3.2rem]">
          <p className="font-semibold text-[2.4rem] leading-[3.2rem] text-[#2B2B2B]">기사님 찾기</p>
        </div>
        <div className="lg:flex lg:gap-[10rem] w-full sm:py-[1.6rem] lg:px-0 md:px-[7.2rem] sm:px-[2.4rem]">
          <div className="flex lg:flex-col lg:justify-start sm:justify-between lg:px-0 sm:px-[1rem] lg:gap-[4.6rem]">
            <RegionServiceDropdown />
            <div className="lg:hidden sm:block">
              <SortDropdown />
            </div>
          </div>
          <div className="flex flex-col items-center lg:gap-[3.2rem] sm:gap-[2.4rem] flex-grow lg:w-full sm:w-full">
            <div className="w-full flex flex-col gap-[2.4rem] lg:items-end sm:items-center">
              <div className="lg:block sm:hidden">
                <SortDropdown />
              </div>
              <div className="sm:py-[0.6rem] sm:px-[1rem] w-full">
                <SearchBar />
              </div>
            </div>
            <div className="w-full sm:px-[1rem] sm:gap-[2.4rem] md:gap-[3.2rem] lg:gap-[4.8rem] flex flex-col">
              <FindDriverCard
                data={drivers ? drivers.pages.flatMap(page => page.list) : []}
                fetchNextPage={fetchNextPage}
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
