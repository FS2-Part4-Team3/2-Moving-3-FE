export interface DriverReviewCardProps {
  reviews: Review[];
}

export interface Review {
  score: number;
  createdAt: string;
  owner: string;
  comment: string;
}
