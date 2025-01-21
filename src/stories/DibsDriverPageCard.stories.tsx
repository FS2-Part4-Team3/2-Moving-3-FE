import { StoryFn } from '@storybook/react';
import DibsDriverPageCard from '@/components/cards/DibsDriverPageCard';
import { DibsDriverPageCardProps } from '@/interfaces/Card/DibsDriverPageCardInterface';

export default {
  title: 'Components/Cards/DibsDriverPageCard',
  component: DibsDriverPageCard,
};

const Template: StoryFn<DibsDriverPageCardProps> = args => <DibsDriverPageCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: {
    serviceType: ['SMALL', 'HOME'],
    image: 'https://via.placeholder.com/80',
    name: '홍길동',
    likeCount: 10,
    rating: 4.5,
    reviewCount: 20,
    career: 5,
    applyCount: 3,
  },
};
