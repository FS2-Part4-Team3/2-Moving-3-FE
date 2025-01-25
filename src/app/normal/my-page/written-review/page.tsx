import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import WrittenReviewClient from '@/_pages/WrittenReviewClient';
import { getMyReviewData } from '@/api/ReviewService';
import ReviewTabs from '@/components/Tabs/ReviewTabs';

export default async function WrittenReviewPage() {
  const queryClient = new QueryClient();

  queryClient.prefetchQuery({
    queryKey: ['myReviews'],
    queryFn: () => getMyReviewData(1, 6),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <>
        <div className="w-full flex justify-center">
          <ReviewTabs />
        </div>
        <WrittenReviewClient />
      </>
    </HydrationBoundary>
  );
}
