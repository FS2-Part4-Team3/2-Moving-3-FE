import type { StoryFn } from '@storybook/react';
import { useState } from 'react';
import CalendarCard from '@/components/cards/CalendarCard';
import type { CalendarCardProps } from '@/interfaces/Card/CalendarCardInterface';

export default {
  title: 'Components/Cards/CalendarCard',
  component: CalendarCard,
  argTypes: {
    initialMovingDate: {
      control: 'date',
      description: '달력에서 초기 선택된 날짜',
    },
    setMovingDate: { action: 'setMovingDate', description: '선택된 날짜를 설정하는 함수' },
    setIsMovingDate: { action: 'setIsMovingDate', description: '날짜 이동 여부 설정 함수' },
  },
};

const Template: StoryFn<CalendarCardProps> = args => {
  const [selectedDate, setSelectedDate] = useState<Date>(args.initialMovingDate);
  const [isMovingDate, setIsMovingDate] = useState(false);

  return (
    <CalendarCard
      {...args}
      setMovingDate={date => {
        setSelectedDate(date);
        args.setMovingDate(date);
      }}
      setIsMovingDate={isMoving => {
        setIsMovingDate(isMoving);
        args.setIsMovingDate(isMoving);
      }}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  initialMovingDate: new Date(),
};
