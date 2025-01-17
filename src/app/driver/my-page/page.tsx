import { notFound } from 'next/navigation';
import { getEstimationData } from '@/api/DriverService';
import InfoEditDriverCard from '@/components/cards/InfoEditDriverCard';
import ReviewClient from '@/pages/DriverDetail/ReviewClient';

export default async function DriverMyPage() {
  // Api 연결 필요
  const quoteDatas = await getEstimationData();
  const quoteData = quoteDatas[0];
  const driverData = quoteData.driver;

  if (!quoteData) {
    notFound();
  }

  return (
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
  );
}
