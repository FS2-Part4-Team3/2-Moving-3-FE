import type { StoryFn } from '@storybook/react';
import ManageQuotationCard from '@/components/cards/ManageQuotationCard';
import type { ManageQuotationCardProps } from '@/interfaces/Card/ManageQuotationCardInterface';

export default {
  title: 'Components/Cards/ManageQuotationCard',
  component: ManageQuotationCard,
};

const Template: StoryFn<ManageQuotationCardProps> = args => <ManageQuotationCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: {
    estimationInfo: {
      createdAt: '2025-01-01T12:00:00Z',
      estimationId: '1',
      price: 200000,
    },
    moveInfo: {
      date: '2025-02-01T12:00:00Z',
      serviceType: 'SMALL',
      fromAddress: '서울 중구 삼일대로 343',
      toAddress: '서울 중구 청계천로 100',
    },
    user: {
      name: '1',
    },
    designatedRequest: 'Active',
    progress: 'OPEN',
  },
};
