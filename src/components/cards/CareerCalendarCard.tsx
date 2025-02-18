'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import left from '@/../public/assets/calendar/arrow-left.svg';
import right from '@/../public/assets/calendar/arrow-right.svg';
import weekdays from '@/constants/weekdays';
import type { CalendarCardProps, CareerCalendarCardProps, Day } from '@/interfaces/Card/CalendarCardInterface';
import { getDaysInMonth } from '@/utils/Format';
import { ButtonWrapper } from '../common/headless/Button';

export default function CareerCalendarCard({ setCareerDate, setIsCareerOpen, initialCareerDate }: CareerCalendarCardProps) {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialCareerDate);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

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

    if (selected > today) {
      return;
    }
    setSelectedDate(selected);
  };

  const handleSelectComplte = () => {
    if (selectedDate) {
      setCareerDate(selectedDate);
    }
    setIsCareerOpen(false);
  };

  const daysInMonth = getDaysInMonth(currentMonth);

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [newYear, newMonth] = e.target.value.split('-');
    const newDate = new Date(Number(newYear), Number(newMonth) - 1, 1);
    setCurrentMonth(newDate);

    setIsDatePickerOpen(false);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentMonth(new Date(Number(e.target.value), currentMonth.getMonth(), 1));
  };

  return (
    <div className="lg:w-[55rem] md:w-[32.7rem] sm:w-[32.7rem] flex flex-col items-center lg:rounded-[3.2rem] md:rounded-[1.6rem] sm:rounded-[1.6rem] lg:py-[2.4rem] md:py-[1.4rem] sm:py-[1.4rem] lg:gap-[2.4rem] md:gap-[1.6rem] sm:gap-[1.6rem] bg-white border-none ">
      <div className="flex lg:w-[55rem] md:w-[32.7rem] sm:w-[32.7rem] lg:h-[6rem] md:h-[4.8rem] sm:h-[4.8rem] justify-between items-center px-[1.4rem] lg:py-[1.2rem] md:py-[1rem] sm:py-[1rem]">
        <div
          className="relative lg:w-[3.6rem] lg:h-[3.6rem] md:w-[2.4rem] md:h-[2.4rem] sm:w-[2.4rem] sm:h-[2.4rem] cursor-pointer"
          onClick={handlePrev}
        >
          <Image src={left} alt="이전 달" fill />
        </div>
        <p
          className="lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] text-black-400 font-semibold cursor-pointer"
          onClick={() => setIsDatePickerOpen(prev => !prev)}
        >
          {currentMonth.getFullYear()}.{String(currentMonth.getMonth() + 1).padStart(2, '0')}
        </p>
        <div
          className="relative lg:w-[3.6rem] lg:h-[3.6rem] md:w-[2.4rem] md:h-[2.4rem] sm:w-[2.4rem] sm:h-[2.4rem] cursor-pointer"
          onClick={handleNext}
        >
          <Image src={right} alt="다음 달" fill />
        </div>
      </div>

      {isDatePickerOpen && (
        <div className="absolute bg-white border-none rounded-lg p-4 mt-2">
          <div className="flex gap-10 lg:mt-[0.5rem]">
            <select
              onChange={handleYearChange}
              value={currentMonth.getFullYear()}
              className="w-[10rem] p-2 border-none bg-blue-200 rounded-md text-white text-[2rem] text-center "
            >
              {Array.from({ length: 10 }, (_, i) => currentMonth.getFullYear() - i).map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <select
              onChange={handleMonthChange}
              value={`${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}`}
              className="w-[7rem] p-2 border-none bg-blue-200 rounded-md text-white text-[2rem] text-center"
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                <option key={month} value={`${currentMonth.getFullYear()}-${String(month).padStart(2, '0')}`}>
                  {String(month).padStart(2, '0')}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

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

          const isDisabled = !day.isCurrentMonth || selected > today;
          const isPastDate = selected < today;
          return (
            <div
              key={index}
              onClick={() => handleDateClick(day)}
              className={`lg:w-[4rem] lg:h-[4rem] md:w-[2.6rem] md:h-[2.6rem] sm:w-[2.6rem] sm:h-[2.6rem] lg:text-[2rem] md:text-[1.3rem] sm:text-[1.3rem] cursor-pointer flex justify-center items-center 
             ${isDisabled ? 'cursor-not-allowed text-gray-200' : isPastDate ? 'text-black-400 cursor-pointer' : 'text-black-400 cursor-pointer'}
        ${
          day.isCurrentMonth && selectedDate && selectedDate.getDate() === day.date ? 'bg-blue-300 text-white rounded-full' : ''
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
          className="lg:w-[55rem] lg:h-[6.4rem] md:w-[27.9rem] md:h-[5.4rem] sm:w-[27.9rem] sm:h-[5.4rem] rounded-[1.6rem] p-[1.6rem] text-center lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-semibold text-white"
        >
          선택완료
        </ButtonWrapper.Button>
      </ButtonWrapper>
    </div>
  );
}
