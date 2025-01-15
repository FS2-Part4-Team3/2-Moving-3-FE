'use client';

import { useState } from 'react';
import Pagination from '@/components/common/pagination/pagination';
import type { ReviewCardEstimations } from '@/interfaces/Card/NormalReviewCardInterface';

interface ReviewPaginationProps {
  estimationsData: ReviewCardEstimations[];
}

export default function ReviewPagination({ estimationsData }: ReviewPaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalItems = estimationsData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const currentData = estimationsData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </>
  );
}
