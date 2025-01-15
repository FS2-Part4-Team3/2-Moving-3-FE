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
    <>
      <div className="w-full flex justify-center">
        <ReviewTabs />
      </div>
      <div className="flex flex-col items-center gap-[4rem] bg-background-100 lg:pt-[4rem]">
        {estimationsData.map(estimation => (
          <div
            key={estimation.id}
            className="lg:grid lg:grid-cols-2 lg:gap-y-12 lg:gap-x-6 md:flex md:flex-col sm:flex sm:flex-col md:gap-y-8 sm:gap-y-8"
          >
            {reviews.map(review => (
              <NormalReviewCard type="ABLE" estimation={estimation} review={review} />
            ))}
          </div>
        ))}
        <WritableReviewPagination estimationsData={estimationsData} />
      </div>
    </>
  );
}
