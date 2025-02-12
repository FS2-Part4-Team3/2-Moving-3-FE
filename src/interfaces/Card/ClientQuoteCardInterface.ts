export interface ClientQuoteCardProps {
  data: MoveInfoData;
  owner: string;
}

export interface MoveInfoData {
  createdAt: string;
  serviceType: 'SMALL' | 'HOME' | 'OFFICE';
  date: string;
  fromAddress: string;
  toAddress: string;
}
