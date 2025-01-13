import Link from 'next/link';
import { getEstimationData } from '@/api/DriverService';
import WaitingQuoteTab from '@/components/Tabs/WaitingQuoteTab';
import WaitingQuoteCard from '@/components/cards/WaitingQuoteCard';

export default async function MyQuoteWaiting() {
  const driverData = await getEstimationData();
  console.log(driverData);
  return (
    <div className="w-full items-center justify-center flex flex-col bg-background-100">
      <div className="w-full bg-white justify-center flex">
        <div className="w-[120rem] flex justify-start items-center">
          <WaitingQuoteTab />
        </div>
      </div>
      <div className="min-w-[119rem] max-w-[140rem] justify-center flex flex-col mt-[4rem]">
        <div className="grid grid-cols-2 gap-[2.4rem]">
          {driverData.map((driver: any, index: number) => (
            <div key={index}>
              <WaitingQuoteCard data={driver} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
