import Image from 'next/image';
import standardProfile from '@/../public/assets/common/gnb/standard_profile.svg';
import heart from '@/../public/assets/driver/ic_empty_like.svg';

export default function EstimateReceivedCardSkeleton() {
  return (
    <div className="w-full rounded-[1.6rem] border border-line-100 lg:pt-[2rem] lg:pb-[1.4rem] lg:px-[2.4rem] sm:pt-[1.6rem] sm:pb-[1rem] sm:px-[1.4rem] flex flex-col lg:gap-[1.6rem] sm:gap-[1.4rem] shadow-[0.2rem_-0.2rem_1rem_rgba(220,220,220,0.14)] dark:bg-dark-p">
      <div className="flex lg:gap-[1.2rem] sm:gap-[0.8rem]">
        <div className="w-[8rem] h-[3rem] rounded-[0.4rem] bg-gray-200 shimmer"></div>
        <div className="w-[8rem] h-[3rem] rounded-[0.4rem] bg-gray-200 shimmer"></div>
      </div>
      <div className="w-[25rem] h-[3rem] rounded-[0.4rem] bg-gray-200 shimmer"></div>
      <div className="rounded-[0.6rem] border border-line-100 lg:p-[1.6rem] sm:p-[1rem] lg:gap-[2.4rem] sm:gap-[1.2rem] flex shadow-[0.4rem_0.4rem_1rem_rgba(220,220,220,0.14)]">
        <Image
          src={standardProfile}
          alt="profile"
          width={56}
          height={56}
          className="lg:block sm:hidden border-2 border-blue-400 rounded-full"
        />
        <div className="w-[4.6rem] h-[4.6rem] lg:hidden sm:block">
          <Image
            src={standardProfile}
            alt="profile"
            width={46}
            height={46}
            className="lg:hidden sm:block border-2 border-blue-400 rounded-full"
          />
        </div>
        <div className="flex flex-col w-full">
          <div className="w-full flex justify-between">
            <div className="w-[10rem] h-[2rem] rounded-[0.4rem] bg-gray-200 shimmer"></div>
            <div className="flex gap-[0.2rem] items-center">
              <Image src={heart} alt="heart" width={24} height={24} />
              <div className="w-[3rem] h-[2rem] rounded-[0.4rem] bg-gray-200 shimmer"></div>
            </div>
          </div>
          <div className="flex lg:gap-[1.6rem] sm:gap-[0.8rem] items-center">
            <div className="w-[5rem] h-[2rem] rounded-[0.4rem] bg-gray-200 shimmer" />
            <div className="h-[1.4rem] border border-line-200 shimmer" />
            <div className="w-[5rem] h-[2rem] rounded-[0.4rem] bg-gray-200 shimmer" />
            <div className="h-[1.4rem] border border-line-200 shimmer" />
            <div className="w-[5rem] h-[2rem] rounded-[0.4rem] bg-gray-200 shimmer" />
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="w-[18rem] h-[3.5rem] rounded-[0.4rem] bg-gray-200 shimmer" />
      </div>
    </div>
  );
}
