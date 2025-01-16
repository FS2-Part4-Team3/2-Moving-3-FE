export interface MovesListResponse {
  totalCount: number;
  list: {
    id: string;
    updatedAt: string;
    // serviceType: string[];
    serviceType: string;
    date: string;
    fromAddress: string;
    toAddress: string;
    owner: {
      name: string;
    };
  }[];
}
