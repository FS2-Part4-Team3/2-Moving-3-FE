export interface EstimateReceivedCardProps {
  data: {
    id: string;
    price: number;
    comment: string;
    moveInfo: {
      id: string;
      type: string;
    };
    driver: {
      id: string;
      name: string;
      image: string;
      applyCount: number;
      favoriteCount: number;
      score: number;
      career: number;
      reviewCount: number;
    };
  };
}
