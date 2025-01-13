import type { StoryFn } from '@storybook/react';
import Pagination from '@/components/common/pagination/pagination';
import type { PaginationProps } from '@/interfaces/CommonComp/PaginationInterface';

export default {
  title: 'Components/common/Pagination',
  component: Pagination,
};

const Template: StoryFn<PaginationProps> = args => <Pagination {...args} />;

export const Default = Template.bind({});
Default.args = {
  currentPage: 1,
  totalPages: 10,
  onPageChange: page => console.log('Page changed to:', page),
};

export const MiddlePage = Template.bind({});
MiddlePage.args = {
  currentPage: 5,
  totalPages: 10,
  onPageChange: page => console.log('Page changed to:', page),
};

export const LastPage = Template.bind({});
LastPage.args = {
  currentPage: 10,
  totalPages: 10,
  onPageChange: page => console.log('Page changed to:', page),
};

export const SinglePage = Template.bind({});
SinglePage.args = {
  currentPage: 1,
  totalPages: 1,
  onPageChange: page => console.log('Page changed to:', page),
};
