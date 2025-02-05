import { useInfiniteQuery } from '@tanstack/react-query';
import { getMovesEstimationsData } from '@/api/MovesService';
import { ReceivedQuoteResponse } from '@/interfaces/Page/ReceiveQuoteInterface';

export default function ReceivedQuotePageClient() {
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
}
