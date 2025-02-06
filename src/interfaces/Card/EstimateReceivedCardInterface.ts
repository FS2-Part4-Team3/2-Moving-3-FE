export interface EstimateReceivedCardProps {
  serviceType: 'SMALL' | 'HOME' | 'OFFICE';
  data: {
    id: string;
    price: number;
    comment: string;
    driver: Driver;
    isSpecificRequest: boolean;
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
