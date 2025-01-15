import type { ReviewCardEstimations, ReviewCardReviews } from '../Card/NormalReviewCardInterface';

export interface WritingReviewModalProps {
  estimation: ReviewCardEstimations;
  setIsModalOpen: (args: boolean) => void;
}
