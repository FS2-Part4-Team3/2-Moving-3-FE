import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import WritableReviewClient from '@/_pages/WritableReviewClient';
import { getReviewableEstimations } from '@/api/EstimationService';
import ReviewTabs from '@/components/Tabs/ReviewTabs';

export default async function WritableReviewPage() {
  const queryClient = new QueryClient();

  queryClient.prefetchQuery({
    queryKey: ['reviewable-estimations'],
    queryFn: () => getReviewableEstimations(1, 6),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <>
        <div className="w-full flex justify-center">
          <ReviewTabs />
        </div>
        <WritableReviewClient />
      </>
    </HydrationBoundary>
  );
}
