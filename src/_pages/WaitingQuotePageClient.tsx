import { useInfiniteQuery } from '@tanstack/react-query';
import { getUserEstimationData } from '@/api/EstimationService';
import { WaitingQuoteListResponse } from '@/interfaces/Page/WaitingQuoteClientInterface';

export default function WaitingQuotePageClient() {
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
    <div>
      <div></div>
    </div>
  );
}
