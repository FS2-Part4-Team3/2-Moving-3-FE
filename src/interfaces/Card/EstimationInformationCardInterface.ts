export interface EstimationInformationCardProps {
  data: {
    updatedAt: string;
    moveInfo: {
      type: 'SMALL' | 'HOME' | 'OFFICE' | 'APPOINTMENT';
      date: string;
      fromAddress: string;
      toAddress: string;
    };
  };
}
