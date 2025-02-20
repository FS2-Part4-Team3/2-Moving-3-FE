import Image from 'next/image';
import standardProfile from '@/../public/assets/common/gnb/standard_profile.svg';

export default function FindDriverCardSkeleton() {
  return (
    <div className="flex flex-col lg:gap-[4.8rem] md:gap-[3.2rem] sm:gap-[2.4rem]">
      <div
        className="w-full lg:h-fit rounded-[1.6rem] border-0.5 border-line-100 lg:py-[2rem] sm:py-[1.6rem] lg:px-[2.4rem] sm:px-[1.4rem] flex flex-col lg:gap-[1.6rem] sm:gap-[1.4rem] 
        shadow-[-0.2rem_-0.2rem_1rem_rgba(220,220,220,0.3)] dark:bg-dark-p dark:shadow"
      >
        <div className="flex lg:gap-[1.2rem] sm:gap-[0.8rem]">
          <div className="w-[6rem] h-[2.4rem] rounded-[0.4rem] bg-gray-200 shimmer" />
          <div className="w-[6rem] h-[2.4rem] rounded-[0.4rem] bg-gray-200 shimmer" />
          <div className="w-[6rem] h-[2.4rem] rounded-[0.4rem] bg-gray-200 shimmer" />
        </div>
        <div className="h-[3.2rem] w-full bg-gray-200 rounded-[0.4rem] shimmer" />
        <div className="flex items-start w-full rounded-[0.6rem] border border-line-100 lg:py-[1.6rem] lg:px-[1.8rem] lg:gap-[2.4rem] sm:p-[1rem] sm:gap-[1.2rem]">
          <div className="relative w-[5.6rem] h-[5.6rem] lg:block sm:hidden">
            <Image
              src={standardProfile}
              alt="driver"
              width={56}
              height={56}
              objectFit="cover"
              className="border-2 border-blue-400 rounded-full"
            />
          </div>
          <div className="relative w-[4.6rem] h-[4.6rem] lg:hidden sm:block">
            <Image
              src={standardProfile}
              alt="driver"
              width={46}
              height={46}
              objectFit="cover"
              className="border-2 border-blue-400 rounded-full"
            />
          </div>
          <div className="flex flex-col w-full lg:gap-[0.8rem] sm:gap-[1rem]">
            <div className="flex w-full justify-between">
              <div className="w-[8rem] h-[2.6rem] bg-gray-200 rounded-[0.4rem] shimmer" />
              <div className="flex gap-[0.4rem] justify-center items-center"></div>
            </div>
            <div className="flex items-center w-full md:gap-[1.6rem] sm:justify-between md:justify-start">
              <div className="w-[5rem] h-[2rem] bg-gray-200 shimmer" />
              <div className="h-[1.4rem] border border-line-200 shimmer" />
              <div className="w-[5rem] h-[2rem] bg-gray-200 shimmer" />
              <div className="h-[1.4rem] border border-line-200 shimmer" />
              <div className="w-[5rem] h-[2rem] bg-gray-200 shimmer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
