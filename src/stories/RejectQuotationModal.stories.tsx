import RejectQuotationModal from '@/components/modal/RejectQuotationModal';

export default {
  title: 'Components/Modals/RejectQuotationModal',
  component: RejectQuotationModal,
};

const Template = () => <RejectQuotationModal onClose={() => console.log('close')} />;

export const Default = Template.bind({});
