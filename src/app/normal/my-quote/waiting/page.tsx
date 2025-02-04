import driverData from '@/../public/data/estimationsData.json';
import WaitingQuotePageClient from '@/_pages/WaitingQuotePageClient';
import WaitingQuoteTab from '@/components/Tabs/WaitingQuoteTab';
import WaitingQuoteCard from '@/components/cards/WaitingQuoteCard';

export default async function MyQuoteWaiting() {
  if (!driverData) {
    return <div>Loading</div>;
  }

  return (
    <div className="w-full min-h-screen items-center flex flex-col bg-background-100">
      <div className="w-full bg-white justify-center flex">
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
