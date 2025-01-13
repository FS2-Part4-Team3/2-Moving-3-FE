import EstimateData from '@/../public/data/estimationsData.json';
import WaitingQuoteTab from '@/components/Tabs/WaitingQuoteTab';
import EstimationInformationCard from '@/components/cards/EstimateInformationCard';
import EstimateReceivedCard from '@/components/cards/EstimateReceivedCard';
import EstimationSortDropdown from '@/components/dropdown/EstimationSortDropdown';

export default function MyQuoteReceived() {
  return (
    <div className="w-full items-center justify-center flex flex-col bg-background-100">
      <div className="w-full bg-white justify-center flex">
        <div className="w-[120rem] flex justify-start items-center">
          <WaitingQuoteTab />
        </div>
      </div>
      <div className="lg:min-w-[119rem] lg:max-w-[140rem] sm:w-full justify-center flex flex-col mt-[4rem]">
        <div className="bg-white rounded-[4rem] py-[4.8rem] px-[4rem] flex flex-col gap-[4.8rem] border border-line-100 shadow-[0.2rem_-0.2rem_1rem_rgba(220,220,220,0.3)]">
          <EstimationInformationCard data={EstimateData[0]} />
          <div className="flex flex-col gap-[4rem]">
            <p className="font-semibold text-[2.4rem] leading-[3.2rem] text-black-400">견적서 목록</p>
            <EstimationSortDropdown />
            <div className="flex flex-col gap-[5.4rem]">
              {EstimateData.map((item, index) => (
                <div key={index}>
                  <EstimateReceivedCard data={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
