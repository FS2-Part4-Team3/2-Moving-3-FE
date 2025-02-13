export interface WaitingQuoteCardProps {
  data: {
    driver: {
      id: string;
      name: string;
      image: string;
      applyCount: number;
      likeCount: number;
      rating: number;
      career: number;
      reviewCount: number;
    };
    moveInfo: {
      moveInfoId: string;
      date: string;
      fromAddress: string;
      toAddress: string;
      serviceType: 'SMALL' | 'HOME' | 'OFFICE' | 'APPOINTMENT' | 'WAITING';
    };
    estimationInfo: {
      estimationId: string;
      price: number;
    };
    designatedRequest: 'Active' | 'Inactive';
  };
}
