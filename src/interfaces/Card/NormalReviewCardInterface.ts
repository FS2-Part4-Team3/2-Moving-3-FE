export interface ReviewCardEstimations {
  id: string;
  driver: {
    name: string;
    image: string;
  };
  moveInfo: {
    type: ('SMALL' | 'HOME' | 'OFFICE' | 'APPOINTMENT' | 'WAITING')[];
    date: string;
  };
  price: number;
}

export interface ReviewCardProps {
  estimation: ReviewCardEstimations;
  type: 'ABLE' | 'MY';
  review: ReviewCardReviews;
}

export interface ReviewCardReviews {
  owner: string;
  comment: string;
  score: number;
  createdAt: string;
}
