'use client';

import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getReviewableEstimations } from '@/api/EstimationService';
import WritableReviewCard from '@/components/cards/WritableReviewCard';
import Empty from '@/components/common/Empty/Empty';
import Pagination from '@/components/common/pagination/pagination';
import { ReviewableEstimations } from '@/interfaces/Card/NormalReviewCardInterface';

export default function WritableReviewClient() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width >= 1200) {
        setItemsPerPage(6);
      } else {
        setItemsPerPage(4);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const {
    data: reviewableEstimations,
    isLoading,
    isError,
    isPlaceholderData,
  } = useQuery<ReviewableEstimations>({
    queryKey: ['reviewable-estimations', currentPage, itemsPerPage],
    queryFn: () => getReviewableEstimations(currentPage, itemsPerPage),
    placeholderData: keepPreviousData,
  });
  const totalPages = reviewableEstimations ? Math.ceil(reviewableEstimations.totalCount / itemsPerPage) : 1;
  const hasMore = currentPage < totalPages;

  useEffect(() => {
    if (!isPlaceholderData && hasMore) {
      const pagesToPrefetch = 5;
      const nextPage = currentPage + 1;

      for (let i = nextPage; i < nextPage + pagesToPrefetch && i <= totalPages; i++) {
        queryClient.prefetchQuery({
          queryKey: ['reviewable-estimations', i, itemsPerPage],
          queryFn: () => getReviewableEstimations(i, itemsPerPage),
        });
      }
    }
  }, [currentPage, hasMore, isPlaceholderData, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError) {
    alert('에러가 발생했습니다. 다시 한 번 시도해주세요!');
  }

  return (
    <div className="h-screen flex flex-col items-center gap-[4rem] bg-background-100 pt-[4rem] dark:bg-dark-bg">
      {reviewableEstimations?.estimations?.length ? (
        <>
          <div className="lg:grid lg:grid-cols-2 lg:gap-y-[4.8rem] lg:gap-x-[4rem] md:flex md:flex-col sm:flex sm:flex-col md:gap-y-[3.2rem] sm:gap-y-[3.2rem]">
            {reviewableEstimations?.estimations.map(estimation => (
              <div key={estimation.estimationInfo.estimationId}>
                <WritableReviewCard estimation={estimation} />
              </div>
            ))}
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </>
      ) : (
        <div className="lg:pt-[30rem] md:pt-[19.4rem] sm:pt-[19.4rem]">
          <Empty type="ReviewAble" />
        </div>
      )}
    </div>
  );
}
