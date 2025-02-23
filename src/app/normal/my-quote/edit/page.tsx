import EstimationReceivedCardClient from '@/_pages/EstimationReceivedCardClient';
import MyQuoteEditClient from '@/_pages/MyQuoteEditClient';
import WaitingQuoteTab from '@/components/Tabs/WaitingQuoteTab';
import EstimationInformationCard from '@/components/cards/EstimateInformationCard';

export default async function MyQuoteEdit() {
  return (
    <div className="w-full min-h-screen bg-background-100 dark:bg-dark-bg flex flex-col items-center">
      <div className="w-full bg-white dark:bg-dark-p flex justify-center">
        <div className="w-[120rem] flex items-start">
          <WaitingQuoteTab />
        </div>
      </div>
      <div className="lg:mt-[6.4rem] md:mt-[5.4rem] sm:mt-[2.4rem] md:px-[7.2rem] h-fit sm:w-full flex justify-center">
        <div className="lg:w-[120rem] sm:w-full md:px-[3.2rem] sm:px-[2.4rem] lg:py-[4.8rem] lg:px-[4rem] sm:py-[1.6rem] bg-white dark:bg-dark-p lg:rounded-[4rem] md:rounded-[2.4rem] border border-line-100 md:shadow-custom3 dark:shadow flex flex-col lg:gap-[4.8rem] sm:gap-[3.2rem]">
          <EstimationInformationCard />
          <div>
            <p>확정한 견적</p>
            <EstimationReceivedCardClient />
          </div>
          <div className="flex flex-col lg:gap-[4rem] sm:gap-[2.4rem]">
            <p className="font-semibold lg:text-[2.4rem] lg:leading-[3.2rem] sm:text-[1.6rem] sm:leading-[2.6rem] text-black-400 dark:text-dark-t">
              견적서 수정하기
            </p>
            <MyQuoteEditClient />
          </div>
        </div>
      </div>
    </div>
  );
}
