import { current } from "@reduxjs/toolkit";
import { useState } from "react";
import { ButtonWrapper } from "../common/headless/Button";

export default function CalendarCard() {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1);
    const day = String(date.getDate());

    return `${year}년 ${month}월 ${day}일`;
  };

  const handleDateSelect = (date: Date) => {
    const formattedDate = formatDate(date);
    setSelectedDate(formattedDate);
  };

  const handleGenerateDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();

    return Array.from({ length: lastDayOfMonth }, (_, index) => {
      const day = new Date(year, month, index + 1);
      const formattedDay = formatDate(day);
      const isSelected = formattedDay === selectedDate;

      const isPast = day < today;

      return (
        <div key={index}>
          <p>{day.getDate()}</p>
        </div>
      );
    });
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

  return (
    <div>
      <div>
        <button onClick={handlePrev}>&lt;</button>
        <p>
          {currentMonth.toLocaleString("defalut", {
            year: "numeric",
            month: "long",
          })}
        </p>
        <button onClick={handleNext}>&gt;</button>
      </div>
      <div>
        <div>{handleGenerateDays(currentMonth)}</div>
      </div>
      <ButtonWrapper id="calendar button">
        <ButtonWrapper.Button>선택완료</ButtonWrapper.Button>
      </ButtonWrapper>
    </div>
  );
}
