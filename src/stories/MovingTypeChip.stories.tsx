import type { StoryFn } from '@storybook/react';
import MovingTypeChips from '@/components/chips/MovingTypeChips';
import type { MovingTypeChipsProps } from '@/interfaces/chip/MovingTypeChipInterface';

export default {
  title: 'Components/Chips/MovingTypeChips',
  component: MovingTypeChips,
};

const Template: StoryFn<MovingTypeChipsProps> = args => <MovingTypeChips {...args} />;

export const Small = Template.bind({});
Small.args = {
  type: 'SMALL',
};

export const Home = Template.bind({});
Home.args = {
  type: 'HOME',
};

export const Company = Template.bind({});
Company.args = {
  type: 'OFFICE',
};

export const Appointment = Template.bind({});
Appointment.args = {
  type: 'APPOINTMENT',
};

export const Waiting = Template.bind({});
Waiting.args = {
  type: 'WAITING',
};
