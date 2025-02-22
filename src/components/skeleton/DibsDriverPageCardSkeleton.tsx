import Image from 'next/image';
import standardProfile from '@/../public/assets/common/gnb/standard_profile.svg';
import redHeart from '@/../public/assets/driver/ic_like_on.svg';

export default function DibsDriverPageCardSkeleton() {
  return (
    <div className="w-full rounded-[1.6rem] border lg:py-[2rem] lg:px-[2.4rem] sm:py-[1.6rem] sm:px-[1.4rem] border-line-100 shadow-custom3 flex flex-col lg:gap-[1.6rem] sm:gap-[1.4rem] bg-white dark:bg-dark-p dark:shadow">
      <div className="w-[6rem] h-[2.4rem] rounded-[0.4rem] bg-gray-200 shimmer"></div>
      <div className="w-full rounded-[0.6rem] border border-line-100 lg:py-[1.6rem] lg:px-[1.8rem] sm:p-[1rem] flex lg:gap-[2.4rem] sm:gap-[1.2rem] shadow-custom5 dark:shadow">
        <div>
          <Image
            src={standardProfile}
            alt="profile"
            width={80}
            height={80}
            className="border-2 border-blue-400 rounded-full lg:block sm:hidden"
          />
          <Image
            src={standardProfile}
            alt="profile"
            width={46}
            height={46}
            className="border-2 border-blue-400 rounded-full lg:hidden sm:block"
          />
        </div>
        <div className="w-full flex flex-col lg:gap-[1.6rem] sm:gap-[1.2rem]">
          <div className="w-full flex items-center justify-between">
            <div className="w-[10rem] h-[2rem] rounded-[0.4rem] bg-gray-200 shimmer"></div>
            <div className="flex lg:gap-[0.4rem] sm:gap-[0.2rem] items-center">
              <Image src={redHeart} alt="heart" width={24} height={24} />
              <div className="w-[3rem] h-[2rem] rounded-[0.4rem] bg-gray-200 shimmer"></div>
            </div>
          </div>
          <div className="flex items-center w-full md:gap-[1.6rem] sm:justify-between md:justify-start">
            <div className="w-[5rem] h-[2rem] rounded-[0.4rem] bg-gray-200 shimmer" />
            <div className="h-[1.4rem] border border-line-200 shimmer" />
            <div className="w-[5rem] h-[2rem] rounded-[0.4rem] bg-gray-200 shimmer" />
            <div className="h-[1.4rem] border border-line-200 shimmer" />
            <div className="w-[5rem] h-[2rem] rounded-[0.4rem] bg-gray-200 shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
}
