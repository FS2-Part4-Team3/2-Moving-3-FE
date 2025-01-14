export interface FindDriverCardProps {
  data: FindDriverCardData;
}

interface FindDriverCardData {
  id: string;
  serviceTypes: string[];
  introduce: string;
  name: string;
  image: string;
  score: number;
  career: number;
  applyCount: number;
  likeCount: number;
  reviewCount: number;
}
