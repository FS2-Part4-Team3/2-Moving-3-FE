import reviews from '@/../public/data/reviewsData.json';
import { getEstimationData } from '@/api/DriverService';
import ReviewTabs from '@/components/Tabs/ReviewTabs';
import NormalReviewCard from '@/components/cards/NormalReviewCard';
import type { ReviewCardEstimations } from '@/interfaces/Card/NormalReviewCardInterface';

export default async function WrittenReviewPage() {
  const estimationsData: ReviewCardEstimations[] = await getEstimationData();
  return (
    <>
      <div>
        <ReviewTabs />
      </div>
      <div>
        {estimationsData.map(estimation => (
          <div>
            {reviews.map(review => (
              <NormalReviewCard type="MY" estimation={estimation} review={review} />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
