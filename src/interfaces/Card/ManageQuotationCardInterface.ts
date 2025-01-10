export interface ManageQuotationCardProps {
  data: {
    id: string;
    updatedAt: string;
    price: number;
    moveInfo: {
      id: string;
      updatedAt: string;
      type: string;
      date: string;
      fromAddress: string;
      toAddress: string;
      progress: string;
      owner: string;
    };
  };
}
