export interface ManageQuotationCardProps {
  data: {
    id: string;
    updatedAt: string;
    price: number;
    moveInfo: {
      id: string;
      updatedAt: string;
      type: 'SMALL' | 'HOME' | 'OFFICE' | 'APPOINTMENT' | 'WAITING';
      date: string;
      fromAddress: string;
      toAddress: string;
      progress: string;
      owner: string;
    };
  };
}
