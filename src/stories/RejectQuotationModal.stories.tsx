import { StoryFn } from '@storybook/react';
import RejectQuotationModal from '@/components/modal/RejectQuotationModal';
import { RejectQuotationModalProps } from '@/interfaces/Modal/RejectQuotationModalInterface';

export default {
  title: 'Components/Modals/RejectQuotationModal',
  component: RejectQuotationModal,
};

const Template: StoryFn<RejectQuotationModalProps> = args => <RejectQuotationModal {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: {
    id: '12',
    owner: {
      name: '김코드',
    },
    date: '2025-02-01T12:00:00Z',
    fromAddress: '서울 중구 삼일대로 343',
    toAddress: '서울 중구 청계천로 100',
    serviceType: 'HOME',
    isSpecificRequest: true,
  },
};
