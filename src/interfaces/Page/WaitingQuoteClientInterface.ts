export interface WaitingQuoteCardClientProps {
  moveId: string;
  estimationId: string;
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
      moveInfoId: string;
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
