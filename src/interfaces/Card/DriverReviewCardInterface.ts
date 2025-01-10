export interface DriverReviewCardProps {
  reviewCount: number;
  reviews: Review[];
}

export interface Review {
  score: number;
  createdAt: string;
  owner: string;
  comment: string;
}
