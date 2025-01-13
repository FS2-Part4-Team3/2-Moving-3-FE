import type { StoryFn } from '@storybook/react';
import { useState } from 'react';
import AddressCard from '@/components/cards/AddressCard';
import type { AddressCardProps } from '@/interfaces/Card/AddressCardInterface';

export default {
  title: 'Components/Cards/AddressCard',
  component: AddressCard,
  argTypes: {
    setRegions: { action: 'setRegions' },
  },
};

const Template: StoryFn<AddressCardProps> = args => {
  const [regions, setRegions] = useState({
    start: '',
    arrival: '',
  });

  return <AddressCard {...args} regions={regions} setRegions={setRegions} />;
};

export const Default = Template.bind({});
Default.args = {
  regions: { start: '', arrival: '' },
};

export const StartSelected = Template.bind({});
StartSelected.args = {
  regions: { start: '서울특별시 강남구', arrival: '' },
};

export const ArrivalSelected = Template.bind({});
ArrivalSelected.args = {
  regions: { start: '', arrival: '부산광역시 해운대구' },
};
