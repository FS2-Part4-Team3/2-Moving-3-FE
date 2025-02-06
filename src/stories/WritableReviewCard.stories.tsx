import type { StoryFn } from '@storybook/react';
import WritableReviewCard from '@/components/cards/WritableReviewCard';
import { EstimationItem, ReviewCardEstimationsProps } from '@/interfaces/Card/NormalReviewCardInterface';

export default {
  title: 'Components/Cards/WritableReviewCard',
  component: WritableReviewCard,
};

const mockEstimationData: EstimationItem = {
  driver: {
    image: '/mock-driver-image.jpg',
    name: '홍길동',
  },
  moveInfo: {
    serviceType: 'SMALL',
    date: '2025-01-20',
  },
  estimationInfo: {
    price: 150000,
    estimationId: '123123',
  },
  designatedRequest: 'Active',
};

const Template: StoryFn<ReviewCardEstimationsProps> = args => <WritableReviewCard {...args} />;

export const writable = Template.bind({});
writable.args = {
  estimation: mockEstimationData,
};
