import type { MyReviews, ReviewCardEstimations } from '../Card/NormalReviewCardInterface';

export interface WritingReviewModalProps {
  estimation: ReviewCardEstimations;
  setIsModalOpen: (args: boolean) => void;
}
