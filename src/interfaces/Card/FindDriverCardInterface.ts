export interface FindDriverCardProps {
  data: FindDriverCardData;
  type?: 'WAITING' | 'CONFIRM';
}

interface FindDriverCardData {
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
}
