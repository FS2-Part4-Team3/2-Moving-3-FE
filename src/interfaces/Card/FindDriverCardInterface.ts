export interface FindDriverCardProps {
  data: FindDriverCardData;
}

interface FindDriverCardData {
  id: string;
  serviceTypes: string[];
  introduce: string;
  name: string;
  image: string;
  rating: number;
  career: number;
  applyCount: number;
  likeCount: number;
  reviewCount: number;
}
