'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import left_active from '@/../../public/assets/common/pagination/chevron-left-active.svg';
import left from '@/../../public/assets/common/pagination/chevron-left.svg';
import right_active from '@/../../public/assets/common/pagination/chevron-right-active.svg';
import right from '@/../../public/assets/common/pagination/chevron-right.svg';
import type { PaginationProps } from '@/interfaces/CommonComp/PaginationInterface';

export default function Pagination({ currentPage, totalItems, itemsPerPage, onPageChange }: PaginationProps) {
  const [windowWidth, setWindowWidth] = useState(0);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  const maxVisiblePages = windowWidth >= 1200 ? 5 : 3;

  const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  const adjustedStartPage = Math.max(1, endPage - maxVisiblePages + 1);

  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex items-center lg:gap-[1rem] sm:gap-[0.8rem]">
      <div className={currentPage !== 1 ? 'cursor-pointer' : ''}>
        <Image
          onClick={handlePrevious}
          src={currentPage === 1 ? left : left_active}
          alt="left_arrow"
          width={48}
          height={48}
          className="lg:block sm:hidden"
        />
        <Image
          onClick={handlePrevious}
          src={currentPage === 1 ? left : left_active}
          alt="left_arrow"
          width={34}
          height={34}
          className="lg:hidden sm:block"
        />
      </div>

      <div className="font-normal lg:text-[1.8rem] sm:text-[1.6rem] leading-[2.6rem] text-gray-200 gap-[0.4rem]">
        {adjustedStartPage > 1 && (
          <>
            <button onClick={() => onPageChange(1)} className="w-[4.8rem] h-[4.8rem]">
              1
            </button>
            {adjustedStartPage > 2 && <span className="w-[4.8rem] h-[4.8rem]">···</span>}
          </>
        )}

        {Array.from({ length: endPage - adjustedStartPage + 1 }, (_, index) => {
          const pageNumber = adjustedStartPage + index;
          return (
            <button
              key={pageNumber}
              className={`${currentPage === pageNumber ? 'font-semibold text-black-400' : ''} w-[4.8rem] h-[4.8rem]`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="w-[4.8rem] h-[4.8rem]">···</span>}
            <button onClick={() => onPageChange(totalPages)} className="w-[4.8rem] h-[4.8rem]">
              {totalPages}
            </button>
          </>
        )}
      </div>

      <div className={currentPage !== totalPages ? 'cursor-pointer' : ''}>
        <Image
          onClick={handleNext}
          src={currentPage === totalPages ? right : right_active}
          alt="right_arrow"
          width={48}
          height={48}
          className="lg:block sm:hidden"
        />
        <Image
          onClick={handleNext}
          src={currentPage === totalPages ? right : right_active}
          alt="right_arrow"
          width={34}
          height={34}
          className="lg:hidden sm:block"
        />
      </div>
    </div>
  );
}
