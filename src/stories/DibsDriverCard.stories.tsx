import type { StoryFn } from '@storybook/react';
import DibsDriverCard from '@/components/cards/DibsDriverCard';
import type { DibsDriverCardProps } from '@/interfaces/Card/DibsDriverCardInterface';

export default {
  title: 'Components/Cards/DibsDriverCard',
  component: DibsDriverCard,
};

const Template: StoryFn<DibsDriverCardProps> = args => <DibsDriverCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: {
    id: 'driver-1',
    serviceType: ['HOME', 'SMALL'],
    introduce: '안녕하세요, 저는 경험이 많은 드라이버입니다.',
    image: 'http://placehold.it/56x56',
    name: '홍길동',
    favoriteCount: 10,
    score: 4.5,
    reviewCount: 20,
    career: 5,
    applyCount: 15,
  },
};
