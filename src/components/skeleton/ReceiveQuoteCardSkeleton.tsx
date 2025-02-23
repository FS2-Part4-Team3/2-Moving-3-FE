export default function ReceiveQuoteCardSkeleton() {
  return (
    <div className="animate-pulse flex flex-col w-full border border-line-100 lg:pt-[2rem] lg:pb-[2.4rem] lg:px-[2.4rem] sm:py-[1.6rem] sm:px-[1.4rem] shadow-[-0.2rem_-0.2rem_1rem_rgba(220,220,220,0.14)] rounded-[1.6rem] gap-[1.6rem] dark:shadow dark:bg-dark-p">
      <div className="flex w-full justify-between items-center">
        <div className="flex lg:gap-[1.2rem] sm:gap-[0.8rem]">
          <div className="bg-gray-200 dark:bg-gray-700 rounded-md w-[80px] h-[30px]" />
          <div className="bg-gray-200 dark:bg-gray-700 rounded-md w-[100px] h-[30px]" />
        </div>
        <div className="bg-gray-200 dark:bg-gray-700 rounded-md w-[60px] h-[20px]" />
      </div>
      <div className="flex flex-col lg:gap-[1.8rem] md:gap-[1.4rem] sm:gap-[1rem]">
        <div className="bg-gray-200 dark:bg-gray-700 rounded-md w-[120px] h-[30px]" />
        <div className="w-full border border-line-200 md:block sm:hidden" />
        <div className="bg-gray-200 dark:bg-gray-700 rounded-md w-[60%] h-[25px]" />
      </div>
      <div className="w-full flex md:flex-row sm:flex-col lg:gap-[1.1rem] sm:gap-[0.6rem]">
        <div className="bg-gray-200 dark:bg-gray-700 rounded-md w-full md:h-[5rem] sm:h-[4.8rem]" />
        <div className="bg-gray-200 dark:bg-gray-700 rounded-md w-full md:h-[5rem] sm:h-[4.8rem]" />
      </div>
    </div>
  );
}
