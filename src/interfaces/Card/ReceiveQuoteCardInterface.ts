export interface ReceiveQuoteCardProps {
  data: ReceiveQuoteCardData;
}

interface ReceiveQuoteCardData {
  id: string;
  owner: {
    name: string;
  };
  date: string;
  fromAddress: string;
  toAddress: string;
  serviceType: 'SMALL' | 'HOME' | 'OFFICE' | 'APPOINTMENT' | 'WAITING';
  updatedAt: string;
}
