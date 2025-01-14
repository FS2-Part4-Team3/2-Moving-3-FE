import Link from 'next/link';
import { getEstimationData } from '@/api/DriverService';
import WaitingQuoteTab from '@/components/Tabs/WaitingQuoteTab';
import WaitingQuoteCard from '@/components/cards/WaitingQuoteCard';

export default async function MyQuoteWaiting() {
  const driverData = await getEstimationData();
  return (
    <div className="w-full items-center justify-center flex flex-col bg-background-100">
      <div className="w-full bg-white justify-center flex">
        <div className="w-[120rem] flex justify-start items-center">
          <WaitingQuoteTab />
        </div>
      </div>
      <div className="lg:min-w-[119rem] lg:max-w-[140rem] sm:w-full justify-center flex flex-col mt-[4rem]">
        <div className="lg:grid lg:grid-cols-2 lg:gap-[2.4rem] sm:flex flex-col md:gap-[3.2rem] md:px-[7.2rem] sm:gap-[2.4rem] sm:px-[2.4rem]">
          {driverData.map((data: any, index: number) => (
            <div key={index}>
              <Link key={data.driver.id} href={`/normal/my-quote/waiting/${data.driver.id}`}>
                <WaitingQuoteCard data={data} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
