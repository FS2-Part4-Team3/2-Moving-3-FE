export interface SentQuoteResponse {
  estimation: {
    estimationInfo: {
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
    progress: 'EXPIRED' | 'CANCELED' | 'COMPLETE';
  }[];
  totalCount: number;
}
