import type { StoryFn } from '@storybook/react';
import NormalReviewCard from '@/components/cards/NormalReviewCard';
import type { ReviewCardEstimations, ReviewCardProps, ReviewCardReviews } from '@/interfaces/Card/NormalReviewCardInterface';

export default {
  title: 'Components/Cards/NormalReviewCard',
  component: NormalReviewCard,
};

const mockEstimationData: ReviewCardEstimations = {
  id: '1',
  createdAt: '2025-01-15T08:00:00Z',
  comment: '이사는 잘 마쳤습니다!',
  score: 4,
  driver: {
    name: '김코드',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhNJEXqIaNHfAlHrN588FXk4quCwsg0mz19g&s',
  },
  estimation: {
    price: 150000,
    moveInfos: {
      serviceType: 'SMALL',
      date: '2025-01-20',
      isSpecificRequest: false,
    },
  },
};

const mockReviewData: ReviewCardReviews = {
  owner: '1',
  comment: '코멘트입니다!',
  score: 3,
  createdAt: '2025-01-01T12:00:00Z',
};

const Template: StoryFn<ReviewCardProps> = args => <NormalReviewCard {...args} />;

export const writable = Template.bind({});
writable.args = {
  type: 'ABLE',
};

export const written = Template.bind({});
written.args = {
  type: 'MY',
};
