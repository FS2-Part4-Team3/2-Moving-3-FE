import type { StoryFn } from '@storybook/react';
import ClientQuoteCard from '@/components/cards/ClientQuoteCard';
import type { ClientQuoteCardProps } from '@/interfaces/Card/ClientQuoteCardInterface';

export default {
  title: 'Components/Cards/ClientQuoteCard',
  component: ClientQuoteCard,
};

const Template: StoryFn<ClientQuoteCardProps> = args => <ClientQuoteCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: {
    id: 'estimation-1',
    updatedAt: '2025-01-01T12:00:00Z',
    price: 200000,
    moveInfo: {
      id: 'moveinfo-1',
      updatedAt: '2025-01-01T12:00:00Z',
      type: 'HOME',
      date: '2025-02-01T12:00:00Z',
      fromAddress: '서울 중구 삼일대로 343',
      toAddress: '서울 중구 청계천로 100',
      progress: 'PENDING',
      owner: '김재원',
    },
  },
};
