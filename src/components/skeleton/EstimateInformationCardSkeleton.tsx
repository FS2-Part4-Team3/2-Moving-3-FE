export default function EstimationInformationCardSkeleton() {
  return (
    <div className="flex flex-col lg:gap-[4rem] sm:gap-[2.4rem]">
      <p className="font-semibold lg:text-[2.4rem] lg:leading-[3.2rem] sm:text-[1.6rem] sm:leading-[2.6rem] text-black-400 dark:text-dark-t">
        견적 정보
      </p>
      <div className="rounded-[1.6rem] border border-line-100 md:py-[3.2rem] md:px-[4rem] sm:p-[1.6rem] bg-background-100 dark:bg-dark-p flex lg:gap-[3.2rem] gap-[4rem]">
        <div className="flex flex-col gap-[0.8rem] font-normal lg:text-[2rem] lg:leading-[3.2rem] sm:text-[1.4rem] sm:leading-[2.4rem] text-gray-300">
          <div className="w-[5rem] h-[1rem] rounded-[0.4rem] bg-gray-200 shimmer" />
          <div className="w-[3rem] h-[1rem] rounded-[0.4rem] bg-gray-200 shimmer" />
          <div className="w-[3rem] h-[1rem] rounded-[0.4rem] bg-gray-200 shimmer" />
          <div className="w-[3rem] h-[1rem] rounded-[0.4rem] bg-gray-200 shimmer" />
          <div className="w-[3rem] h-[1rem] rounded-[0.4rem] bg-gray-200 shimmer" />
        </div>
        <div className="flex flex-col gap-[0.8rem] font-normal lg:text-[2rem] lg:leading-[3.2rem] sm:text-[1.4rem] sm:leading-[2.4rem] text-black-400 dark:text-dark-t">
          <div className="w-[7rem] h-[1rem] rounded-[0.4rem] bg-gray-200 shimmer" />
          <div className="w-[5rem] h-[1rem] rounded-[0.4rem] bg-gray-200 shimmer" />
          <div className="w-[10rem] h-[1rem] rounded-[0.4rem] bg-gray-200 shimmer" />
          <div className="w-[10rem] h-[1rem] rounded-[0.4rem] bg-gray-200 shimmer" />
          <div className="w-[10rem] h-[1rem] rounded-[0.4rem] bg-gray-200 shimmer" />
        </div>
      </div>
    </div>
  );
}
