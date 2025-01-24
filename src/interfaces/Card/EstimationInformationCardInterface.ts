export interface EstimationInformationCardProps {
  data: {
    updatedAt: string;
    moveInfo: {
      type: string;
      date: string;
      fromAddress: string;
      toAddress: string;
    };
  };
}
