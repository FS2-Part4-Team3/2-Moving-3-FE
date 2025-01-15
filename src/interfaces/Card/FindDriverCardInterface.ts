export interface FindDriverCardProps {
  data: FindDriverCardData;
  type?: 'WAITING' | 'RECEIVED';
}

interface FindDriverCardData {
  id: string;
  serviceType: string[];
  introduce: string;
  name: string;
  image: string;
  score: number;
  career: number;
  applyCount: number;
  favoriteCount: number;
  reviewCount: number;
}
