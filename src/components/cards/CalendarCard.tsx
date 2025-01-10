'use client';

import Image from 'next/image';
import { useState } from 'react';
import left from '@/../public/assets/calendar/arrow-left.svg';
import right from '@/../public/assets/calendar/arrow-right.svg';
import weekdays from '@/constants/weekdays';
import type { CalendarCardProps, Day } from '@/interfaces/Card/CalendarCardInterface';
import { getDaysInMonth } from '@/utils/Format';
import { ButtonWrapper } from '../common/headless/Button';

export default function CalendarCard({ setMovingDate, setIsMovingDate, initialMovingDate }: CalendarCardProps) {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialMovingDate);

  const handlePrev = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNext = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleDateClick = (day: Day) => {
    const selected = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day.date);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!day.isCurrentMonth || selected < today) {
      return;
    }

    setSelectedDate(selected);
  };

  const handleSelectComplte = () => {
    setMovingDate(selectedDate);
    setIsMovingDate(true);
    if (selectedDate) {
      return;
      //toDo: 추후에 page에서 나타낼 props 설정
    }
  };

  const daysInMonth = getDaysInMonth(currentMonth);

  return (
    <div className="lg:w-[64rem] md:w-[32.7rem] sm:w-[32.7rem] flex flex-col items-center lg:rounded-[3.2rem] md:rounded-[1.6rem] sm:rounded-[1.6rem] lg:py-[2.4rem] md:py-[1.4rem] sm:py-[1.4rem] lg:gap-[2.4rem] md:gap-[1.6rem] sm:gap-[1.6rem] bg-white border-none">
      <div className="flex lg:w-[64rem] md:w-[32.7rem] sm:w-[32.7rem] lg:h-[6rem] md:h-[4.8rem] sm:h-[4.8rem] justify-between items-center px-[1.4rem] lg:py-[1.2rem] md:py-[1rem] sm:py-[1rem]">
        <div
          className="relative lg:w-[3.6rem] lg:h-[3.6rem] md:w-[2.4rem] md:h-[2.4rem] sm:w-[2.4rem] sm:h-[2.4rem] cursor-pointer"
          onClick={handlePrev}
        >
          <Image src={left} alt="이전 달" fill />
        </div>
        <p className="lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] text-black-400 font-semibold ">
          {currentMonth.getFullYear()}.{String(currentMonth.getMonth() + 1).padStart(2, '0')}
        </p>
        <div
          className="relative lg:w-[3.6rem] lg:h-[3.6rem] md:w-[2.4rem] md:h-[2.4rem] sm:w-[2.4rem] sm:h-[2.4rem] cursor-pointer"
          onClick={handleNext}
        >
          <Image src={right} alt="다음 달" fill />
        </div>
      </div>
      <div className="grid grid-cols-7 text-center lg:w-[64rem] md:w-[32.7rem] sm:w-[32.7rem] lg:h-[6.8rem] py-[0.2rem] lg:px-[3.6rem] md:px-[0.9rem] sm:px-[0.9rem] justify-items-center">
        {weekdays.map((day, index) => (
          <div
            key={index}
            className="lg:w-[4rem] lg:h-[4rem] md:w-[2.6rem] md:h-[2.6rem] sm:w-[2.6rem] sm:h-[2.6rem] lg:text-[2rem] md:text-[1.3rem] sm:text-[1.3rem] font-medium text-gray-500 flex justify-center items-center"
          >
            {day.name}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 text-center lg:w-[64rem] md:w-[32.7rem] sm:w-[32.7rem] py-[0.2rem] lg:px-[3.6rem] md:px-[0.9rem] sm:px-[0.9rem] justify-items-center lg:gap-y-[3rem] md:gap-y-[1.2rem] sm:gap-y-[1.2rem]">
        {daysInMonth.map((day, index) => {
          const selected = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day.date);
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          const isDisabled = !day.isCurrentMonth || selected < today;
          return (
            <div
              key={index}
              onClick={() => handleDateClick(day)}
              className={`lg:w-[4rem] lg:h-[4rem] md:w-[2.6rem] md:h-[2.6rem] sm:w-[2.6rem] sm:h-[2.6rem] lg:text-[2rem] md:text-[1.3rem] sm:text-[1.3rem] cursor-pointer flex justify-center items-center 
             ${isDisabled ? 'cursor-not-allowed text-gray-200' : 'cursor-pointer text-black-400'}
        ${
          day.isCurrentMonth &&
          selectedDate &&
          selectedDate.getDate() === day.date &&
          selectedDate.getMonth() === currentMonth.getMonth()
            ? 'bg-blue-300 text-white rounded-full'
            : ''
        }   `}
            >
              {day.date}
            </div>
          );
        })}
      </div>
      <ButtonWrapper id="calendar button">
        <ButtonWrapper.Button
          disabled={!selectedDate}
          onClick={handleSelectComplte}
          className="lg:w-[56rem] lg:h-[6.4rem] md:w-[27.9rem] md:h-[5.4rem] sm:w-[27.9rem] sm:h-[5.4rem] rounded-[1.6rem] p-[1.6rem] text-center lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-semibold text-white"
        >
          선택완료
        </ButtonWrapper.Button>
      </ButtonWrapper>
    </div>
  );
}
