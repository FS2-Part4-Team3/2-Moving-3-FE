'use client';

import { animated, useTransition } from '@react-spring/web';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getDriverReviewData } from '@/api/DriverService';
import DriverReviewCard from '@/components/cards/DriverReviewCard';
import ReviewChart from '@/components/cards/ReviewChart';
import ReviewSummaryCard from '@/components/cards/ReviewSummaryCard';
import Empty from '@/components/common/Empty/Empty';
import { ButtonWrapper } from '@/components/common/headless/Button';
import Pagination from '@/components/common/pagination/pagination';
import type { DriverReviewData, ReviewClientProps } from '@/interfaces/Page/DriverDetailInterface';

export default function ReviewClient({ id }: ReviewClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const pathname = usePathname();

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

  const transitions = useTransition(currentPage, {
    from: { opacity: 0, transform: 'translateX(100%)' },
    enter: { opacity: 1, transform: 'translateX(0%)' },
    leave: { opacity: 0, transform: 'translateX(-100%)' },
    config: { tension: 150, friction: 25 },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Failed to load data</div>;
  }

  return (
    <div className="flex flex-col lg:py-0 sm:py-[1rem] lg:gap-[4rem] sm:gap-[4.3rem]">
      <div className="flex flex-col gap-[3.2rem]">
        <div className="flex justify-between items-center">
          <p className="lg:text-[2.4rem] lg:leading-[3.2rem] sm:text-[1.6rem] sm:leading-[2.6rem] font-bold text-black-400 dark:text-dark-t">
            리뷰 ({reviewData?.totalCount})
          </p>
          {pathname === '/driver/my-page' && (
            <Link href="/driver/my-page/review-analysis">
              <ButtonWrapper id="analyzing-review">
                <ButtonWrapper.Button className="w-[26rem] h-[4.8rem] rounded-[1.6rem] flex items-center justify-center font-semibold text-[2rem] leading-[3.2rem] text-white">
                  리뷰 분석하기
                </ButtonWrapper.Button>
              </ButtonWrapper>
            </Link>
          )}
        </div>
        {reviewData?.totalCount ? (
          <>
            <ReviewChart data={reviewData.stats} totalCount={reviewData.totalCount} />
            <ReviewSummaryCard driverId={id} />
          </>
        ) : (
          <div className="py-[8rem]">
            <Empty type="Driver" />
          </div>
        )}
      </div>

      {reviewData?.totalCount ? (
        <div className="flex flex-col w-full">
          {transitions(
            (style, page) =>
              page === currentPage && (
                <animated.div style={style}>
                  {reviewData?.list && reviewData.list.map((review, index) => <DriverReviewCard key={index} review={review} />)}
                </animated.div>
              ),
          )}
          <div className="flex justify-center lg:pt-[6rem] md:pt-[7.8rem] sm:pt-[9rem] lg:pb-[6.5rem] md:pb-[4.5rem] sm:pb-[3.4rem]">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
