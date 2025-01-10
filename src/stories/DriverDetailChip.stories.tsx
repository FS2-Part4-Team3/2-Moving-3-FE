import type { StoryFn } from '@storybook/react';
import DriverDetailChips from '@/components/chips/DriverDetailChips';
import type { DriverDetailChipProps } from '@/interfaces/chip/DriverDetailChipInterface';

export default {
  title: 'Components/Chips/DriverDetailChips',
  component: DriverDetailChips,
};

const Template: StoryFn<DriverDetailChipProps> = args => <DriverDetailChips {...args} />;

export const Default = Template.bind({});
Default.args = {
  serviceType: ['SMALL', 'HOME', 'OFFICE'],
  availableAreas: ['SEOUL', 'INCHEON', 'GYEONGGI'],
};

export const SingleServiceType = Template.bind({});
SingleServiceType.args = {
  serviceType: ['HOME'],
  availableAreas: ['JEJU'],
};

export const NoAreas = Template.bind({});
NoAreas.args = {
  serviceType: ['SMALL', 'OFFICE'],
  availableAreas: [],
};

export const NoServiceTypes = Template.bind({});
NoServiceTypes.args = {
  serviceType: [],
  availableAreas: ['SEOUL', 'DAEGU'],
};

export const EmptyState = Template.bind({});
EmptyState.args = {
  serviceType: [],
  availableAreas: [],
};
