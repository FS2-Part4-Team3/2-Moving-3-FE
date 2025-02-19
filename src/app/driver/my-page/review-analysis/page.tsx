import ReviewAnalysisChart from '@/components/cards/ReviewAnalysisChart';
import ReviewAnalysisDropdown from '@/components/dropdown/ReviewAnalysisDropdown';

export default function ReviewAnalysis() {
  return (
    <div className="w-full mt-[5rem] items-center justify-center flex">
      <div className="flex w-[120rem]">
        <ReviewAnalysisDropdown />
        <ReviewAnalysisChart />
      </div>
    </div>
  );
}
