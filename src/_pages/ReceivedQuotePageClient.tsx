'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { getMovesEstimationsData } from '@/api/MovesService';
import EstimateReceivedCard from '@/components/cards/EstimateReceivedCard';
import { ReceivedQuoteResponse } from '@/interfaces/Page/ReceiveQuoteInterface';

export default function ReceivedQuotePageClient() {
  const { ref, inView } = useInView();

  const {
    data: receivedQuote,
    isLoading: receivedQuoteLoading,
    error: receivedQuoteError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<ReceivedQuoteResponse>({
    queryKey: ['receivedQuote'],
    queryFn: ({ pageParam }) => {
      return getMovesEstimationsData('all', pageParam as number, 5);
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

  if (receivedQuoteLoading) {
    return <div>Loading...</div>;
  }

  if (receivedQuoteError) {
    return <div>Error</div>;
  }

  console.log(receivedQuote?.pages[0]);

  if (!receivedQuote || !receivedQuote.pages[0].list.length) {
    return <div>Empty</div>;
  }

  console.log(receivedQuote.pages[0]);

  return (
    <div>
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
