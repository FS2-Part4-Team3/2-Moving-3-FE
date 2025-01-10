import type { StoryFn } from '@storybook/react';
import DriverReviewCard from '@/components/cards/DriverReviewCard';
import type { DriverReviewCardProps } from '@/interfaces/Card/DriverReviewCardInterface';

export default {
  title: 'Components/Cards/DriverReviewCard',
  component: DriverReviewCard,
};

const Template: StoryFn<DriverReviewCardProps> = args => <DriverReviewCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  reviews: [
    {
      owner: '홍길동',
      createdAt: '2025-01-09T14:48:00.000Z',
      score: 4,
      comment: '좋은 서비스였습니다!',
    },
    {
      owner: '이순신',
      createdAt: '2025-01-08T10:15:00.000Z',
      score: 5,
      comment: '완벽한 서비스, 추천합니다!',
    },
    {
      owner: '강감찬',
      createdAt: '2025-01-07T08:30:00.000Z',
      score: 3,
      comment: '보통이었습니다.',
    },
  ],
};

export const NoReviews = Template.bind({});
NoReviews.args = {
  reviews: [],
};

export const SingleReview = Template.bind({});
SingleReview.args = {
  reviews: [
    {
      owner: '유비',
      createdAt: '2025-01-10T12:00:00.000Z',
      score: 2,
      comment: '서비스가 부족했어요.',
    },
  ],
};
