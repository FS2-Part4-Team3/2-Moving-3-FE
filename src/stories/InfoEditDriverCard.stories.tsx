import type { StoryFn } from '@storybook/react';
import InfoEditDriverCard from '@/components/cards/InfoEditDriverCard';
import { InfoEditDriverCardProps } from '@/interfaces/Card/InfoEditDriverCardInterface';

export default {
  title: 'Components/Cards/InfoEditDriverCard',
  component: InfoEditDriverCard,
};

const Template: StoryFn<InfoEditDriverCardProps> = (args: InfoEditDriverCardProps) => <InfoEditDriverCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: {
    id: 'driver-999',
    serviceType: ['SMALL', 'HOME'],
    availableAreas: ['SEOUL', 'GYEONGGI'],
    introduce: '5년 경력의 신뢰할 수 있는 기사입니다.',
    image: 'http://placehold.it/56x56',
    name: '홍길동',
    rating: 4.8,
    career: 5,
    applyCount: 10,
    reviewCount: 200,
  },
};
