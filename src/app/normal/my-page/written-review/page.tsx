import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { getMyReviewData } from '@/api/ReviewService';
import ReviewTabs from '@/components/Tabs/ReviewTabs';
import NormalReviewCard from '@/components/cards/NormalReviewCard';
import ReviewPagination from '@/pages/ReviewPagination';

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
        <div className="flex flex-col items-center gap-[4rem] bg-background-100 lg:pt-[4rem]">
          <div className="lg:grid lg:grid-cols-2 lg:gap-y-12 lg:gap-x-6 md:flex md:flex-col sm:flex sm:flex-col md:gap-y-8 sm:gap-y-8">
            <NormalReviewCard type="MY" />
          </div>
          <ReviewPagination />
        </div>
      </>
    </HydrationBoundary>
  );
}
