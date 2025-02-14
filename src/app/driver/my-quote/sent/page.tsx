import MyQuoteSentPageClient from '@/_pages/MyQuoteSentPageClient';
import ManageQuoteTab from '@/components/Tabs/ManageQuoteTab';

export default async function MyQuoteSent() {
  return (
    <div className="w-full min-h-screen items-center flex flex-col bg-background-100">
      <div className="w-full bg-white justify-center flex border-b border-line-100 md:shadow-[0rem_0.2rem_1rem_rgba(220,220,220,0.3)]">
        <div className="w-[120rem] flex justify-start items-center px-[1rem]">
          <ManageQuoteTab />
        </div>
      </div>
      <div className="w-full flex items-center justify-center mt-[4rem]">
        <MyQuoteSentPageClient />
      </div>
    </div>
  );
}
