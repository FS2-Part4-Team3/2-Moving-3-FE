import SendQuotationModal from '@/components/modal/SendQuotationModal';

export default {
  title: 'Components/Modals/SendQuotationModal',
  component: SendQuotationModal,
};

const Template = () => <SendQuotationModal onClose={() => console.log('close')} />;

export const Default = Template.bind({});
