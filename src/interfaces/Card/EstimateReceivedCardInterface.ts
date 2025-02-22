export interface EstimationInformationCardProps {
  data?: {
    id?: string;
    createdAt: string;
    serviceType?: 'SMALL' | 'HOME' | 'OFFICE';
    date: string;
    fromAddress: string;
    toAddress: string;
    progress?: 'OPEN' | 'EXPIRED' | 'CONFIRMED' | 'CANCELED' | 'COMPLETE';
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
  isConfirmed: boolean;
  serviceType: 'SMALL' | 'HOME' | 'OFFICE';
}
