import type { StoryFn } from '@storybook/react';
import ReviewCard from '@/components/cards/ReviewCard';
import type { ReviewCardEstimations, ReviewCardProps } from '@/interfaces/Card/ReviewCardInterface';

export default {
  title: 'Components/Cards/ReviewCard',
  component: ReviewCard,
};

const mockEstimationData: ReviewCardEstimations = {
  id: '1',
  moveInfo: {
    type: ['SMALL', 'APPOINTMENT'],
    date: '2025-01-20',
  },
  driver: {
    name: '김코드',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhNJEXqIaNHfAlHrN588FXk4quCwsg0mz19g&s',
  },
  price: 150000,
};

const Template: StoryFn<ReviewCardProps> = args => <ReviewCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  estimation: mockEstimationData,
};
