export interface ClientQuoteCardProps {
  data: {
    id: string;
    updatedAt: string;
    price: number;
    moveInfo: {
      id: string;
      updatedAt: string;
      type: 'SMALL' | 'HOME' | 'OFFICE' | 'APPOINTMENT';
      date: string;
      fromAddress: string;
      toAddress: string;
      progress: string;
      owner: string;
    };
  };
}
