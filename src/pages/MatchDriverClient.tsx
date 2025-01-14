'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { getDriverListData } from '@/api/DriverService';
import FindDriverCard from '@/components/cards/FindDriverCard';
import type { DriverListResponse } from '@/interfaces/API/DriverServiceInterface';
import type { RootState } from '@/store/store';

export default function MatchDriverClient() {
  const { page, pageSize, keyword, orderBy, area, serviceType } = useSelector((state: RootState) => state.drivers);

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
      const totalPages = Math.ceil(lastPage.totalCount / 10);
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    initialPageParam: page,
  });

  if (driversLoading) {
    return <div>Loading...</div>;
  }

  if (driversError) {
    return <div>Error</div>;
  }

  return (
    <FindDriverCard
      data={drivers ? drivers.pages.flatMap(page => page.list) : []}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
    />
  );
}
