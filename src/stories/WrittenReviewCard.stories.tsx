import type { StoryFn } from '@storybook/react';
import WrittenReviewCard from '@/components/cards/WrittenReviewCard';
import type {
  MyReviewItem,
  ReviewCardEstimations,
  ReviewCardProps,
  ReviewCardReviews,
} from '@/interfaces/Card/NormalReviewCardInterface';

export default {
  title: 'Components/Cards/WrittenReviewCard',
  component: WrittenReviewCard,
};

const mockReviewData: MyReviewItem = {
  id: '1',
  createdAt: '2025-01-15T08:00:00Z',
  comment: '이사는 잘 마쳤습니다!',
  score: 4,
  estimation: {
    price: 150000,
    moveInfo: {
      serviceType: 'SMALL',
      date: '2025-01-20',
    },
    isSpecificRequest: true,
  },
  driver: {
    name: '김코드',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhNJEXqIaNHfAlHrN588FXk4quCwsg0mz19g&s',
  },
};

const Template: StoryFn<ReviewCardProps> = args => <WrittenReviewCard {...args} />;

export const written = Template.bind({});
written.args = {
  myReview: mockReviewData,
};
