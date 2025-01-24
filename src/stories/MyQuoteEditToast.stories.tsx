import type { StoryFn } from '@storybook/react';
import MyQuoteEditToast from '@/components/toasts/MyQuoteEditToast';
import type { MyQuoteEditToastProps } from '@/interfaces/Toast/MyQuoteEditToastInterface';

export default {
  title: 'Components/Toasts/MyQuoteEditToast',
  component: MyQuoteEditToast,
};

const Template: StoryFn<MyQuoteEditToastProps> = args => <MyQuoteEditToast {...args} />;

export const Default = Template.bind({});
Default.args = {
  onClose: () => {
    alert('토스트가 닫혔습니다.');
  },
};
