'use client';

import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getMyReviewData } from '@/api/ReviewService';
import WrittenReviewCard from '@/components/cards/WrittenReviewCard';
import Empty from '@/components/common/Empty/Empty';
import Pagination from '@/components/common/pagination/pagination';
import { MyReviews } from '@/interfaces/Card/NormalReviewCardInterface';

export default function WrittenReviewClient() {
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
    data: myReviews,
    isLoading,
    isError,
    isPlaceholderData,
  } = useQuery<MyReviews>({
    queryKey: ['myReviews', currentPage, itemsPerPage],
    queryFn: () => getMyReviewData(currentPage, itemsPerPage),
    placeholderData: keepPreviousData,
  });
  const totalPages = myReviews ? Math.ceil(myReviews.totalCount / itemsPerPage) : 1;
  const hasMore = currentPage < totalPages;

  useEffect(() => {
    if (!isPlaceholderData && hasMore) {
      const pagesToPrefetch = 5;
      const nextPage = currentPage + 1;

      for (let i = nextPage; i < nextPage + pagesToPrefetch && i <= totalPages; i++) {
        queryClient.prefetchQuery({
          queryKey: ['myReviews', i, itemsPerPage],
          queryFn: () => getMyReviewData(i, itemsPerPage),
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

  console.log('myReviews', myReviews);

  return (
    <div className="h-screen flex flex-col items-center gap-[4rem] bg-background-100 pt-[4rem]">
      {myReviews?.list.length ? (
        <>
          <div className="lg:grid lg:grid-cols-2 lg:gap-y-[4.8rem] lg:gap-x-[4rem] md:flex md:flex-col sm:flex sm:flex-col md:gap-y-[3.2rem] sm:gap-y-[3.2rem] ">
            {myReviews?.list.map(myReview => (
              <div key={myReview.id}>
                <WrittenReviewCard myReview={myReview} />
              </div>
            ))}
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </>
      ) : (
        <div className="lg:pt-[30rem] md:pt-[19.4rem] sm:pt-[19.4rem]">
          <Empty type="Review" />
        </div>
      )}
    </div>
  );
}
