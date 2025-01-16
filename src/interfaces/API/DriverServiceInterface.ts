export interface DriverListResponse {
  totalCount: number;
  list: {
    id: string;
    serviceType: string[];
    introduce: string;
    name: string;
    image: string;
    rating: number;
    career: number;
    applyCount: number;
    likeCount: number;
    reviewCount: number;
  }[];
}
