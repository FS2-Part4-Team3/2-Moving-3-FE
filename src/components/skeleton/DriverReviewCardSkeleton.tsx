export default function DriverReviewCardSkeleton() {
  return (
    <div className="flex flex-col py-[3.2rem] lg:gap-[2.4rem] sm:gap-[1.6rem] border-b border-line-100 animate-pulse">
      <div className="flex flex-col gap-[0.8rem]">
        <div className="lg:gap-[1.4rem] sm:gap-[1.2rem] flex flex-row items-center">
          <div className="w-[8rem] h-[2.6rem] bg-gray-200 dark:bg-dark-p rounded-md shimmer" />
        </div>
        <div className="w-[12rem] h-[2rem] bg-gray-200 dark:bg-dark-p shimmer" />
      </div>
      <div className="w-full h-[5rem] bg-gray-200 dark:bg-dark-p rounded-md shimmer" />
    </div>
  );
}
