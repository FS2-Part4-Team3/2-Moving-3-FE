'use client';

import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getDriverReviewData } from '@/api/DriverService';
import DriverReviewCard from '@/components/cards/DriverReviewCard';
import ReviewChart from '@/components/cards/ReviewChart';
import ReviewSummaryCard from '@/components/cards/ReviewSummaryCard';
import Empty from '@/components/common/Empty/Empty';
import Pagination from '@/components/common/pagination/pagination';
import type { DriverReviewData, ReviewClientProps } from '@/interfaces/Page/DriverDetailInterface';

export default function ReviewClient({ id }: ReviewClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const queryClient = useQueryClient();
  const {
    data: reviewData,
    isLoading,
    isError,
  } = useQuery<DriverReviewData>({
    queryKey: ['reviewData', id, currentPage, itemsPerPage],
    queryFn: () => getDriverReviewData(id, currentPage, itemsPerPage),
  });

  const totalPages = reviewData ? Math.ceil(reviewData.totalCount / itemsPerPage) : 1;
  const hasMore = currentPage < totalPages;

  useEffect(() => {
    if (hasMore) {
      const pagesToPrefetch = 4;
      const nextPage = currentPage + 1;

      for (let i = nextPage; i < nextPage + pagesToPrefetch && i <= totalPages; i++) {
        queryClient.prefetchQuery({
          queryKey: ['reviewData', id, i, itemsPerPage],
          queryFn: () => getDriverReviewData(id, i, itemsPerPage),
        });
      }
    }
  }, [currentPage, hasMore, itemsPerPage]);

  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width >= 1200) {
        setItemsPerPage(5);
      } else if (width >= 744) {
        setItemsPerPage(4);
      } else {
        setItemsPerPage(3);
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Failed to load data</div>;
  }

  return (
    <div className="flex flex-col lg:py-0 sm:py-[1rem] lg:gap-[4rem] sm:gap-[4.3rem]">
      <div className="flex flex-col gap-[3.2rem]">
        <p className="lg:text-[2.4rem] lg:leading-[3.2rem] sm:text-[1.6rem] sm:leading-[2.6rem] font-bold text-black-400">
          리뷰 ({reviewData?.totalCount})
        </p>
        {reviewData?.totalCount ? (
          <ReviewChart data={reviewData.stats} totalCount={reviewData.totalCount} />
        ) : (
          <div className="py-[8rem]">
            <Empty type="Driver" />
          </div>
        )}
        <ReviewSummaryCard driverId={id} />
      </div>

      {reviewData?.totalCount ? (
        <div className="flex flex-col w-full">
          {reviewData?.list && reviewData.list.map((review, index) => <DriverReviewCard key={index} review={review} />)}
          <div className="flex justify-center lg:pt-[21.4rem] md:pt-[7.8rem] sm:pt-[9rem] lg:pb-[6.5rem] md:pb-[4.5rem] sm:pb-[3.4rem]">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
