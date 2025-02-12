export interface MyQuoteDetailClientProps {
  id: string;
}

export interface MyQuoteDetailData {
  driverId: string;
  moveInfo: {
    moveInfoId: string;
    createdAt: string;
    date: string;
    serviceType: 'SMALL' | 'HOME' | 'OFFICE';
    fromAddress: string;
    toAddress: string;
    progress: 'OPEN' | 'EXPIRED' | 'CONFIRMED' | 'CANCELED' | 'COMPLETE';
  };

  estimationInfo: {
    comment: string;
    id: string;
    price: number;
  };
  designatedRequest: 'Active' | 'Inactive';
}

export interface DriverQuoteDetailData {
  user: { name: string };
  estimationInfo: {
    estimationId: string;
    price: number;
    createdAt: string;
    updatedAt: string;
  };
  moveInfo: {
    createdAt: string;
    date: string;
    serviceType: 'SMALL' | 'HOME' | 'OFFICE';
    fromAddress: string;
    toAddress: string;
    progress: 'OPEN' | 'EXPIRED' | 'CONFIRMED' | 'CANCELED' | 'COMPLETE';
  };
  designatedRequest: 'Active' | 'Inactive';
}
