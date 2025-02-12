export interface DriverDetailData {
  id: string;
  image: string;
  name: string;
  introduce: string;
  likeCount: number;
  rating: number;
  career: number;
  applyCount: number;
  description: string;
  serviceType: string[];
  availableAreas: string[];
  reviewCount: number;
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

export interface Stats {
  averageRating: number;
  ratingCounts: number[];
}

export interface DriverReviewData {
  stats: Stats;
  totalCount: number;
  list: Review[];
}

export interface ReviewClientProps {
  id: string;
}

export interface DetailButtonClientProps {
  id: string;
  type?: 'quoteWaiting' | 'quoteReceived' | 'infoEditDriver';
  estimationId?: string;
}
