export interface ReviewCardEstimations {
  id: string;
  createdAt: string;
  comment: string;
  score: number;
  driver: {
    name: string;
    image: string;
  };
  owner: {
    moveInfos: {
      type: 'SMALL' | 'HOME' | 'OFFICE';
      date: string;
      price: number;
    };
  };
}

export type MoveType = 'SMALL' | 'HOME' | 'OFFICE' | 'APPOINTMENT' | 'WAITING';

export interface ReviewCardProps {
  type: 'ABLE' | 'MY';
}

export interface ReviewCardReviews {
  owner: string;
  comment: string;
  score: number;
  createdAt: string;
}

export interface MyReviews {
  totalCount: number;
  list: [
    {
      id: string;
      createdAt: string;
      comment: string;
      score: number;
      driver: {
        name: string;
        image: string;
      };
      owner: {
        moveInfos: {
          type: 'SMALL' | 'HOME' | 'OFFICE';
          date: string;
          price: number;
        };
      };
    },
  ];
}
