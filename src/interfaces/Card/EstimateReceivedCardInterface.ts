export interface EstimationInformationCard {
  data: {
    id: string;
    createdAt: string;
    serviceType?: 'SMALL' | 'HOME' | 'OFFICE';
    date: string;
    fromAddress: string;
    toAddress: string;
    progress?: 'EXPIRED' | 'CANCELED' | 'COMPLETE';
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
  isliked: boolean;
}

export interface EstimateReceivedCardProps {
  data: {
    isSpecificRequest: boolean;
    comment: string;
    driver: Driver;
    price: number;
  };
  serviceType: 'SMALL' | 'HOME' | 'OFFICE';
}
