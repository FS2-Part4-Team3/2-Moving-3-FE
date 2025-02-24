import type { StoryFn } from '@storybook/react';
import FindDriverCard from '@/components/cards/FindDriverCard';
import type { FindDriverCardProps } from '@/interfaces/Card/FindDriverCardInterface';

export default {
  title: 'Components/Cards/FindDriverCard',
  component: FindDriverCard,
};

const Template: StoryFn<FindDriverCardProps> = args => <FindDriverCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: {
    id: 'driver-999',
    serviceType: ['SMALL', 'HOME'],
    introduce: '5년 경력의 신뢰할 수 있는 기사입니다.',
    image: 'http://placehold.it/56x56',
    name: '홍길동',
    likeCount: 120,
    rating: 4.5,
    career: 5,
    applyCount: 10,
    reviewCount: 200,
  },
};
