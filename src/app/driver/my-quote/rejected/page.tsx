import MyQuoteRejectPageClient from '@/_pages/MyQuoteRejectPageClient';
import ManageQuoteTab from '@/components/Tabs/ManageQuoteTab';

export default async function MyQuoteReject() {
  return (
    <div className="w-full min-h-screen items-center flex flex-col bg-background-100 dark:bg-dark-bg">
      <div className="w-full bg-white dark:bg-dark-p justify-center flex border-b border-line-100 dark:shadow md:shadow-[0rem_0.2rem_1rem_rgba(220,220,220,0.3)]">
        <div className="w-[120rem] flex justify-start items-center px-[1rem]">
          <ManageQuoteTab />
        </div>
      </div>
      <div className="w-full flex items-center justify-center mt-[4rem]">
        <MyQuoteRejectPageClient />
      </div>
    </div>
  );
}
