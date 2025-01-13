import type { StoryFn } from '@storybook/react';
import ReviewChart from '@/components/cards/ReviewChart';
import type { ReviewChartProps } from '@/interfaces/Card/ReviewChartInterface';

export default {
  title: 'Components/Card/ReviewChart',
  component: ReviewChart,
};

const Template: StoryFn<ReviewChartProps> = args => <ReviewChart {...args} />;

export const Default = Template.bind({});
Default.args = {
  score: 4.2,
  reviewCount: 24,
  data: [
    { score: 5 },
    { score: 4 },
    { score: 3 },
    { score: 5 },
    { score: 4 },
    { score: 2 },
    { score: 1 },
    { score: 5 },
    { score: 4 },
    { score: 5 },
    { score: 5 },
    { score: 5 },
    { score: 5 },
    { score: 5 },
    { score: 5 },
    { score: 5 },
    { score: 5 },
    { score: 5 },
    { score: 5 },
    { score: 5 },
    { score: 5 },
    { score: 5 },
    { score: 5 },
    { score: 5 },
  ],
};

export const HighScore = Template.bind({});
HighScore.args = {
  score: 4.9,
  reviewCount: 6,
  data: [{ score: 5 }, { score: 5 }, { score: 5 }, { score: 5 }, { score: 5 }, { score: 4 }],
};

export const LowScore = Template.bind({});
LowScore.args = {
  score: 1.5,
  reviewCount: 7,
  data: [{ score: 1 }, { score: 1 }, { score: 2 }, { score: 3 }, { score: 1 }, { score: 2 }, { score: 1 }],
};

export const NoReviews = Template.bind({});
NoReviews.args = {
  score: 0,
  reviewCount: 0,
  data: [],
};
