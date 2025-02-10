export interface ReceiveQuoteData {
  id: string;
  type: 'SMALL' | 'HOME' | 'OFFICE' | 'APPOINTMENT' | 'WAITING';
  date: string;
  fromAddress: string;
  toAddress: string;
  owner: string;
}

export interface ReceivedQuoteResponse {
  totalCount: number;
  list: {
    id: string;
    createdAt: string;
    serviceType: 'SMALL' | 'HOME' | 'OFFICE';
    date: string;
    fromAddress: string;
    toAddress: string;
    confirmedEstimationId: string | null;
    progress: 'EXPIRED' | 'CANCELED' | 'COMPLETE';
    confirmedEstimation: {
      id: string;
      price: number;
      comment: string;
      driver: Driver;
      isSpecificRequest: boolean;
    };
    estimations: {
      id: string;
      price: number;
      comment: string;
      driver: Driver;
      isSpecificRequest: boolean;
    }[];
  }[];
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

export interface ReceivedQuotePageProps {
  data: {
    id: string;
    createdAt: string;
    serviceType: 'SMALL' | 'HOME' | 'OFFICE';
    date: string;
    fromAddress: string;
    toAddress: string;
    confirmedEstimationId: string | null;
    progress: 'EXPIRED' | 'CANCELED' | 'COMPLETE';
    confirmedEstimation: {
      id: string;
      price: number;
      comment: string;
      driver: Driver;
      isSpecificRequest: boolean;
    };
    estimations: {
      id: string;
      price: number;
      comment: string;
      driver: Driver;
      isSpecificRequest: boolean;
    }[];
  };
  filter: 'all' | 'confirmed';
}

export type QuotesFilterMap = {
  [key: string]: 'all' | 'confirmed';
};
