import Image from 'next/image';
import { notFound } from 'next/navigation';
import clip from '@/../../public/assets/driver/ic_clip.svg';
import facebook from '@/../../public/assets/driver/ic_facebook.svg';
import kakao from '@/../../public/assets/driver/ic_kakao.svg';
import data from '@/../../public/data/estimationsData.json';
import DetailButtonClient from '@/_pages/DriverDetail/DetailButtonClient';
import EstimationInformationCard from '@/components/cards/EstimateInformationCard';
import FindDriverCard from '@/components/cards/FindDriverCard';
import { EstimationInformationCardProps } from '@/interfaces/Card/EstimationInformationCardInterface';
import { FindDriverCardData } from '@/interfaces/Card/FindDriverCardInterface';
import { priceFormat } from '@/utils/Format';

const data1: FindDriverCardData = {
  id: 'driver-1',
  name: '김철수',
  image: 'https://example.com/driver1.jpg',
  introduce: '5년 경력의 신뢰할 수 있는 기사입니다.',
  serviceType: ['SMALL', 'HOME'],
  applyCount: 10,
  likeCount: 5,
  rating: 4.8,
  career: 9,
  reviewCount: 200,
};

const data2: EstimationInformationCardProps = {
  data: {
    updatedAt: '2025-01-01T12:00:00Z',
    moveInfo: {
      type: 'HOME',
      date: '2025-02-01T12:00:00Z',
      fromAddress: '서울 중구 삼일대로 343',
      toAddress: '서울 중구 청계천로 100',
    },
  },
};

export default async function MyQuoteWaitingDetail({ params }: { params: { id: string } }) {
  const { id } = params;

  // Api 연결 필요
  const quoteData = data[0];
  const driverData = quoteData.driver;

  if (quoteData.id !== id || !quoteData) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-white lg:w-[140rem] md:w-[60rem] sm:w-[32.7rem]">
        <p className="lg:text-[2.4rem] lg:leading-[3.2rem] sm:text-[1.8rem] sm:leading-[2.6rem] font-semibold text-black-400 lg:py-[3.2rem] sm:py-[1.4rem]">
          견적 상세
        </p>
      </div>
      <div className="flex flex-row gap-[11.7rem] lg:pt-[2.4rem] sm:pt-[0.8rem] sm:pb-[10rem] justify-center">
        <div className="flex flex-col lg:w-[95.5rem] md:w-[60rem] sm:w-[32.7rem] lg:gap-[4rem] sm:gap-[2.4rem]">
          <FindDriverCard key={driverData.id} data={data1} type="WAITING" />
          <div className="lg:hidden sm:block">
            <div className="border border-line-100 w-full mb-[2.4rem]"></div>
            <div className="flex flex-col gap-[1.6rem] py-[1rem]">
              <p className="md:text-[1.6rem] md:leading-[2.6rem] sm:text-[1.4rem] sm:leading-[2.4rem] font-semibold text-black-400">
                견적서 공유하기
              </p>
              <div className="flex flex-row gap-[1.6rem]">
                <Image src={clip} alt="share-clip" width={40} height={40} />
                <Image src={kakao} alt="share-kakao" width={40} height={40} />
                <Image src={facebook} alt="share-facebook" width={40} height={40} />
              </div>
            </div>
          </div>
          <div className="border border-line-100 w-full"></div>
          <div className="gap-[3.2rem]">
            <p className="lg:text-[2.4rem] lg:leading-[3.2rem] sm:text-[1.6rem] sm:leading-[2.6rem] font-semibold text-black-400">
              견적가
            </p>
            <p className="lg:text-[3.2rem] lg:leading-[4.6rem] sm:text-[2rem] sm:leading-[3.2rem] font-bold text-black-400">
              {priceFormat(quoteData.price)}원
            </p>
          </div>
          <div className="border border-line-100 w-full"></div>
          <EstimationInformationCard data={data2.data} />
        </div>
        <div className="lg:block sm:hidden">
          <div className="flex flex-col w-[32.8rem] gap-[4rem]">
            <div className="flex flex-col gap-[3.2rem]">
              <DetailButtonClient type="quoteWaiting" id={id} />
            </div>
            <div className="border border-line-100 w-full"></div>
            <div className="flex flex-col gap-[2.2rem]">
              <p className="text-[2rem] leading-[3.2rem] font-semibold text-black-400">견적서 공유하기</p>
              <div className="flex flex-row gap-[1.6rem]">
                <Image src={clip} alt="share-clip" width={64} height={64} />
                <Image src={kakao} alt="share-kakao" width={64} height={64} />
                <Image src={facebook} alt="share-facebook" width={64} height={64} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:hidden sm:block">
        <div className="fixed py-[1rem] bottom-0 left-0 w-full shadow-custom8 bg-white flex items-center justify-center">
          <div className="flex flex-row gap-[0.8rem] md:w-[60rem] sm:w-[32.7rem]">
            <DetailButtonClient type="quoteWaiting" id={id} />
          </div>
        </div>
      </div>
    </div>
  );
}
