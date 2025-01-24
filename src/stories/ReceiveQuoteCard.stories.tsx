import type { StoryFn } from '@storybook/react';
import ReceiveQuoteCard from '@/components/cards/ReceiveQuoteCard';
import type { ReceiveQuoteCardProps } from '@/interfaces/Card/ReceiveQuoteCardInterface';

export default {
  title: 'Components/Cards/ReceiveQuoteCard',
  component: ReceiveQuoteCard,
};

const Template: StoryFn<ReceiveQuoteCardProps> = args => <ReceiveQuoteCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: {
    id: 'moveinfo-1',
    updatedAt: '2025-01-01T12:00:00Z',
    serviceType: 'HOME',
    date: '2025-02-01T12:00:00Z',
    fromAddress: '서울 중구 삼일대로 343',
    toAddress: '서울 중구 청계천로 100',
    owner: { name: '홍길동' },
  },
};
