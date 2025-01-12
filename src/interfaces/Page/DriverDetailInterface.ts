export interface DriverDetailData {
  id: string;
  image: string;
  name: string;
  introduce: string;
  favoriteCount: number;
  score: number;
  career: number;
  applyCount: number;
  description: string;
  serviceType: string[];
  availableAreas: string[];
  reviewCount: number;
}

export interface Review {
  score: number;
  createdAt: string;
  owner: string;
  comment: string;
}

export interface DriverReviewData {
  id: string;
  score: number;
  reviewCount: number;
  reviews: Review[];
}

export interface ReviewClientProps {
  id: string;
  initialData: DriverReviewData;
  totalItems: number;
}
