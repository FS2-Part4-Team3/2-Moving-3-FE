import estimations from '@/../public/data/estimationsData.json';
import reviews from '@/../public/data/reviewsData.json';
import { getEstimationData } from '@/api/DriverService';
import ReviewTabs from '@/components/Tabs/ReviewTabs';
import NormalReviewCard from '@/components/cards/NormalReviewCard';
import type { ReviewCardEstimations } from '@/interfaces/Card/NormalReviewCardInterface';
import WritableReviewPagination from '@/pages/WritableReviewPagination';

export default async function WritableReviewPage() {
  const estimationsData: ReviewCardEstimations[] = await getEstimationData();
  return (
    <div className="flex flex-col items-center gap-[4rem]">
      <div className="">
        <ReviewTabs />
      </div>
      {estimationsData.map(estimation => (
        <div key={estimation.id} className="grid grid-cols-2 gap-y-12 gap-x-6">
          {reviews.map(review => (
            <NormalReviewCard type="ABLE" estimation={estimation} review={review} />
          ))}
        </div>
      ))}
      <WritableReviewPagination estimationsData={estimationsData} />
    </div>
  );
}
