import type { StoryFn } from '@storybook/react';
import NormalReviewCard from '@/components/cards/NormalReviewCard';
import type { ReviewCardEstimations, ReviewCardProps, ReviewCardReviews } from '@/interfaces/Card/NormalReviewCardInterface';

export default {
  title: 'Components/Cards/NormalReviewCard',
  component: NormalReviewCard,
};

const mockEstimationData: ReviewCardEstimations = {
  id: '1',
  moveInfo: {
    type: 'SMALL',
    date: '2025-01-20',
  },
  driver: {
    name: '김코드',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhNJEXqIaNHfAlHrN588FXk4quCwsg0mz19g&s',
  },
  price: 150000,
};

const mockReviewData: ReviewCardReviews = {
  owner: '1',
  comment: '코멘트입니다!',
  score: 3,
  createdAt: '2025-01-01T12:00:00Z',
};

const Template: StoryFn<ReviewCardProps> = args => <NormalReviewCard {...args} />;

export const writable = Template.bind({});
writable.args = {
  estimation: mockEstimationData,
  type: 'ABLE',
};

export const written = Template.bind({});
written.args = {
  estimation: mockEstimationData,
  type: 'MY',
  review: mockReviewData,
};
