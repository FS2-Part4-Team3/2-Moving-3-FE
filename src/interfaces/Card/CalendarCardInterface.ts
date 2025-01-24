import type { Dispatch, SetStateAction } from 'react';

export interface Day {
  date: number;
  isCurrentMonth: boolean;
}

export interface Weekdays {
  name: string;
}

export interface CalendarCardProps {
  setMovingDate: Dispatch<SetStateAction<Date>>;
  setIsMovingDate: Dispatch<SetStateAction<boolean>>;
  initialMovingDate: Date;
}

export interface CareerCalendarCardProps {
  setCareerDate: (args: Date) => void;
  setIsCareerOpen: Dispatch<SetStateAction<boolean>>;
  initialCareerDate: Date | null;
}
