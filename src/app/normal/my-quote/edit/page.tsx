import { getEstimationData } from '@/api/DriverService';
import WaitingQuoteTab from '@/components/Tabs/WaitingQuoteTab';
import EstimationInformationCard from '@/components/cards/EstimateInformationCard';
import MyQuoteEditClient from '@/pages/MyQuoteEditClient';

export default async function MyQuoteEdit() {
  const moveInfoData = await getEstimationData();

  return (
    <div className="w-full min-h-screen bg-background-100 flex flex-col items-center">
      <div className="w-full bg-white flex justify-center">
        <div className="w-[120rem] flex items-start">
          <WaitingQuoteTab />
        </div>
      </div>
      <div className="lg:mt-[6.4rem] md:mt-[5.4rem] sm:mt-[2.4rem] md:px-[7.2rem] h-fit sm:w-full flex justify-center">
        <div className="lg:w-[120rem] sm:w-full md:px-[3.2rem] sm:px-[2.4rem] lg:py-[4.8rem] lg:px-[4rem] sm:py-[1.6rem] bg-white lg:rounded-[4rem] md:rounded-[2.4rem] border border-line-100 md:shadow-custom3 flex flex-col lg:gap-[4.8rem] sm:gap-[3.2rem]">
          <EstimationInformationCard data={moveInfoData[0]} />
          <div className="flex flex-col lg:gap-[4rem] sm:gap-[2.4rem]">
            <p className="font-semibold lg:text-[2.4rem] lg:leading-[3.2rem] sm:text-[1.6rem] sm:leading-[2.6rem] text-black-400">
              견적서 수정하기
            </p>
            <MyQuoteEditClient />
          </div>
        </div>
      </div>
    </div>
  );
}
