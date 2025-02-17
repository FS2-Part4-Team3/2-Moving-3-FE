import type { StoryFn } from '@storybook/react';
import WaitingQuoteCard from '@/components/cards/WaitingQuoteCard';
import type { WaitingQuoteCardProps } from '@/interfaces/Card/WaitingQuoteCardInterface';

export default {
  title: 'Components/Cards/WaitingQuoteCard',
  component: WaitingQuoteCard,
};

const Template: StoryFn<WaitingQuoteCardProps> = args => <WaitingQuoteCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: {
    driver: {
      id: 'driver-1',
      name: '김철수',
      image: 'https://example.com/driver1.jpg',
      applyCount: 10,
      likeCount: 5,
      rating: 4.8,
      career: 9,
      reviewCount: 200,
    },
    estimationInfo: {
      estimationId: 'estimation-1',
      price: 200000,
    },
    moveInfo: {
      serviceType: 'HOME',
      date: '2025-02-01T12:00:00Z',
      fromAddress: '서울 중구 삼일대로 343',
      toAddress: '서울 중구 청계천로 100',
    },
    designatedRequest: 'Active',
  },
};
