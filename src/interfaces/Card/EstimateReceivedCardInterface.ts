export interface EstimateReceivedCardProps {
  serviceType: 'SMALL' | 'HOME' | 'OFFICE' | 'APPOINTMENT' | 'WAITING';
  data: {
    id: string;
    price: number;
    comment: string;
    driver: Driver;
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
