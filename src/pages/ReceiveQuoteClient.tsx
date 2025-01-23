'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';
import { getMovesListData } from '@/api/MovesService';
import ReceiveQuoteCard from '@/components/cards/ReceiveQuoteCard';
import Empty from '@/components/common/Empty/Empty';
import { MovesListResponse } from '@/interfaces/API/MovesServiceInterface';
import { setMovesList } from '@/store/slices/movesSlice';
import { RootState } from '@/store/store';

export default function ReceiveQuoteClient() {
  const dispatch = useDispatch();
  const { page, pageSize, keyword, orderBy, serviceType, serviceArea, designatedRequest } = useSelector(
    (state: RootState) => state.moves,
  );

  const { ref, inView } = useInView();

  const {
    data: moves,
    isLoading: movesLoading,
    error: movesError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<MovesListResponse>({
    queryKey: ['moves', keyword, orderBy, serviceType, serviceArea, designatedRequest],
    queryFn: ({ pageParam }) => {
      return getMovesListData(pageParam as number, pageSize, keyword, orderBy, serviceType, serviceArea, designatedRequest);
    },
    getNextPageParam: (lastPage, allPages) => {
      const currentPage = allPages.length;
      const totalPages = Math.ceil(lastPage.totalCount / pageSize);
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    initialPageParam: page,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [inView]);

  useEffect(() => {
    if (moves && moves.pages) {
      dispatch(setMovesList(moves.pages[0]));
    }
  }, [moves, dispatch]);

  if (movesLoading) {
    return <div>Loading...</div>;
  }

  if (movesError) {
    return <div>Error</div>;
  }

  if (!moves || moves.pages[0].list.length === 0) {
    return (
      <div className="w-full h-[56rem] flex items-center justify-center">
        <Empty type="ReceiveQuote" />
      </div>
    );
  }

  return (
    <>
      <div className="w-full lg:px-0 sm:px-[1rem] sm:gap-[2.4rem] md:gap-[3.2rem] lg:gap-[4.8rem] flex flex-col">
        {moves
          ? moves.pages.flatMap(page =>
              page.list.map(driver => (
                <Link key={driver.id} href={`/driver/receive-quote/${driver.id}`}>
                  <div className="w-full lg:px-0 sm:px-[1rem] sm:gap-[2.4rem] md:gap-[3.2rem] lg:gap-[4.8rem] flex flex-col">
                    <ReceiveQuoteCard data={driver} />
                  </div>
                </Link>
              )),
            )
          : []}
      </div>
      {hasNextPage && <div ref={ref}>Loading...</div>}
    </>
  );
}
