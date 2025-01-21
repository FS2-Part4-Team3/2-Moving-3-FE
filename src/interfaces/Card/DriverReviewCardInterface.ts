export interface DriverReviewCardProps {
  review: Review;
}

export interface Review {
  id: string;
  score: number;
  createdAt: string;
  updatedAt: string;
  owner: Owner;
  comment: string;
}

export interface Owner {
  name: string;
}
