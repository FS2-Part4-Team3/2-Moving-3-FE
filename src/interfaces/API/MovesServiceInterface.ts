export interface MovesListResponse {
  counts: {
    designatedRequestCount: number;
    serviceAreaCount: number;
<<<<<<< HEAD
    serviceTypeCounts: any[];
=======
    serviceTypeCounts: number;
>>>>>>> 1978e8b (fix:git error)
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
