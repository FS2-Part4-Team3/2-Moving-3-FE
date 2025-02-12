export interface ClientQuoteCardProps {
  data: MoveInfoData;
  owner: string;
  designatedRequest: 'Inactive' | 'Active';
}

export interface MoveInfoData {
  createdAt: string;
  serviceType: 'SMALL' | 'HOME' | 'OFFICE';
  date: string;
  fromAddress: string;
  toAddress: string;
  progress: 'OPEN' | 'EXPIRED' | 'CONFIRMED' | 'CANCELED' | 'COMPLETE';
}
