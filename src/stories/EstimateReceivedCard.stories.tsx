import { type StoryFn } from '@storybook/react';
import EstimateReceivedCard from '@/components/cards/EstimateReceivedCard';
import type { EstimateReceivedCardProps } from '@/interfaces/Card/EstimateReceivedCardInterface';

export default {
  title: 'Components/Cards/EstimateReceivedCard',
  component: EstimateReceivedCard,
};

const Template: StoryFn<EstimateReceivedCardProps> = args => <EstimateReceivedCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: {
    price: 100000,
    comment: '이사는 순조롭게 진행되었습니다.',
    driver: {
      name: '홍길동',
      image: 'https://example.com/image.jpg',
      applyCount: 5,
      likeCount: 10,
      rating: 4.5,
      career: 3,
      reviewCount: 20,
      isliked: true,
    },
    isSpecificRequest: true,
  },
};
