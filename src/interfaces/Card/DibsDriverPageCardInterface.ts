export interface DibsDriverPageCardProps {
  data: {
    serviceType: ('SMALL' | 'HOME' | 'OFFICE' | 'APPOINTMENT' | 'WAITING' | 'RECEIVED')[];
    name: string;
    image: string;
    applyCount: number;
    likeCount: number;
    career: number;
    rating: number;
    reviewCount: number;
  };
}
