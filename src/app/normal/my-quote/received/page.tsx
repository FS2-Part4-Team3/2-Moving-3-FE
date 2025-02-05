import ReceivedQuotePageClient from '@/_pages/ReceivedQuotePageClient';
import WaitingQuoteTab from '@/components/Tabs/WaitingQuoteTab';
import EstimationInformationCard from '@/components/cards/EstimateInformationCard';
import EstimationSortDropdown from '@/components/dropdown/EstimationSortDropdown';

export default async function MyQuoteReceived() {
  return (
    <div className="w-full min-h-screen items-center flex flex-col md:bg-background-100">
      <div className="w-full bg-white justify-center flex">
        <div className="w-[120rem] flex justify-start items-center">
          <WaitingQuoteTab />
        </div>
      </div>
      <div className="lg:min-w-[119rem] lg:max-w-[140rem] sm:w-full lg:px-[0rem] md:px-[7.2rem] justify-center flex flex-col lg:mt-[4rem] md:mt-[3.2rem] sm:mt-[2.4rem]">
        <div className="bg-white lg:rounded-[4rem] sm:rounded-[3.2rem] lg:py-[4.8rem] lg:px-[4rem] sm:py-[1.6rem] md:px-[3.2rem] sm:px-[2.4rem] flex flex-col lg:gap-[4.8rem] sm:gap-[3.2rem] md:border border-line-100 md:shadow-[0.2rem_-0.2rem_1rem_rgba(220,220,220,0.3)]">
          <EstimationInformationCard />
          <div className="flex flex-col lg:gap-[4rem] sm:gap-[2.4rem]">
            <p className="font-semibold lg:text-[2.4rem] lg:leading-[3.2rem] text-black-400 sm:text-[1.6rem] sm:leading-[2.6rem]">
              견적서 목록
            </p>
            <EstimationSortDropdown />
            <ReceivedQuotePageClient />
          </div>
        </div>
      </div>
    </div>
  );
}
