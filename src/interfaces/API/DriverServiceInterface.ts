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

export interface DibsDriverListResponse {
  totalCount: number;
  list: {
    id: string;
    serviceType: ('SMALL' | 'HOME' | 'OFFICE' | 'APPOINTMENT' | 'WAITING' | 'RECEIVED')[];
    name: string;
    image: string;
    applyCount: number;
    likeCount: number;
    career: number;
    rating: number;
    reviewCount: number;
  }[];
}
