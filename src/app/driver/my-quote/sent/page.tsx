import { getEstimationData } from '@/api/DriverService';
import ManageQuoteTab from '@/components/Tabs/ManageQuoteTab';
import ManageQuotationCard from '@/components/cards/ManageQuotationCard';

export default async function MyQuoteSent() {
  const moveInfoData = await getEstimationData();
  return (
    <div className="w-full items-center justify-center flex flex-col bg-background-100">
      <div className="w-full bg-white justify-center flex border-b border-line-100 md:shadow-[0rem_0.2rem_1rem_rgba(220,220,220,0.3)]">
        <div className="w-[120rem] flex justify-start items-center">
          <ManageQuoteTab />
        </div>
      </div>
      <div className="w-full flex items-center justify-center mt-[4rem]">
        <div className="grid grid-cols-2 gap-[2.4rem]">
          {moveInfoData.map((item: any, index: number) => (
            <div key={index}>
              <ManageQuotationCard data={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
