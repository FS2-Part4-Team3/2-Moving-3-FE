import ReceivedQuotePageStructureClient from '@/_pages/ReceivedQuotePageStructureClient';
import WaitingQuoteTab from '@/components/Tabs/WaitingQuoteTab';

export default async function MyQuoteReceived() {
  return (
    <div className="w-full min-h-screen items-center flex flex-col md:bg-background-100">
      <div className="w-full bg-white justify-center flex">
        <div className="w-[120rem] flex justify-start items-center">
          <WaitingQuoteTab />
        </div>
      </div>
      <div className="lg:min-w-[119rem] lg:max-w-[140rem] sm:w-full lg:px-[0rem] md:px-[7.2rem] justify-center flex flex-col lg:my-[4rem] md:my-[3.2rem] sm:my-[2.4rem]">
        <div className="bg-white lg:rounded-[4rem] sm:rounded-[3.2rem] lg:py-[4.8rem] lg:px-[4rem] sm:py-[1.6rem] md:px-[3.2rem] sm:px-[2.4rem] flex flex-col lg:gap-[4.8rem] sm:gap-[3.2rem] md:border border-line-100 md:shadow-[0.2rem_-0.2rem_1rem_rgba(220,220,220,0.3)]">
          <ReceivedQuotePageStructureClient />
        </div>
      </div>
    </div>
  );
}
