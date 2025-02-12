import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import DriverMyPageClient from '@/_pages/DriverMyPageClient';
import { getDriverReviewData } from '@/api/DriverService';

export default async function DriverMyPage() {
  // const queryClient = new QueryClient();
  // queryClient.prefetchQuery({
  //   queryKey: ['reviewData', id],
  //   queryFn: () => getDriverReviewData(id, 1, 5),
  // });
  // const dehydratedState = dehydrate(queryClient);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-white lg:w-[120rem] md:w-[60rem] sm:w-[32.7rem]">
        <p className="lg:text-[2.4rem] lg:leading-[3.2rem] sm:text-[1.4rem] sm:leading-[2.4rem] font-semibold text-black-400 lg:py-[3.2rem] sm:py-[1.4rem]">
          마이페이지
        </p>
      </div>
      <DriverMyPageClient />
    </div>
  );
}
