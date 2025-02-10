export interface WaitingQuoteCardClientProps {
  dataId: string;
}

export interface WaitingQuoteListResponse {
  estimations: {
    driver: {
      id: string;
      name: string;
      image: string;
      applyCount: number;
      likeCount: number;
      rating: number;
      reviewCount: number;
      career: number;
    };
    moveInfo: {
      date: string;
      serviceType: 'SMALL' | 'HOME' | 'OFFICE' | 'APPOINTMENT' | 'WAITING';
      fromAddress: string;
      toAddress: string;
    };
    estimationInfo: {
      estimationId: string;
      price: number;
    };
    designatedRequest: 'Active' | 'Inactive';
  }[];
  totalCount: number;
}
