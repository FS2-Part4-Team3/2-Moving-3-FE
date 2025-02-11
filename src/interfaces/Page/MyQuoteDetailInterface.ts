export interface MyQuoteWaitingDetailClientProps {
  id: string;
}

export interface MyQuoteDetailData {
  driver: {
    image: string;
    name: string;
    rating: number;
    reviewCount: number;
    career: number;
    applyCount: number;
    likeCount: number;
    introduce: string;
    id: string;
    serviceType: string[];
  };
  moveInfo: {
    moveInfoId: string;
    createdAt: string;
    date: string;
    serviceType?: 'SMALL' | 'HOME' | 'OFFICE';
    fromAddress: string;
    toAddress: string;
    progress?: 'EXPIRED' | 'CANCELED' | 'COMPLETE';
  };
  estimationInfo: {
    comment: string;
    id: string;
    price: number;
  };
  designatedRequest: 'Active' | 'Inactive';
}
