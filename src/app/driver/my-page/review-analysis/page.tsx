import ReviewAnalysisChart from '@/components/cards/ReviewAnalysisChart';
import ReviewAnalysisDropdown from '@/components/dropdown/ReviewAnalysisDropdown';

export default function ReviewAnalysis() {
  return (
    <div className="w-full lg:mt-[5rem] items-center justify-center flex">
      <div className="sm:m-[2rem] flex lg:flex-row sm:flex-col lg:w-[120rem] sm:w-full lg:gap-[0rem] sm:gap-[3rem]">
        <ReviewAnalysisDropdown />
        <ReviewAnalysisChart />
      </div>
    </div>
  );
}
