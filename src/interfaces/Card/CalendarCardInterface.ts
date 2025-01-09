import type { Dispatch, SetStateAction } from "react";

export interface Day {
  date: number;
  isCurrentMonth: boolean;
}

export interface Weekdays {
  name: string;
}

export interface CalendarCardProps {
  setMovingDate: Dispatch<SetStateAction<Date | null>>;
  setIsMovingDate: Dispatch<SetStateAction<boolean>>;
  initialMovingDate: Date | null;
}
