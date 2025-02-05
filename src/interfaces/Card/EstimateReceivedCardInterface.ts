export interface EstimateReceivedCardProps {
  data: {
    serviceType: 'SMALL' | 'HOME' | 'OFFICE' | 'APPOINTMENT' | 'WAITING';
    confirmedEstimation: {
      id: string;
      price: number;
      comment: string;
      driver: Driver;
    };
    estimations: {
      id: string;
      price: number;
      comment: string;
      driver: Driver;
    }[];
  };
}

interface Driver {
  name: string;
  image: string;
  applyCount: number;
  likeCount: number;
  rating: number;
  reviewCount: number;
  career: number;
}
