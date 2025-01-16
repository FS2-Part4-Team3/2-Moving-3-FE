export interface MovesListResponse {
  totalCount: number;
  list: {
    id: string;
    updatedAt: string;
    // serviceType: string[];
    serviceType: 'SMALL' | 'HOME' | 'OFFICE' | 'APPOINTMENT' | 'WAITING';
    date: string;
    fromAddress: string;
    toAddress: string;
    owner: {
      name: string;
    };
  }[];
}
