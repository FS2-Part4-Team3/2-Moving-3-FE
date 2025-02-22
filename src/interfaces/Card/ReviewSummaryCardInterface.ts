export interface ReviewSummaryCardProps {
  driverId: string;
}

export interface ReviewSummaryResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  summary: string;
  driverId: string;
}
