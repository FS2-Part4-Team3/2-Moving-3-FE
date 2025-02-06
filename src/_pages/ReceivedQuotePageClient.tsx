'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';
import { getMovesEstimationsData } from '@/api/MovesService';
import EstimateReceivedCard from '@/components/cards/EstimateReceivedCard';
import { ReceivedQuotePageProps, ReceivedQuoteResponse } from '@/interfaces/Page/ReceiveQuoteInterface';
import { setData } from '@/store/slices/receivedQuoteSlice';
import { RootState } from '@/store/store';

export default function ReceivedQuotePageClient({ data }: ReceivedQuotePageProps) {
  const dispatch = useDispatch();
  const { filter } = useSelector((state: RootState) => state.receiveQuote);
  // const { ref, inView } = useInView();

  // const {
  //   data: receivedQuote,
  //   isLoading: receivedQuoteLoading,
  //   error: receivedQuoteError,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetchingNextPage,
  // } = useInfiniteQuery<ReceivedQuoteResponse>({
  //   queryKey: ['receivedQuote', filter],
  //   queryFn: ({ pageParam }) => {
  //     return getMovesEstimationsData(pageParam as number, 5, filter);
  //   },
  //   getNextPageParam: (lastPage, allPages) => {
  //     const currentPage = allPages.length;
  //     const totalPages = Math.ceil(lastPage.totalCount / 5);
  //     return currentPage < totalPages ? currentPage + 1 : undefined;
  //   },
  //   initialPageParam: 1,
  // });

  // useEffect(() => {
  //   if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
  // }, [inView]);

  console.log('33333', data);

  useEffect(() => {
    if (data) {
      console.log('33333', data);
      dispatch(
        setData(
          {
            id: data.id,
            createdAt: data.createdAt,
            serviceType: data.serviceType,
            date: data.date,
            fromAddress: data.fromAddress,
            toAddress: data.toAddress,
            progress: data.progress,
          },
          // data,
        ),
      );
    }
  }, [dispatch, data]);

  // if (receivedQuoteLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (receivedQuoteError) {
  //   return <div>Error</div>;
  // }

  console.log(data);

  // if (!receivedQuote || !receivedQuote.pages[0].list.length) {
  //   return <div>Empty</div>;
  // }

  return (
    <div className="flex flex-col lg:gap-[5.4rem] md:gap-[3.2rem] sm:gap-[2.4rem]">
      {data ? (
        <Link key={data.id} href={`/normal/my-quote/received/${data.id}`}>
          {data.confirmedEstimationId && (
            <div>
              <EstimateReceivedCard data={data.confirmedEstimation} serviceType={data.serviceType} />
            </div>
          )}
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
      {/* {hasNextPage && <div ref={ref}>Loading...</div>} */}
    </div>
  );
}
