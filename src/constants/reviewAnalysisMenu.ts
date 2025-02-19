import { ReviewAnalysisType } from '@/interfaces/Constants/ReviewAnalysisMenuInterface';

const reviewAnalysisTypes: ReviewAnalysisType[] = [
  { type: '전체', code: 'ALL' },
  { type: '긍정 키워드', code: 'POSITIVE' },
  { type: '부정 키워드', code: 'NEGATIVE' },
];

export default reviewAnalysisTypes;
