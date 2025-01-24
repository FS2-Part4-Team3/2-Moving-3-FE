export interface MoveItem {
  id: string;
  serviceType: string;
  date: string;
  fromAddress: string;
  toAddress: string;
  confirmedEstimationId: string;
}

export type MoveData = MoveItem[];
