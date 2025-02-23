'use client';

import Link from 'next/link';
import EstimateReceivedCard from '@/components/cards/EstimateReceivedCard';
import { ReceivedQuotePageProps } from '@/interfaces/Page/ReceiveQuoteInterface';

export default function ReceivedQuotePageClient({ data, filter }: ReceivedQuotePageProps) {
  return (
    <div className="flex flex-col lg:gap-[5.4rem] md:gap-[3.2rem] sm:gap-[2.4rem]">
      {data?.confirmedEstimationId && (
        <Link key={data.confirmedEstimation.id} href={`/normal/my-quote/received/${data.confirmedEstimation.id}`}>
          <EstimateReceivedCard data={data.confirmedEstimation} serviceType={data.serviceType} isConfirmed={true} />
        </Link>
      )}
      <div className="flex flex-col lg:gap-[5.4rem] md:gap-[3.2rem] sm:gap-[2.4rem]">
        {filter === 'all' &&
          data.estimations.map((item, index) => (
            <Link key={item.id} href={`/normal/my-quote/received/${item.id}`}>
              <EstimateReceivedCard data={item} serviceType={data.serviceType} isConfirmed={false} />
            </Link>
          ))}
      </div>
    </div>
  );
}
