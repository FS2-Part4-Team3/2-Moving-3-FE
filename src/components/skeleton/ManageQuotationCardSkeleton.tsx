'use client';

export default function ManageQuotationCardSkeleton() {
  return (
    <>
      <div className="relative w-full rounded-[1.6rem] bg-white dark:bg-dark-p border border-line-100 lg:pt-[2rem] lg:pb-[1.2rem] lg:px-[2.4rem] sm:py-[1.6rem] sm:px-[1.4rem] flex flex-col lg:gap-[1.6rem] sm:gap-[2.6rem] shadow-[0.2rem_-0.2rem_1rem_rgba(220,220,220,0.14)]">
        <div className="flex flex-col gap-[1.6rem]">
          <div className="flex justify-between">
            <div className="flex gap-[1.2rem] items-center">
              <div className="w-[8rem] h-[3rem] rounded-[0.4rem] bg-gray-200 shimmer"></div>
              <div className="w-[8rem] h-[3rem] rounded-[0.4rem] bg-gray-200 shimmer"></div>
              <div className="w-[8rem] h-[3rem] rounded-[0.4rem] bg-gray-200 shimmer"></div>
            </div>
            <div className="w-[5rem] h-[2rem] rounded-[0.4rem] bg-gray-200 shimmer"></div>
          </div>
          <div className="lg:py-[1.6rem] flex flex-col lg:gap-[1.8rem] sm:gap-[1rem]">
            <div className="md:block sm:flex flex-col gap-[1.4rem]">
              <div className="w-[12rem] h-[3rem] rounded-[0.4rem] bg-gray-200 shimmer"></div>
              <div className="md:hidden sm:block">
                <div className="flex items-center gap-[1.2rem]">
                  <div className="w-[18rem] h-[3rem] rounded-[0.4rem] bg-gray-200 shimmer"></div>
                </div>
              </div>
            </div>
            <div className="w-full border border-line-100" />
            <div className="flex lg:gap-[1.6rem] sm:gap-[1.4rem] items-center">
              <div className="md:block sm:hidden">
                <div className="flex items-center gap-[1.2rem]">
                  <div className="w-[17rem] h-[3rem] rounded-[0.4rem] bg-gray-200 shimmer"></div>
                </div>
              </div>
              <div className="h-[1.4rem] border border-line-200 md:block sm:hidden" />
              <div className="flex items-center gap-[1.2rem]">
                <div className="w-[14rem] h-[3rem] rounded-[0.4rem] bg-gray-200 shimmer"></div>
              </div>
              <div className="h-[1.4rem] border border-line-200" />
              <div className="flex items-center gap-[1.2rem]">
                <div className="w-[14rem] h-[3rem] rounded-[0.4rem] bg-gray-200 shimmer"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex lg:gap-[1.6rem] sm:gap-[0.8rem] items-center justify-end">
          <div className="w-[20rem] h-[3.5rem] rounded-[0.4rem] bg-gray-200 shimmer" />
        </div>
      </div>
    </>
  );
}
