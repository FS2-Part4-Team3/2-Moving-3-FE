import { StoryFn } from '@storybook/react';
import SendQuotationModal from '@/components/modal/SendQuotationModal';
import { SendQuotationModalProps } from '@/interfaces/Modal/SendQuotationModalInterface';

export default {
  title: 'Components/Modals/SendQuotationModal',
  component: SendQuotationModal,
};

const Template: StoryFn<SendQuotationModalProps> = args => <SendQuotationModal {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: {
    id: '12',
    owner: {
      name: '홍길동',
    },
    date: '2025-02-01T12:00:00Z',
    fromAddress: '서울 중구 삼일대로 343',
    toAddress: '서울 중구 청계천로 100',
    serviceType: 'HOME',
    isSpecificRequest: true,
  },
};
