export interface WaitingQuoteCardProps {
  data: {
    id: string;
    price: number;
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
    moveInfo: {
      id: string;
      date: string;
      fromAddress: string;
      toAddress: string;
      type: string;
    };
  };
}
