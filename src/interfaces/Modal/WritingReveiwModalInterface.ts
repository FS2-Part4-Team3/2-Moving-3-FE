import type { EstimationItem } from '../Card/NormalReviewCardInterface';

export interface WritingReviewModalProps {
  estimation: EstimationItem;
  setIsModalOpen: (args: boolean) => void;
}
