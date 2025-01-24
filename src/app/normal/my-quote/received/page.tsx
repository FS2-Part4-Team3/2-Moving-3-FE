import Link from 'next/link';
import EstimateData from '@/../public/data/estimationsData.json';
import WaitingQuoteTab from '@/components/Tabs/WaitingQuoteTab';
import EstimationInformationCard from '@/components/cards/EstimateInformationCard';
import EstimateReceivedCard from '@/components/cards/EstimateReceivedCard';
import EstimationSortDropdown from '@/components/dropdown/EstimationSortDropdown';

export default async function MyQuoteReceived() {
  return (
    <div className="w-full items-center justify-center flex flex-col md:bg-background-100">
      <div className="w-full bg-white justify-center flex">
        <div className="w-[120rem] flex justify-start items-center">
          <WaitingQuoteTab />
        </div>
      </div>
      <div className="lg:min-w-[119rem] lg:max-w-[140rem] sm:w-full lg:px-[0rem] md:px-[7.2rem] justify-center flex flex-col lg:mt-[4rem] md:mt-[3.2rem] sm:mt-[2.4rem]">
        <div className="bg-white lg:rounded-[4rem] sm:rounded-[3.2rem] lg:py-[4.8rem] lg:px-[4rem] sm:py-[1.6rem] md:px-[3.2rem] sm:px-[2.4rem] flex flex-col lg:gap-[4.8rem] sm:gap-[3.2rem] md:border border-line-100 md:shadow-[0.2rem_-0.2rem_1rem_rgba(220,220,220,0.3)]">
          <EstimationInformationCard data={EstimateData[0]} />
          <div className="flex flex-col lg:gap-[4rem] sm:gap-[2.4rem]">
            <p className="font-semibold lg:text-[2.4rem] lg:leading-[3.2rem] text-black-400 sm:text-[1.6rem] sm:leading-[2.6rem]">
              견적서 목록
            </p>
            <EstimationSortDropdown />
            <div className="flex flex-col lg:gap-[5.4rem] md:gap-[3.2rem] sm:gap-[2.4rem]">
              {EstimateData.map((item: any) => (
                <Link key={item.id} href={`/normal/my-quote/received/${item.id}`}>
                  <EstimateReceivedCard data={item} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
