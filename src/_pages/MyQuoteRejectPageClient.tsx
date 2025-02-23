'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { getEstimationsRejected } from '@/api/EstimationService';
import ManageQuotationCard from '@/components/cards/ManageQuotationCard';
import Empty from '@/components/common/Empty/Empty';
import ManageQuotationCardRejectSkeleton from '@/components/skeleton/ManageQuotationCardRejectSkeleton';
import { SentQuoteResponse } from '@/interfaces/Page/SentQuoteInterface';

export default function MyQuoteRejectPageClient() {
  const { ref, inView } = useInView();

  const {
    data: rejectedQuoteData,
    isLoading: rejectedQuoteLoading,
    error: rejectedQuoteError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<SentQuoteResponse>({
    queryKey: ['rejectedQuoteData'],
    queryFn: ({ pageParam }) => {
      return getEstimationsRejected(pageParam as number, 10);
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

  if (rejectedQuoteLoading) {
    return (
      <div>
        <div className="lg:max-w-[140rem] lg:min-x-[120rem] lg:grid lg:grid-cols-2 lg:gap-[2.4rem] sm:gap-[1.6rem] sm:flex sm:flex-col w-full lg:px-[1rem] md:px-[7.2rem] sm:px-[2.4rem]">
          {Array.from({ length: 6 }).map((_, index) => (
            <ManageQuotationCardRejectSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (rejectedQuoteError) {
    return <div>Error</div>;
  }

  if (!rejectedQuoteData || !rejectedQuoteData.pages[0].estimations.length) {
    return (
      <div className="mt-[5rem]">
        <Empty type="RejectQuote" />
      </div>
    );
  }

  return (
    <div className="lg:max-w-[140rem] lg:min-x-[120rem] lg:grid lg:grid-cols-2 lg:gap-[2.4rem] sm:gap-[1.6rem] sm:flex sm:flex-col w-full lg:px-[1rem] md:px-[7.2rem] sm:px-[2.4rem]">
      {rejectedQuoteData
        ? rejectedQuoteData.pages.flatMap(page =>
            page.estimations.map(quote => <ManageQuotationCard data={quote} isRejected={true} />),
          )
        : []}
      {hasNextPage && <div ref={ref}>Loading...</div>}
    </div>
  );
}
