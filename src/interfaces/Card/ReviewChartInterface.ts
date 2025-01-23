export interface ReviewChartData {
  averageRating: number;
  ratingCounts: number[];
}

export interface ReviewChartProps {
  data: ReviewChartData;
  totalCount: number;
}
