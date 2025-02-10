import MyQuoteRejectPageClient from '@/_pages/MyQuoteRejectPageClient';
import ManageQuoteTab from '@/components/Tabs/ManageQuoteTab';
import ManageQuotationCard from '@/components/cards/ManageQuotationCard';

export default async function MyQuoteReject() {
  return (
    <div className="w-full min-h-screen items-center flex flex-col bg-background-100">
      <div className="w-full bg-white justify-center flex border-b border-line-100 md:shadow-[0rem_0.2rem_1rem_rgba(220,220,220,0.3)]">
        <div className="w-[120rem] flex justify-start items-center px-[1rem]">
          <ManageQuoteTab />
        </div>
      </div>
      <div className="w-full flex items-center justify-center mt-[4rem]">
        {/* {moveInfoData.map((item: any, index: number) => (
            <div key={index}>
              <ManageQuotationCard data={item} isRejected={true} />
            </div>
          ))} */}
        <MyQuoteRejectPageClient />
      </div>
    </div>
  );
}
