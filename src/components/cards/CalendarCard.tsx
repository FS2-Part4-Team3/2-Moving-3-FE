`use client`;

import { useState } from "react";
import { ButtonWrapper } from "../common/headless/Button";
import Image from "next/image";
import left from "@/../public/assets/calendar/arrow-left.svg";
import right from "@/../public/assets/calendar/arrow-right.svg";
import type { Day } from "@/interfaces/Card/CalendarCardInterface";
import weekdays from "@/constants/weekdays";

export default function CalendarCard() {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const getDaysInMonth = (date: Date): Day[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const startOfMonth = new Date(year, month, 1);
    const endOfMonth = new Date(year, month + 1, 0);

    const prevDays: Day[] = Array.from(
      { length: startOfMonth.getDay() },
      (_, i) => {
        const prevDate = new Date(year, month, -i);
        return { date: prevDate.getDate(), isCurrentMonth: false };
      }
    ).reverse();

    const currentDays: Day[] = Array.from(
      { length: endOfMonth.getDate() },
      (_, i) => ({
        date: i + 1,
        isCurrentMonth: true,
      })
    );

    const nextDays: Day[] = Array.from(
      { length: 6 - endOfMonth.getDay() },
      (_, i) => ({
        date: i + 1,
        isCurrentMonth: false,
      })
    );

    return [...prevDays, ...currentDays, ...nextDays];
  };

  const handlePrev = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
    );
  };

  const handleNext = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    );
  };

  const handleDateClick = (day: Day) => {
    if (day.isCurrentMonth) {
      const selected = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day.date
      );
      setSelectedDate(selected);
    }
  };

  const handleSelectComplte = () => {
    if (selectedDate) {
      return;
      //toDo: 추후에 page에서 나타낼 props 설정
    }
  };

  const daysInMonth = getDaysInMonth(currentMonth);

  return (
    <div className="lg:w-[64rem]  flex flex-col items-center rounded-[3.2rem] py-[2.4rem] gap-[2.4rem] bg-white border-none">
      <div className="flex lg:w-[64rem] lg:h-[6rem] justify-between items-center px-[1.2rem] py-[1.4rem]">
        <div
          className="relative lg:w-[3.6rem] lg:h-[3.6rem] cursor-pointer"
          onClick={handlePrev}
        >
          <Image src={left} alt="이전 달" fill />
        </div>
        <p className="text-[2rem] font-semibold ">
          {currentMonth.getFullYear()}.
          {String(currentMonth.getMonth() + 1).padStart(2, "0")}
        </p>
        <div
          className="relative lg:w-[3.6rem] lg:h-[3.6rem] cursor-pointer"
          onClick={handleNext}
        >
          <Image src={right} alt="다음 달" fill />
        </div>
      </div>
      <div className="grid grid-cols-7 text-center lg:w-[64rem] lg:h-[6.8rem] py-[0.2rem] px-[3.6rem] justify-items-center">
        {weekdays.map((day, index) => (
          <div
            key={index}
            className="w-[4rem] h-[4rem] text-[2rem] font-medium text-gray-500 flex justify-center items-center"
          >
            {day.name}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 text-center lg:w-[64rem] py-[0.2rem] px-[3.6rem] justify-items-center gap-y-[3rem]">
        {daysInMonth.map((day, index) => (
          <div
            key={index}
            onClick={() => handleDateClick(day)}
            className={`cursor-pointer text-[2rem] font-medium w-[4rem] h-[4rem] flex justify-center items-center ${
              day.isCurrentMonth
                ? selectedDate &&
                  selectedDate.getDate() === day.date &&
                  selectedDate.getMonth() === currentMonth.getMonth()
                  ? "bg-blue-300 text-white rounded-full "
                  : "text-black-400"
                : "text-gray-100"
            }  `}
          >
            {day.date}
          </div>
        ))}
      </div>
      <ButtonWrapper id="calendar button">
        <ButtonWrapper.Button
          disabled={!selectedDate}
          onClick={handleSelectComplte}
          className="lg:w-[56rem] lg:h-[6.4rem] rounded-[1.6rem] p-[1.6rem] text-center text-[2rem] font-semibold text-white"
        >
          선택완료
        </ButtonWrapper.Button>
      </ButtonWrapper>
    </div>
  );
}
