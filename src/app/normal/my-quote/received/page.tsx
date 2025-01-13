import WaitingQuoteTab from '@/components/Tabs/WaitingQuoteTab';

export default function MyQuoteReceived() {
  return (
    <div className="w-full items-center justify-center flex flex-col">
      <div className="w-[120rem]">
        <WaitingQuoteTab />
      </div>
    </div>
  );
}
