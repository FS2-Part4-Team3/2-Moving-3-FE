import { getEstimationData } from '@/api/DriverService';
import EstimationInformationCard from '@/components/cards/EstimateInformationCard';
import MyQuoteEditClient from '@/pages/MyQuoteEditClient';

export default async function MyQuoteEdit() {
  const moveInfoData = await getEstimationData();
  console.log(moveInfoData[0]);
  return (
    <div className="w-full min-h-screen bg-background-100 flex justify-center pt-[6.4rem]">
      <div className="w-[120rem] h-fit bg-white rounded-[4rem] border border-line-100 py-[4.8rem] px-[4rem] flex flex-col gap-[4.8rem] shadow-custom3">
        <EstimationInformationCard data={moveInfoData[0]} />
        <div className="flex flex-col gap-[4rem]">
          <p className="font-semibold text-[2.4rem] leading-[3.2rem]">견적서 수정하기</p>
          <MyQuoteEditClient />
        </div>
      </div>
    </div>
  );
}
