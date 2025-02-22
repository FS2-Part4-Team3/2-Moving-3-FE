'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { getMovesEstimationsData } from '@/api/MovesService';
import EstimationInformationCard from '@/components/cards/EstimateInformationCard';
import Empty from '@/components/common/Empty/Empty';
import EstimationSortDropdown from '@/components/dropdown/EstimationSortDropdown';
import EstimationInformationCardSkeleton from '@/components/skeleton/EstimateInformationCardSkeleton';
import EstimateReceivedCardSkeleton from '@/components/skeleton/EstimateReceivedCardSkeleton';
import { QuotesFilterMap, ReceivedQuoteResponse } from '@/interfaces/Page/ReceiveQuoteInterface';
import ReceivedQuotePageClient from './ReceivedQuotePageClient';

export default function ReceivedQuotePageStructureClient() {
  const { ref, inView } = useInView();

  const {
    data: receiveQuoteData,
    isLoading: receiveQuoteDataLoading,
    error: receiveQuoteDataError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<ReceivedQuoteResponse>({
    queryKey: ['receiveQuoteData'],
    queryFn: ({ pageParam }) => {
      return getMovesEstimationsData(pageParam as number, 3);
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

  const [quotesFilterMap, setQuotesFilterMap] = useState<QuotesFilterMap>({});

  useEffect(() => {
    if (receiveQuoteData && receiveQuoteData.pages) {
      const initialFilterMap = receiveQuoteData.pages
        .flatMap(page => page.list.map(quote => ({ [quote.id]: 'all' })))
        .reduce((acc, cur) => ({ ...acc, ...cur }), {});
      setQuotesFilterMap(initialFilterMap as QuotesFilterMap);
    }
  }, [receiveQuoteData]);

  if (receiveQuoteDataLoading) {
    return (
      <div className="flex flex-col lg:gap-[5.4rem] md:gap-[3.2rem] sm:gap-[2.4rem]">
        <div className="flex flex-col lg:gap-[4.8rem] sm:gap-[3.2rem]">
          <EstimationInformationCardSkeleton />
          <div className="flex flex-col lg:gap-[4rem] sm:gap-[2.4rem]">
            <p className="font-semibold lg:text-[2.4rem] lg:leading-[3.2rem] text-black-400 sm:text-[1.6rem] sm:leading-[2.6rem] dark:text-dark-t">
              견적서 목록
            </p>
            <div className="lg:w-[19rem] lg:h-[6.4rem] sm:h-[3.6rem] sm:w-[12.7rem] lg:rounded-[1.6rem] sm:rounded-[0.8rem] mb-[0.8rem] bg-gray-200 shimmer"></div>
            <div className="flex flex-col lg:gap-[5.4rem] md:gap-[3.2rem] sm:gap-[2.4rem]">
              {Array.from({ length: 6 }).map((_, index) => (
                <EstimateReceivedCardSkeleton key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (receiveQuoteDataError) {
    return <div>Error</div>;
  }

  if (!receiveQuoteData || !receiveQuoteData.pages[0].list.length) {
    return (
      <div className="mt-[5rem]">
        <Empty type="ReceivedQuote" />;
      </div>
    );
  }

  const updateQuoteFilter = (quoteId: string, newFilter: 'all' | 'confirmed') => {
    setQuotesFilterMap(prev => ({
      ...prev,
      [quoteId]: newFilter,
    }));
  };

  return (
    <div className="flex flex-col lg:gap-[5.4rem] md:gap-[3.2rem] sm:gap-[2.4rem]">
      {receiveQuoteData
        ? receiveQuoteData.pages.flatMap(page =>
            page.list.map(quote => (
              <div key={quote.id} className="flex flex-col lg:gap-[4.8rem] sm:gap-[3.2rem]">
                <EstimationInformationCard data={quote} />
                <div className="flex flex-col lg:gap-[4rem] sm:gap-[2.4rem]">
                  <p className="font-semibold lg:text-[2.4rem] lg:leading-[3.2rem] text-black-400 sm:text-[1.6rem] sm:leading-[2.6rem] dark:text-dark-t">
                    견적서 목록
                  </p>
                  <EstimationSortDropdown onChange={newFilter => updateQuoteFilter(quote.id, newFilter)} />
                  <ReceivedQuotePageClient data={quote} filter={quotesFilterMap[quote.id]} />
                </div>
              </div>
            )),
          )
        : []}
      {hasNextPage && <div ref={ref}>Loading...</div>}
    </div>
  );
}
