import ReviewAnalysisChart from '@/components/cards/ReviewAnalysisChart';

const mockData = {
  positive: [
    {
      keyword: '무사히',
      count: 1,
    },
    {
      keyword: '세심한 서비스',
      count: 1,
    },
    {
      keyword: '능숙한',
      count: 1,
    },
    {
      keyword: '친절',
      count: 3,
    },
  ],
  negative: [
    {
      keyword: '속도',
      count: 1,
    },
    {
      keyword: '짐 손상',
      count: 1,
    },
    {
      keyword: '추가적인 정리',
      count: 2,
    },
    {
      keyword: '아쉬웠습니다',
      count: 2,
    },
  ],
};

export default function ReviewAnalysis() {
  return (
    <div>
      <div>
        <ReviewAnalysisChart data={mockData} />
      </div>
    </div>
  );
}
