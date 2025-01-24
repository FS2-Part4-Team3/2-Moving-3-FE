import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { getMyReviewData } from '@/api/ReviewService';
import ReviewTabs from '@/components/Tabs/ReviewTabs';
import NormalReviewCard from '@/components/cards/NormalReviewCard';

export default async function WrittenReviewPage() {
  const queryClient = new QueryClient();

  queryClient.prefetchQuery({
    queryKey: ['my-reviews'],
    queryFn: () => getMyReviewData(1, 6),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <>
        <div className="w-full flex justify-center">
          <ReviewTabs />
        </div>
        <NormalReviewCard type="MY" />
      </>
    </HydrationBoundary>
  );
}
