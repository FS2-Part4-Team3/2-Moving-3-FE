export interface ReceiveQuoteData {
  id: string;
  type: 'SMALL' | 'HOME' | 'OFFICE' | 'APPOINTMENT' | 'WAITING';
  date: string;
  fromAddress: string;
  toAddress: string;
  owner: string;
}

export interface ReceivedQuoteResponse {
  id: string;
  createdAt: string;
  serviceType: 'SMALL' | 'HOME' | 'OFFICE' | 'APPOINTMENT' | 'WAITING';
  date: string;
  fromAddress: string;
  toAddress: string;
  confirmedEstimation: {
    id: string;
    createdAt: string;
    price: string;
    comment: string;
    driver: Driver;
  };
  estimations: {
    id: string;
    createdAt: string;
    price: number;
    comment: string;
    driver: Driver;
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
}
