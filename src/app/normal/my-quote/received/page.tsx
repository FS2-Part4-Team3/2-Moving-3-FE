import WaitingQuoteTab from '@/components/Tabs/WaitingQuoteTab';

export default function MyQuoteReceived() {
  return (
    <div className="w-full items-center justify-center flex flex-col bg-background-100">
      <div className="w-full bg-white justify-center flex">
        <div className="w-[120rem] flex justify-start items-center">
          <WaitingQuoteTab />
        </div>
      </div>
      <div className="lg:min-w-[119rem] lg:max-w-[140rem] sm:w-full justify-center flex flex-col mt-[4rem]">
        <div className="bg-white rounded-[4rem] py-[4.8rem] px-[4rem] gap-[4.8rem] border border-line-100 shadow-[-0.2rem_-0.2rem_1rem_rgba(220,220,220,0.3)] shadow-[0.2rem_0.2rem_1rem_rgba(220,220,220,0.3)]">
          {/* Estimation Card 추가부터 */}
        </div>
      </div>
    </div>
  );
}
