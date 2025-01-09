export interface DibsDriverCardProps {
  data: {
    id: string;
    name: string;
    image: string;
    introduce: string;
    serviceType: ("SMALL" | "HOME" | "OFFICE" | "APPOINTMENT" | "WAITING")[];
    applyCount: number;
    favoriteCount: number;
    score: number;
    career: number;
    reviewCount: number;
  };
}
