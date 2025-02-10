'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { getEstimationsDriver } from '@/api/EstimationService';
import { SentQuoteResponse } from '@/interfaces/Page/SentQuoteInterface';

export default function MyQuoteSentPageClient() {
  const { ref, inView } = useInView();

  const {
    data: sentQuoteData,
    isLoading: sentQuoteDataLoading,
    error: sentQuoteDataError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<SentQuoteResponse>({
    queryKey: ['sentQuoteData'],
    queryFn: ({ pageParam }) => {
      return getEstimationsDriver(pageParam as number, 10);
    },
    getNextPageParam: (lastPage, allPages) => {
      const currentPage = allPages.length;
      const totalPages = Math.ceil(lastPage.totalCount / 10);
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
  });

  console.log(sentQuoteData);

  return (
    <div>
      <div></div>
    </div>
  );
}
