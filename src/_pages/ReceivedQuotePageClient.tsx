'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';
import { getMovesEstimationsData } from '@/api/MovesService';
import EstimateReceivedCard from '@/components/cards/EstimateReceivedCard';
import { ReceivedQuoteResponse } from '@/interfaces/Page/ReceiveQuoteInterface';
import { setData } from '@/store/slices/receivedQuoteSlice';
import { RootState } from '@/store/store';

export default function ReceivedQuotePageClient() {
  const dispatch = useDispatch();
  const { filter } = useSelector((state: RootState) => state.receiveQuote);
  const { ref, inView } = useInView();

  const {
    data: receivedQuote,
    isLoading: receivedQuoteLoading,
    error: receivedQuoteError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<ReceivedQuoteResponse>({
    queryKey: ['receivedQuote', filter],
    queryFn: ({ pageParam }) => {
      return getMovesEstimationsData(pageParam as number, 5, filter);
    },
    getNextPageParam: (lastPage, allPages) => {
      const currentPage = allPages.length;
      const totalPages = Math.ceil(lastPage.totalCount / 5);
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [inView]);

  useEffect(() => {
    if (receivedQuote && receivedQuote.pages) {
      dispatch(
        setData({
          id: receivedQuote.pages[0].list[0].id,
          createdAt: receivedQuote.pages[0].list[0].createdAt,
          serviceType: receivedQuote.pages[0].list[0].serviceType,
          date: receivedQuote.pages[0].list[0].date,
          fromAddress: receivedQuote.pages[0].list[0].fromAddress,
          toAddress: receivedQuote.pages[0].list[0].toAddress,
          progress: receivedQuote.pages[0].list[0].progress,
        }),
      );
    }
  }, [dispatch]);

  if (receivedQuoteLoading) {
    return <div>Loading...</div>;
  }

  if (receivedQuoteError) {
    return <div>Error</div>;
  }

  if (!receivedQuote || !receivedQuote.pages[0].list.length) {
    return <div>Empty</div>;
  }

  return (
    <div className="flex flex-col lg:gap-[5.4rem] md:gap-[3.2rem] sm:gap-[2.4rem]">
      {receivedQuote
        ? receivedQuote.pages.flatMap(page =>
            page.list.map(quote => (
              <Link key={quote.id} href={`/normal/my-quote/received/${quote.id}`}>
                {quote.confirmedEstimationId ? (
                  <div>
                    <EstimateReceivedCard data={quote.confirmedEstimation} serviceType={quote.serviceType} />
                  </div>
                ) : (
                  <div>
                    {quote.estimations.map((data, index) => (
                      <div key={index}>
                        <EstimateReceivedCard data={data} serviceType={quote.serviceType} />
                      </div>
                    ))}
                  </div>
                )}
              </Link>
            )),
          )
        : []}
      {hasNextPage && <div ref={ref}>Loading...</div>}
    </div>
  );
}
