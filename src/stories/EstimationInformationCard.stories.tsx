import type { StoryFn } from '@storybook/react';
import React from 'react';
import EstimationInformationCard from '@/components/cards/EstimateInformationCard';
import type { EstimationInformationCardProps } from '@/interfaces/Card/EstimationInformationCardInterface';

export default {
  title: 'Components/Cards/EstimationInformationCard',
  component: EstimationInformationCard,
};

const Template: StoryFn<EstimationInformationCardProps> = args => <EstimationInformationCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: {
    updatedAt: '2023-01-01T12:00:00Z',
    moveInfo: {
      type: 'SMALL',
      date: '2023-01-01',
      fromAddress: '서울 중구 삼일대로 343',
      toAddress: '서울 중구 청계천로 100',
    },
  },
};
