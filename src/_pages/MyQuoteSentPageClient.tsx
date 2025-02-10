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

  return (
    <div className="lg:max-w-[140rem] lg:min-x-[120rem] lg:grid lg:grid-cols-2 lg:gap-[2.4rem] sm:gap-[1.6rem] sm:flex sm:flex-col w-full lg:px-[1rem] md:px-[7.2rem] sm:px-[2.4rem]">
      {sentQuoteData
        ? sentQuoteData.pages.flatMap(page =>
            page.estimations.map(quote => (
              <Link key={quote.estimationInfo.estimationId} href={`/driver/my-quote/sent/${quote.estimationInfo.estimationId}`}>
                <ManageQuotationCard data={quote} isRejected={false} />
              </Link>
            )),
          )
        : []}
      {hasNextPage && <div ref={ref}>Loading...</div>}
    </div>
  );
}
