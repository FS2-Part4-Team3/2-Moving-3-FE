export interface ManageQuotationCardProps {
  data: {
    estimationInfo: {
      createdAt: string;
      estimationId: string;
      price: number;
    };
    moveInfo: {
      date: string;
      serviceType: 'SMALL' | 'HOME' | 'OFFICE';
      fromAddress: string;
      toAddress: string;
    };
    user: {
      name: string;
    };
    designatedRequest: 'Active' | 'InActive';
    progress: 'EXPIRED' | 'CANCELED' | 'COMPLETE' | 'OPEN' | 'CONFIRMED';
  };
  isRejected: boolean;
}
