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

  // TODO: 31번째 줄 API 수정 되면 lastPage.length에서 lastPage.totalCount로 변경 예정.
  // TODO: 현재는 백엔드측 오류로 페이지 넘어가는 기능이 정상작동하지 않습니다. API 수정 반영시 해당 코드도 그에 따라 수정 예정입니다.

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
      console.log(lastPage.length, allPages.length, '1');
      const currentPage = allPages.length;
      const totalPages = Math.ceil(lastPage.length / 5);
      console.log(currentPage, totalPages, '2');
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

  console.log(waitingQuote);

  return (
    <div className="lg:grid lg:grid-cols-2 lg:gap-[2.4rem] sm:flex flex-col md:gap-[3.2rem] md:px-[7.2rem] sm:gap-[2.4rem] sm:px-[2.4rem]">
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
