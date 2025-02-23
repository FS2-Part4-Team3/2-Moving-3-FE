import Image from 'next/image';
import standardProfile from '@/../public/assets/common/gnb/standard_profile.svg';
import like from '@/../public/assets/driver/ic_like.svg';
import MovingTypeChips from '../chips/MovingTypeChips';

export default function WaitingQuoteCardSkeleton() {
  return (
    <div className="w-full rounded-[1.6rem] border border-line-100 pt-[2.8rem] pb-[2.2rem] px-[2.4rem] flex flex-col lg:gap-[2.4rem] sm:gap-[1rem] shadow-[0.2rem_-0.2rem_1rem_rgba(220,220,220,0.14)] bg-white dark:bg-dark-p">
      <div className="flex flex-col lg:gap-[2.4rem] sm:gap-[1.4rem]">
        <div className="flex lg:gap-[1.2rem] sm:gap-[0.8rem] items-center">
          <MovingTypeChips type="WAITING" />
          <div className="w-[8rem] h-[3rem] rounded-[0.4rem] bg-gray-200 shimmer"></div>
          <div className="w-[8rem] h-[3rem] rounded-[0.4rem] bg-gray-200 shimmer"></div>
        </div>
        <div className="flex flex-col lg:gap-[2.4rem] sm:gap-[1.4rem]">
          <div className="flex w-full lg:gap-[2.4rem] sm:gap-[1.2rem] py-[1.6rem] lg:px-[1.8rem] sm:px-[1rem] border border-line-100 rounded-[0.6rem] shadow-[-0.2rem_-0.2rem_1rem_rgba(220,220,220,0.14)] items-center">
            <>
              <div className="w-[5.6rem] h-[5.6rem] lg:block sm:hidden">
                <Image
                  src={standardProfile}
                  alt="profile"
                  width={56}
                  height={56}
                  className="border-2 border-blue-400 rounded-full"
                />
              </div>
              <div className="w-[4.6rem] h-[4.6rem] lg:hidden sm:block">
                <Image
                  src={standardProfile}
                  alt="profile"
                  width={46}
                  height={46}
                  className="border-2 border-blue-400 rounded-full"
                />
              </div>
            </>
            <div className="w-full flex flex-col items-center lg:gap-[0.8rem] sm:gap-[1.6rem]">
              <div className="w-full flex justify-between items-center">
                <div className="w-[10rem] h-[2rem] rounded-[0.4rem] bg-gray-200 shimmer"></div>
                <div className="flex lg:gap-[0.4rem] sm:gap-[0.2rem] items-center">
                  <Image src={like} alt="like" width={24} height={24} />
                  <div className="w-[3rem] h-[2rem] rounded-[0.4rem] bg-gray-200 shimmer"></div>
                </div>
              </div>
              <div className="flex lg:gap-[1.6rem] sm:gap-[0.8rem] justify-start items-center w-full">
                <div className="w-[5rem] h-[2rem] rounded-[0.4rem] bg-gray-200 shimmer" />
                <div className="h-[1.4rem] border border-line-200 shimmer" />
                <div className="w-[5rem] h-[2rem] rounded-[0.4rem] bg-gray-200 shimmer" />
                <div className="h-[1.4rem] border border-line-200 shimmer" />
                <div className="w-[5rem] h-[2rem] rounded-[0.4rem] bg-gray-200 shimmer" />
              </div>
            </div>
          </div>
          <div className="flex lg:flex-row sm:flex-col lg:gap-[1.6rem] sm:gap-[1.4rem] lg:items-center sm:items-start">
            <div className="w-[12rem] h-[3rem] rounded-[0.4rem] bg-gray-200 shimmer" />
            <div className="h-[1.6rem] border border-line-200 sm:hidden lg:block" />
            <div className="flex sm:flex-row lg:gap-[1.6rem] sm:gap-[1.4rem] sm:justify-start sm:w-full lg:w-auto items-center">
              <div className="w-[12rem] h-[3rem] rounded-[0.4rem] bg-gray-200 shimmer" />
              <div className="h-[1.6rem] border border-line-200" />
              <div className="w-[12rem] h-[3rem] rounded-[0.4rem] bg-gray-200 shimmer" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end items-center lg:gap-[1.6rem] sm:gap-[0.8rem]">
        <div className="w-[18rem] h-[3.5rem] rounded-[0.4rem] bg-gray-200 shimmer" />
      </div>
      <div className="flex md:flex-row sm:flex-col justify-between gap-[0.5rem]">
        <div className="w-full h-[5rem] rounded-[0.8rem] bg-gray-200 shimmer" />
        <div className="w-full h-[5rem] rounded-[0.8rem] bg-gray-200 shimmer" />
      </div>
    </div>
  );
}
