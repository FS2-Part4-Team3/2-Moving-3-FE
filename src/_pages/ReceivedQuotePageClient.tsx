import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { getMovesEstimationsData } from '@/api/MovesService';
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
  } = useInfiniteQuery<ReceivedQuoteResponse[]>({
    queryKey: ['receivedQuote'],
    queryFn: ({ pageParam }) => {
      return getMovesEstimationsData('all', pageParam as number, 5);
    },
    getNextPageParam: (lastPage, allPages) => {
      const currentPage = allPages.length;
      const totalPages = Math.ceil(lastPage.length / 5);
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

  if (!receivedQuote || !receivedQuote.pages[0].length) {
    return <div>Empty</div>;
  }
}
