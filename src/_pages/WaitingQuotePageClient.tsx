'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { getUserEstimationData } from '@/api/EstimationService';
import WaitingQuoteCard from '@/components/cards/WaitingQuoteCard';
import { WaitingQuoteListResponse } from '@/interfaces/Page/WaitingQuoteClientInterface';

export default function WaitingQuotePageClient() {
  // TODO: 백엔드 측에서 moveInfo.id 추가수정시 한 번 더 체크
  const { ref, inView } = useInView();

  const {
    data: waitingQuote,
    isLoading: waitingQuoteLoading,
    error: waitingQuoteError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<WaitingQuoteListResponse>({
    queryKey: ['waitingQuote'],
    queryFn: ({ pageParam }) => {
      return getUserEstimationData(pageParam as number, 10);
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

  if (waitingQuoteLoading) {
    return <div>Loading...</div>;
  }

  if (waitingQuoteError) {
    return <div>Error</div>;
  }

  if (!waitingQuote || waitingQuote.pages[0].totalCount === 0) {
    return <div>Empty</div>;
  }

  return (
    <div className="lg:grid lg:grid-cols-2 lg:gap-[2.4rem] sm:flex flex-col md:gap-[3.2rem] md:px-[7.2rem] sm:gap-[2.4rem] sm:px-[2.4rem]">
      {waitingQuote
        ? waitingQuote.pages.flatMap(page =>
            page.estimations.map(quote => (
              <div
                key={quote.estimationInfo.estimationId}
                className="w-full lg:px-0 sm:px-[1rem] sm:gap-[2.4rem] md:gap-[3.2rem] lg:gap-[4.8rem] flex flex-col bg-white"
              >
                <WaitingQuoteCard data={quote} />
              </div>
            )),
          )
        : []}
      {hasNextPage && <div ref={ref}>Loading...</div>}
    </div>
  );
}
