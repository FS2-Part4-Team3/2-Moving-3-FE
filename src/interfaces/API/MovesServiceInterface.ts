export interface MovesListResponse {
  counts: {
    designatedRequestCount: number;
    serviceAreaCount: number;
    serviceTypeCounts: any[];
  };
  totalCount: number;
  list: {
    id: string;
    updatedAt: string;
    serviceType: 'SMALL' | 'HOME' | 'OFFICE' | 'APPOINTMENT' | 'WAITING';
    date: string;
    fromAddress: string;
    toAddress: string;
    owner: {
      name: string;
    };
    isSpecificRequest: boolean;
  }[];
}
