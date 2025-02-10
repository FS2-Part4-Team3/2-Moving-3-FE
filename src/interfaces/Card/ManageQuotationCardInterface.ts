export interface ManageQuotationCardProps {
  data: {
    estimationInfo: {
      estimationId: string;
      price: number;
    };
    // createdAt: string;
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
}
