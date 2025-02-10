'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { getEstimationsDriver } from '@/api/EstimationService';
import ManageQuotationCard from '@/components/cards/ManageQuotationCard';
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

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [inView]);

  if (sentQuoteDataLoading) {
    return <div>Loading...</div>;
  }

  if (sentQuoteDataError) {
    return <div>Error</div>;
  }

  if (!sentQuoteData || !sentQuoteData.pages[0].estimations.length) {
    return <div>Empty</div>;
  }

  console.log(sentQuoteData);

  return (
    <div>
      {sentQuoteData
        ? sentQuoteData.pages.flatMap(page =>
            page.estimations.map(quote => (
              <Link key={quote.estimationInfo.estimationId} href={`/driver/my-quote/sent/${quote.estimationInfo.estimationId}`}>
                <ManageQuotationCard data={quote} status="ongoing" />
              </Link>
            )),
          )
        : []}
    </div>
  );
}
