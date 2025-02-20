export interface ChatListData {
  totalCount: number;
  list: string[];
  moves: Moves[];
}

export interface Moves {
  moveId: string;
  serviceType: string;
  date: string;
  fromAddress: string;
  toAddress: string;
  ownerId: string;
}
