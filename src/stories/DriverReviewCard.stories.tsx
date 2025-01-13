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
  review: {
    owner: '홍길동',
    createdAt: '2025-01-09T14:48:00.000Z',
    score: 4,
    comment: '좋은 서비스였습니다!',
  },
};
