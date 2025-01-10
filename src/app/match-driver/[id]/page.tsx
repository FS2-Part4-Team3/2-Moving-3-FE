import Image from 'next/image';
import { notFound } from 'next/navigation';
import clip from '@/../../public/assets/driver/ic_clip.svg';
import facebook from '@/../../public/assets/driver/ic_facebook.svg';
import kakao from '@/../../public/assets/driver/ic_kakao.svg';
import { getDriverDetailData, getDriverReviewData } from '@/api/DriverService';
import DriverReviewCard from '@/components/cards/DriverReviewCard';
import FindDriverCard from '@/components/cards/FindDriverCard';
import ReviewChart from '@/components/cards/ReviewChart';
import DriverDetailChips from '@/components/chips/DriverDetailChips';
import type { DriverDetailData, DriverReviewData } from '@/interfaces/Page/DriverDetailInterface';
import DriverDetailClient from '@/pages/DriverDetailClient';

export default async function DriverDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const driverData: DriverDetailData = await getDriverDetailData(id);
  const reviewData: DriverReviewData = await getDriverReviewData(id);

  if (driverData.id !== id || !driverData) {
    notFound();
  }

  return (
    <div className="flex flex-row gap-[11.7rem] lg:pt-[5.6rem] sm:pt-[2.4rem] justify-center">
      <div className="flex flex-col lg:w-[95.5rem] md:w-[60rem] sm:w-[32.7rem]">
        <div className="flex flex-col lg:gap-[4rem] sm:gap-[2.4rem]">
          <FindDriverCard key={driverData.id} data={driverData} />
          <div className="lg:hidden sm:block">
            <div className="border border-line-100 w-full mb-[2.4rem]"></div>
            <div className="flex flex-col gap-[0.8rem] md:px-[2.4rem] sm:px-0 py-[1rem]">
              <p className="text-[1.4rem] leading-[2.4rem] font-semibold text-black-400">나만 알기엔 아쉬운 기사님인가요?</p>
              <div className="flex flex-row gap-[1.6rem]">
                <Image src={clip} alt="share-clip" width={40} height={40} />
                <Image src={kakao} alt="share-kakao" width={40} height={40} />
                <Image src={facebook} alt="share-facebook" width={40} height={40} />
              </div>
            </div>
          </div>
          <div className="border border-line-100 w-full"></div>
          <div className="flex flex-col lg:gap-[3.2rem] sm:gap-[1.6rem] lg:px-0 lg:py-0 md:px-[2.4rem] sm:py-[1rem]">
            <p className="lg:text-[2.4rem] lg:leading-[3.2rem] sm:text-[1.6rem] sm:leading-[2.6rem] font-bold text-black-400">
              상세설명
            </p>
            <p className="lg:text-[1.8rem] lg:leading-[2.6rem] sm:text-[1.4rem] sm:leading-[2.4rem] font-normal text-black-400">
              {driverData.description}
            </p>
          </div>
          <div className="border border-line-100 w-full"></div>
          <div className="flex flex-col lg:gap-[3.2rem] sm:gap-[1.6rem] lg:px-0 lg:py-0 md:px-[2.4rem] sm:py-[1rem]">
            <p className="lg:text-[2.4rem] lg:leading-[3.2rem] sm:text-[1.6rem] sm:leading-[2.6rem] font-bold text-black-400">
              제공 서비스
            </p>
            <div className="flex flex-row lg:gap-[1.2rem] sm:gap-[0.8rem]">
              <DriverDetailChips serviceType={driverData.serviceType} />
            </div>
          </div>
          <div className="border border-line-100 w-full"></div>
          <div className="flex flex-col lg:gap-[3.2rem] sm:gap-[1.6rem] lg:px-0 lg:py-0 md:px-[2.4rem] sm:py-[1rem]">
            <p className="text-[2.4rem] leading-[3.2rem] font-bold text-black-400">서비스 가능 지역</p>
            <div className="flex flex-row lg:gap-[1.2rem] sm:gap-[0.8rem]">
              <DriverDetailChips availableAreas={driverData.availableAreas} />
            </div>
          </div>
          <div className="border border-line-100 w-full"></div>
          <div className="flex flex-col lg:py-0 sm:py-[1rem] lg:gap-[4rem] sm:gap-[4.3rem]">
            <div className="flex flex-col gap-[3.2rem]">
              <p className="lg:text-[2.4rem] lg:leading-[3.2rem] sm:text-[1.6rem] sm:leading-[2.6rem] font-bold text-black-400">
                리뷰 ({reviewData.reviewCount})
              </p>
              <ReviewChart data={reviewData.reviews} score={reviewData.score} reviewCount={reviewData.reviewCount} />
            </div>

            <div className="flex flex-col w-full">
              <DriverReviewCard reviewCount={reviewData.reviewCount} reviews={reviewData.reviews} />
            </div>
          </div>
        </div>
        <div className="flex justify-center lg:pt-[21.4rem] md:pt-[7.8rem] sm:pt-[9rem] lg:pb-[6.5rem] md:pb-[4.5rem] sm:pb-[3.4rem]">
          pagination
        </div>
        <div className="lg:hidden sm:block">
          <div className="flex flex-row gap-[0.8rem] py-[1rem] md:w-[60rem] sm:w-[32.7rem] justify-center">
            <DriverDetailClient />
          </div>
        </div>
      </div>
      <div className="lg:block sm:hidden">
        <div className="flex flex-col w-[35.4rem] gap-[4rem]">
          <div className="flex flex-col gap-[3.2rem]">
            <p className="text-[2rem] leading-[3.2rem] text-black-400 font-semibold">
              {driverData.name} 기사님에게 지정 견적을 요청해보세요!
            </p>
            <DriverDetailClient />
          </div>
          <div className="border border-line-100 w-[32.8rem]"></div>
          <div className="flex flex-col gap-[2.2rem]">
            <p className="text-[2rem] leading-[3.2rem] font-semibold text-black-400">나만 알기엔 아쉬운 기사님인가요?</p>
            <div className="flex flex-row gap-[1.6rem]">
              <Image src={clip} alt="share-clip" width={64} height={64} />
              <Image src={kakao} alt="share-kakao" width={64} height={64} />
              <Image src={facebook} alt="share-facebook" width={64} height={64} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
