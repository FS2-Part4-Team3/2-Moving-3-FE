'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { getUserEstimationData } from '@/api/EstimationService';
import WaitingQuoteCard from '@/components/cards/WaitingQuoteCard';
import { WaitingQuoteListResponse } from '@/interfaces/Page/WaitingQuoteClientInterface';

export default function WaitingQuotePageClient() {
  const { ref, inView } = useInView();

  const {
    data: waitingQuote,
    isLoading: waitingQuoteLoading,
    error: waitingQuoteError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<WaitingQuoteListResponse[]>({
    queryKey: ['waitingQuote'],
    queryFn: ({ pageParam }) => {
      return getUserEstimationData(pageParam as number, 5);
    },
    getNextPageParam: (lastPage, allPages) => {
      const currentPage = allPages.length;
      const totalPages = Math.ceil(lastPage.length / 10);
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [inView]);

  if (waitingQuoteLoading) {
    return <div>Loading...</div>;
  }

  if (waitingQuoteError) {
    return <div>Error</div>;
  }

  if (!waitingQuote || waitingQuote.pages[0].length === 0) {
    return <div>Empty</div>;
  }

  return (
    <div className="pt-[2.4rem] lg:grid grid-cols-2 sm:flex flex-col gap-[3.2rem] w-full lg:px-[0rem] md:px-[7.2rem] sm:px-[3rem]">
      {waitingQuote
        ? waitingQuote.pages.flatMap(page =>
            page.map(quote => (
              <Link key={quote.estimationInfo.estimationId} href={`/match-driver/${quote.estimationInfo.estimationId}`}>
                <div className="w-full lg:px-0 sm:px-[1rem] sm:gap-[2.4rem] md:gap-[3.2rem] lg:gap-[4.8rem] flex flex-col bg-white">
                  <WaitingQuoteCard data={quote} />
                </div>
              </Link>
            )),
          )
        : []}
      {hasNextPage && <div ref={ref}>Loading...</div>}
    </div>
  );
}
