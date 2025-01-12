export interface DriverReviewCardProps {
  review: Review;
}

export interface Review {
  score: number;
  createdAt: string;
  owner: string;
  comment: string;
}
