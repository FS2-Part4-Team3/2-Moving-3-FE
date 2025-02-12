import Image from 'next/image';
import profile_default from '@/../public/assets/common/gnb/default_profile.svg';
import star_gray from '@/../public/assets/driver/ic_star_gray.svg';
import star_yellow from '@/../public/assets/driver/ic_star_yellow.svg';
import { type ReviewCardProps } from '@/interfaces/Card/NormalReviewCardInterface';
import { DateWithoutDayWeeKFormat, priceFormat } from '@/utils/Format';
import MovingTypeChips from '../chips/MovingTypeChips';

export default function WrittenReviewCard({ myReview }: ReviewCardProps) {
  const renderStars = (score: number) => {
    const totalStars = 5;

    return Array.from({ length: totalStars }, (_, index) => {
      const yellowStar = index < score;

      return (
        <div key={index} className="lg:w-[4rem] lg:h-[4rem] md:w-[2rem] md:h-[2rem] sm:w-[2rem] sm:h-[2rem] relative">
          <Image
            src={yellowStar ? star_yellow : star_gray}
            alt="star"
            data-starType={yellowStar ? 'yellow' : 'gray'}
            width={20}
            height={20}
            style={{ cursor: 'pointer' }}
          />
        </div>
      );
    });
  };

  return (
    <>
      <div
        key={myReview.id}
        className="lg:w-[68.6rem] lg:h-[34.6rem] md:w-[60rem] md:h-[20.8rem] sm:w-[32.7rem] sm:h-[20.8rem] rounded-[2.4rem] lg:px-[2.4rem] lg:py-[3.2rem] md:px-[2rem] md:py-[2rem] sm:px-[1.4rem] sm:py-[2rem] bg-white border-none flex flex-col shadow-custom3"
      >
        <div className="flex flex-row items-center lg:gap-[1.2rem] md:gap-[0.8rem] sm:gap-[0.8rem] lg:w-[64rem] ">
          <MovingTypeChips type={myReview.estimation.moveInfos.serviceType} />
          {myReview.estimation.moveInfos.isSpecificRequest && <MovingTypeChips type="APPOINTMENT" />}

          <span className="lg:flex md:hidden sm:hidden lg:text-[1.8rem] font-normal text-gray-300 items-center ml-auto">
            작성일 {DateWithoutDayWeeKFormat(myReview.createdAt)}
          </span>
        </div>
        <div className="flex lg:gap-[2.4rem] md:gap-[1.6rem] sm:gap-[1.2rem] items-center lg:w-[64rem] lg:h-[12.8rem] rounded-[0.6rem] border lg:px-[1.8rem] lg:py-[1.6rem] md:px-[0.8rem] md:py-[1.3rem] sm:px-0 sm:py-[1.3rem] bg-white border-line-100 lg:mt-[2.4rem] md:mt-[1.4rem] sm:mt-[1.4rem] lg:mb-[3.2rem] md:mb-[1.4rem] sm:mb-[1.4rem] ">
          <div className="lg:w-[9.6rem] lg:h-[9.6rem] md:w-[4.6rem] md:h-[4.6rem] sm:w-[4.6rem] sm:h-[4.6rem] relative ">
            <Image src={myReview.driver.image ? myReview.driver.image : profile_default} alt={myReview.driver.name} fill />
          </div>
          <div className={`flex flex-col 'gap-0'`}>
            <h1
              className={`lg:text-[2.4rem] md:text-[1.4rem] sm:text-[1.4rem] font-semibold text-black-300  'lg:mb-[0.8rem] md:mb-[0.6rem] sm:mb-[0.6rem]'`}
            >
              {myReview.driver.name} 기사님
            </h1>
            <div
              className={`flex lg:gap-[1.6rem] md:gap-[1.25rem] sm:gap-[1.25rem] 'lg:mb-[1.6rem] md:mb-[1.4rem] sm:mb-[1.4rem]'`}
            >
              <div className="flex lg:gap-[1.2rem] md:gap-[0.6rem] sm:gap-[0.6rem]">
                <h2 className="lg:text-[2rem] md:text-[1.3rem] sm:text-[1.3rem] font-normal text-gray-500 ">이사일</h2>
                <span className="lg:text-[2rem] md:text-[1.3rem] sm:text-[1.3rem] font-medium text-black-400 ">
                  {DateWithoutDayWeeKFormat(myReview.estimation.moveInfos.date)}
                </span>
              </div>
              <div className="w-[0.1rem] lg:h-[1.6rem] md:h-[1.4rem] sm:h-[1.4rem] rounded-[10rem] bg-line-200 "></div>
              <div className="flex lg:gap-[1.2rem] md:gap-[0.6rem] sm:gap-[0.6rem]">
                <h2 className="lg:text-[2rem] md:text-[1.3rem] sm:text-[1.3rem] font-normal text-gray-500 ">견적가</h2>
                <span className="lg:text-[2rem] md:text-[1.3rem] sm:text-[1.3rem] font-medium text-black-400 ">
                  {priceFormat(myReview.estimation.price)}원
                </span>
              </div>
            </div>
            <div className="lg:flex md:hidden sm:hidden">{renderStars(myReview.score)}</div>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="lg:text-[2rem] font-normal text-gray-500">{myReview.comment}</span>
          <span className="lg:hidden md:block sm:block text-[1.2rem] font-normal text-gray-300 self-end">
            작성일 {DateWithoutDayWeeKFormat(myReview.createdAt)}
          </span>
        </div>
      </div>
    </>
  );
}
