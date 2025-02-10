import Link from 'next/link';
import moveInfoData from '@/../public/data/estimationsData.json';
import MyQuoteSentPageClient from '@/_pages/MyQuoteSentPageClient';
import ManageQuoteTab from '@/components/Tabs/ManageQuoteTab';
import ManageQuotationCard from '@/components/cards/ManageQuotationCard';

export default async function MyQuoteSent() {
  if (!moveInfoData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full items-center justify-center flex flex-col bg-background-100">
      <div className="w-full bg-white justify-center flex border-b border-line-100 md:shadow-[0rem_0.2rem_1rem_rgba(220,220,220,0.3)]">
        <div className="w-[120rem] flex justify-start items-center px-[1rem]">
          <ManageQuoteTab />
        </div>
      </div>
      <div className="w-full flex items-center justify-center mt-[4rem]">
        <div className="lg:max-w-[140rem] lg:min-x-[120rem] lg:grid lg:grid-cols-2 lg:gap-[2.4rem] sm:gap-[1.6rem] sm:flex sm:flex-col w-full lg:px-[1rem] md:px-[7.2rem] sm:px-[2.4rem]">
          {/* {moveInfoData.map((item: any) => (
            <Link key={item.id} href={`/driver/my-quote/sent/${item.id}`}>
              <ManageQuotationCard data={item} status="ongoing" />
            </Link>
          ))} */}
          <MyQuoteSentPageClient />
        </div>
      </div>
    </div>
  );
}
