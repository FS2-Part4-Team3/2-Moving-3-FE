import reviews from '@/../public/data/reviewsData.json';
import ReviewTabs from '@/components/Tabs/ReviewTabs';
import NormalReviewCard from '@/components/cards/NormalReviewCard';
import type { ReviewCardEstimations } from '@/interfaces/Card/NormalReviewCardInterface';

export default async function WritableReviewPage() {
  return (
    <>
      <div className="w-full flex justify-center">
        <ReviewTabs />
      </div>
      <div className="flex flex-col items-center gap-[4rem] bg-background-100 lg:pt-[4rem]">
        <div className="lg:grid lg:grid-cols-2 lg:gap-y-12 lg:gap-x-6 md:flex md:flex-col sm:flex sm:flex-col md:gap-y-8 sm:gap-y-8">
          <NormalReviewCard type="ABLE" />
        </div>
      </div>
    </>
  );
}
