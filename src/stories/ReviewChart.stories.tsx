import type { StoryFn } from '@storybook/react';
import ReviewChart from '@/components/cards/ReviewChart';
import type { ReviewChartProps } from '@/interfaces/Card/ReviewChartInterface';

export default {
  title: 'Components/Cards/ReviewChart',
  component: ReviewChart,
};

const Template: StoryFn<ReviewChartProps> = args => <ReviewChart {...args} />;

export const Default = Template.bind({});
Default.args = {
  totalCount: 24,
  data: {
    averageRating: 4.2,
    ratingCounts: [4, 5, 4, 5, 6],
  },
};

export const HighScore = Template.bind({});
HighScore.args = {
  totalCount: 6,
  data: {
    averageRating: 4.9,
    ratingCounts: [5, 1, 0, 0, 0],
  },
};

export const LowScore = Template.bind({});
LowScore.args = {
  totalCount: 7,
  data: {
    averageRating: 1.5,
    ratingCounts: [0, 0, 1, 2, 4],
  },
};

export const NoReviews = Template.bind({});
NoReviews.args = {
  totalCount: 0,
  data: {
    averageRating: 0,
    ratingCounts: [0, 0, 0, 0, 0],
  },
};
