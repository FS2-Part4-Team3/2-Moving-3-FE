import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import ReviewClient from '@/_pages/DriverDetail/ReviewClient';
import { getDriverDetailData, getDriverReviewData } from '@/api/DriverService';
import InfoEditDriverCard from '@/components/cards/InfoEditDriverCard';
import { DriverDetailData } from '@/interfaces/Page/DriverDetailInterface';

export default async function DriverMyPage({ searchParams }: { searchParams: { id: string } }) {
  const id = searchParams.id;

  const driverData: DriverDetailData = await getDriverDetailData(id);

  if (driverData.id !== id || !driverData) {
    notFound();
  }

  const queryClient = new QueryClient();
  queryClient.prefetchQuery({
    queryKey: ['reviewData', id],
    queryFn: () => getDriverReviewData(id, 1, 5),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="flex flex-col items-center justify-center">
        <div className="bg-white lg:w-[140rem] md:w-[60rem] sm:w-[32.7rem]">
          <p className="lg:text-[2.4rem] lg:leading-[3.2rem] sm:text-[1.4rem] sm:leading-[2.4rem] font-semibold text-black-400 lg:py-[3.2rem] sm:py-[1.4rem]">
            마이페이지
          </p>
        </div>
        <div className="flex flex-col lg:w-[140rem] md:w-[60rem] sm:w-[32.7rem] lg:gap-[4rem] sm:gap-[2.4rem] pt-[2.4rem] justify-center">
          <InfoEditDriverCard key={driverData.id} data={driverData} />
          <div className="border border-line-100 w-full"></div>
          <ReviewClient id={driverData.id} />
        </div>
      </div>
    </HydrationBoundary>
  );
}
