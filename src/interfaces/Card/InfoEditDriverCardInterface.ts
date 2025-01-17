export interface InfoEditDriverCardProps {
  data: InfoEditDriverCardData;
}

interface InfoEditDriverCardData {
  id: string;
  serviceType: string[];
  availableAreas: string[];
  introduce: string;
  name: string;
  image: string;
  rating: number;
  career: number;
  applyCount: number;
  reviewCount: number;
}
