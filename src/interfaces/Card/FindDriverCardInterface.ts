export interface FindDriverCardProps {
  data: FindDriverCardData;
}

interface FindDriverCardData {
  serviceType: string[];
  introduce: string;
  name: string;
  image: string;
  score: number;
  career: number;
  applyCount: number;
  favoriteCount: number;
}
