import type { StoryFn } from '@storybook/react';
import WritingReviewModal from '@/components/modal/WritingReviewModal';
import type { ReviewCardEstimations, ReviewCardReviews } from '@/interfaces/Card/NormalReviewCardInterface';
import type { WritingReviewModalProps } from '@/interfaces/Modal/WritingReveiwModalInterface';

export default {
  title: 'Components/Modals/WritingReviewModal',
  component: WritingReviewModal,
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

const Template: StoryFn<WritingReviewModalProps> = args => <WritingReviewModal {...args} />;

export const Default = Template.bind({});
Default.args = {
  estimation: mockEstimationData,
};
