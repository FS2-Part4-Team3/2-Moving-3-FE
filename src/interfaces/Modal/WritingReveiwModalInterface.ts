import type { MyReviews } from '../Card/NormalReviewCardInterface';

export interface WritingReviewModalProps {
  estimation: {
    id: string;
    createdAt: string;
    comment: string;
    score: number;
    driver: {
      name: string;
      image: string;
    };
    owner: {
      moveInfos: {
        type: 'SMALL' | 'HOME' | 'OFFICE';
        date: string;
        price: number;
      };
    };
  };
  setIsModalOpen: (args: boolean) => void;
}
