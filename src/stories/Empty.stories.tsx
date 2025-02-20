import type { StoryFn } from '@storybook/react';
import Empty from '@/components/common/Empty/Empty';
import type { EmptyProps } from '@/interfaces/CommonComp/EmptyInterface';

export default {
  title: 'Components/Common/Empty',
  component: Empty,
};

const Template: StoryFn<EmptyProps> = args => <Empty {...args} />;

export const ProfileEmpty = Template.bind({});
ProfileEmpty.args = {
  type: 'Profile',
};

export const ReceiveEmpty = Template.bind({});
ReceiveEmpty.args = {
  type: 'ReceivedQuote',
};

export const ReviewEmpty = Template.bind({});
ReviewEmpty.args = {
  type: 'Review',
};

export const DriverEmpty = Template.bind({});
DriverEmpty.args = {
  type: 'Driver',
};

export const RequestEmpty = Template.bind({});
RequestEmpty.args = {
  type: 'RequestQuote',
};
