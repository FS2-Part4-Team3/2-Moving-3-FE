export interface ReviewCardEstimations {
  id: string;
  createdAt: string;
  comment: string;
  score: number;

  driver: {
    name: string;
    image: string;
  };

  estimation: {
    price: number;
    moveInfos: {
      serviceType: 'SMALL' | 'HOME' | 'OFFICE';
      date: string;
      isSpecificRequest: boolean;
    };
  };
}

export type MoveType = 'SMALL' | 'HOME' | 'OFFICE' | 'APPOINTMENT' | 'WAITING';

export interface ReviewCardProps {
  myReview: MyReviewItem;
}

export interface ReviewCardEstimationsProps {
  estimation: EstimationItem;
}

export interface ReviewCardReviews {
  owner: string;
  comment: string;
  score: number;
  createdAt: string;
}

export interface MyReviewItem {
  id: string;
  createdAt: string;
  comment: string;
  score: number;
  driver: {
    name: string;
    image: string;
  };
  estimation: {
    price: number;
    moveInfos: {
      serviceType: 'SMALL' | 'HOME' | 'OFFICE';
      date: string;
      isSpecificRequest: boolean;
    };
  };
}

export interface MyReviews {
  totalCount: number;
  list: MyReviewItem[];
}

export interface EstimationItem {
  driver: {
    image: string;
    name: string;
  };
  moveInfo: {
    date: string;
    serviceType: 'SMALL' | 'HOME' | 'OFFICE';
  };
  estimationInfo: {
    estimationId: string;
    price: number;
  };
  designatedRequest: 'Active' | 'Inactive';
}

export interface ReviewableEstimations {
  totalCount: number;
  estimations: EstimationItem[];
}
