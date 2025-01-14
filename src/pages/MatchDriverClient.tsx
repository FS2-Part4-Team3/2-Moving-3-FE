'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { getDriverListData } from '@/api/DriverService';
import FindDriverCard from '@/components/cards/FindDriverCard';
import type { DriverListResponse } from '@/interfaces/API/DriverServiceInterface';

export default function MatchDriverClient() {
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

  return (
    <FindDriverCard
      data={drivers ? drivers.pages.flatMap(page => page.list) : []}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
    />
  );
}
