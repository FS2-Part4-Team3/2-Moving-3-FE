import DibsDriverPageClient from '@/_pages/DibsDriverPageClient';

export default function DibsDriverPage() {
  return (
    <div className="w-full bg-background-100 dark:bg-dark-bg min-h-screen flex flex-col items-center">
      <div className="w-full bg-white dark:bg-dark-p lg:py-[3.2rem] sm:py-[1.4rem] gap-[1rem] shadow-custom7 dark:shadow flex items-center justify-center lg:px-[0rem] md:px-[7.2rem] sm:px-[3rem]">
        <p className="lg:w-[120rem] sm:w-full font-semibold lg:text-[2.4rem] lg:leading-[3.2rem] sm:text-[1.8rem] sm:leading-[2.6rem]">
          찜한 기사님
        </p>
      </div>
      <div className="lg:w-[120rem] sm:w-full flex items-center justify-center">
        <DibsDriverPageClient />
      </div>
    </div>
  );
}
