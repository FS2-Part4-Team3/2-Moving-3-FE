import { getEstimationData } from '@/api/DriverService';
import EstimationInformationCard from '@/components/cards/EstimateInformationCard';
import MyQuoteEditClient from '@/pages/MyQuoteEditClient';

export default async function MyQuoteEdit() {
  const moveInfoData = await getEstimationData();
  console.log(moveInfoData[0]);
  return (
    <div className="w-full min-h-screen bg-background-100 flex justify-center lg:pt-[6.4rem] md:pt-[5.4rem] sm:pt-[2.4rem]">
      <div className="lg:w-[120rem] sm:w-full md:mx-[7.2rem] h-fit bg-white lg:rounded-[4rem] md:rounded-[2.4rem] border border-line-100 lg:py-[4.8rem] lg:px-[4rem] sm:py-[1.6rem] md:px-[3.2rem] sm:px-[2.4rem] flex flex-col lg:gap-[4.8rem] sm:gap-[3.2rem] md:shadow-custom3">
        <EstimationInformationCard data={moveInfoData[0]} />
        <div className="flex flex-col lg:gap-[4rem] sm:gap-[2.4rem]">
          <p className="font-semibold lg:text-[2.4rem] lg:leading-[3.2rem] sm:text-[1.6rem] sm:leading-[2.6rem] text-black-400">
            견적서 수정하기
          </p>
          <MyQuoteEditClient />
        </div>
      </div>
    </div>
  );
}
