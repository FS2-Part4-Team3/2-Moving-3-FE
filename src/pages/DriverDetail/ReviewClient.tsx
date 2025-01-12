'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getDriverReviewData } from '@/api/DriverService';
import DriverReviewCard from '@/components/cards/DriverReviewCard';
import ReviewChart from '@/components/cards/ReviewChart';
import Empty from '@/components/common/Empty/Empty';
import Pagination from '@/components/common/pagination/pagination';
import type { ReviewClientProps } from '@/interfaces/Page/DriverDetailInterface';

export default function ReviewClient({ id, initialData, totalItems }: ReviewClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewData, setReviewData] = useState(initialData);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const queryClient = useQueryClient();

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

  const fetchPageData = async (page: number) => {
    const data = await queryClient.fetchQuery({
      queryKey: ['reviewData', id, page, itemsPerPage],
      queryFn: () => getDriverReviewData(id, page, itemsPerPage),
    });
    setReviewData(data);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchPageData(page);
  };

  return (
    <div className="flex flex-col lg:py-0 sm:py-[1rem] lg:gap-[4rem] sm:gap-[4.3rem]">
      <div className="flex flex-col gap-[3.2rem]">
        <p className="lg:text-[2.4rem] lg:leading-[3.2rem] sm:text-[1.6rem] sm:leading-[2.6rem] font-bold text-black-400">
          리뷰 ({reviewData.reviewCount})
        </p>
        {reviewData.reviewCount ? (
          <ReviewChart data={reviewData.reviews} score={reviewData.score} reviewCount={reviewData.reviewCount} />
        ) : (
          <div className="py-[8rem]">
            <Empty type="Driver" />
          </div>
        )}
      </div>

      <div className="flex flex-col w-full">
        {reviewData.reviewCount ? <DriverReviewCard reviews={reviewData.reviews} /> : null}
        <div className="flex justify-center lg:pt-[21.4rem] md:pt-[7.8rem] sm:pt-[9rem] lg:pb-[6.5rem] md:pb-[4.5rem] sm:pb-[3.4rem]">
          <Pagination
            currentPage={currentPage}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
