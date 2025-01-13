import type { StoryFn } from '@storybook/react';
import { useState } from 'react';
import AddressModal from '@/components/modal/AddressModal';
import type { AddressModalProps } from '@/interfaces/Modal/AddressModalInterface';

export default {
  title: 'Components/Modals/AddressModal',
  component: AddressModal,
  parameters: {
    layout: 'fullscreen',
  },
};

const Template: StoryFn<AddressModalProps> = args => {
  const [regions, setRegions] = useState({ start: '', arrival: '' });

  return <AddressModal {...args} setRegions={setRegions} />;
};

export const StartModalOpen = Template.bind({});
StartModalOpen.args = {
  handleModalClose: () => alert('Modal closed'),
  isArrivalModalOpen: false,
  isStartModalOpen: true,
};

export const ArrivalModalOpen = Template.bind({});
ArrivalModalOpen.args = {
  handleModalClose: () => alert('Modal closed'),
  isArrivalModalOpen: true,
  isStartModalOpen: false,
};
