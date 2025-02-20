import WaitingQuotePageClient from '@/_pages/WaitingQuotePageClient';
import WaitingQuoteTab from '@/components/Tabs/WaitingQuoteTab';

export default async function MyQuoteWaiting() {
  return (
    <div className="w-full min-h-screen items-center flex flex-col bg-background-100 dark:bg-dark-bg">
      <div className="w-full bg-white dark:bg-dark-p justify-center flex">
        <div className="w-[120rem] flex justify-start items-center">
          <WaitingQuoteTab />
        </div>
      </div>
      <div className="lg:min-w-[119rem] lg:max-w-[140rem] sm:w-full justify-center flex flex-col mt-[4rem]">
        <WaitingQuotePageClient />
      </div>
    </div>
  );
}
