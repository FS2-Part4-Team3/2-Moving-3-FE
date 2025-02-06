'use client';

import Link from 'next/link';
import EstimateReceivedCard from '@/components/cards/EstimateReceivedCard';
import { ReceivedQuotePageProps } from '@/interfaces/Page/ReceiveQuoteInterface';

export default function ReceivedQuotePageClient({ data }: ReceivedQuotePageProps) {
  return (
    <div className="flex flex-col lg:gap-[5.4rem] md:gap-[3.2rem] sm:gap-[2.4rem]">
      {data ? (
        <Link key={data.id} href={`/normal/my-quote/received/${data.id}`}>
          {data.confirmedEstimationId && <EstimateReceivedCard data={data.confirmedEstimation} serviceType={data.serviceType} />}
          <div className="flex flex-col lg:gap-[5.4rem] md:gap-[3.2rem] sm:gap-[2.4rem]">
            {data.estimations.map((item, index) => (
              <div key={index}>
                <EstimateReceivedCard data={item} serviceType={data.serviceType} />
              </div>
            ))}
          </div>
        </Link>
      ) : (
        []
      )}
    </div>
  );
}
