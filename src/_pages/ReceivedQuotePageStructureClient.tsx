'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';
import { getMovesEstimationsData } from '@/api/MovesService';
import EstimationInformationCard from '@/components/cards/EstimateInformationCard';
import EstimationSortDropdown from '@/components/dropdown/EstimationSortDropdown';
import { ReceivedQuoteResponse } from '@/interfaces/Page/ReceiveQuoteInterface';
import { RootState } from '@/store/store';
import ReceivedQuotePageClient from './ReceivedQuotePageClient';

export default function ReceivedQuotePageStructureClient() {
  const { ref, inView } = useInView();
  const { filter } = useSelector((state: RootState) => state.receiveQuote);

  const {
    data: receiveQuoteData,
    isLoading: receiveQuoteDataLoading,
    error: receiveQuoteDataError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<ReceivedQuoteResponse>({
    queryKey: ['receiveQuoteData', filter],
    queryFn: ({ pageParam }) => {
      return getMovesEstimationsData(pageParam as number, 3, filter);
    },
    getNextPageParam: (lastPage, allPages) => {
      const currentPage = allPages.length;
      const totalPages = Math.ceil(lastPage.totalCount / 3);
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [inView]);

  if (receiveQuoteDataLoading) {
    return <div>Loading...</div>;
  }

  if (receiveQuoteDataError) {
    return <div>Error</div>;
  }

  if (!receiveQuoteData || !receiveQuoteData.pages[0].list.length) {
    return <div>Empty</div>;
  }

  return (
    <div className="flex flex-col lg:gap-[5.4rem] md:gap-[3.2rem] sm:gap-[2.4rem]">
      {receiveQuoteData
        ? receiveQuoteData.pages.flatMap(page =>
            page.list.map(quote => (
              <div key={quote.id} className="flex flex-col lg:gap-[4.8rem] sm:gap-[3.2rem]">
                <EstimationInformationCard data={quote} />
                <div className="flex flex-col lg:gap-[4rem] sm:gap-[2.4rem]">
                  <p className="font-semibold lg:text-[2.4rem] lg:leading-[3.2rem] text-black-400 sm:text-[1.6rem] sm:leading-[2.6rem]">
                    견적서 목록
                  </p>
                  <EstimationSortDropdown />
                  <ReceivedQuotePageClient data={quote} />
                </div>
              </div>
            )),
          )
        : []}
      {hasNextPage && <div ref={ref}>Loading...</div>}
    </div>
  );
}
