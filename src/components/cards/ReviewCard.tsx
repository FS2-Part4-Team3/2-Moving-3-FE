import Image from 'next/image';
import type { ReviewCardProps } from '@/interfaces/Card/ReviewCardInterface';
import { DateWithoutDayWeeKFormat } from '@/utils/Format';
import MovingTypeChips from '../chips/MovingTypeChips';
import { ButtonWrapper } from '../common/headless/Button';

export default function ReviewCard({ estimation }: ReviewCardProps) {
  return (
    <div
      key={estimation.id}
      className="lg:w-[68.6rem] lg:h-[34.6rem] md:w-[60rem] md:h-[20.8rem] sm:w-[32.7rem] sm:h-[20.8rem] rounded-[2.4rem] lg:px-[2.4rem] lg:py-[3.2rem] md:px-[2rem] md:py-[2rem] sm:px-[1.4rem] sm:py-[2rem] bg-white border-none flex flex-col"
    >
      <div className="flex lg:gap-[1.2rem] md:gap-[0.8rem] sm:gap-[0.8rem] ">
        {estimation.moveInfo.type.map((type, index) => (
          <MovingTypeChips key={index} type={type} />
        ))}
      </div>
      <div className="flex lg:gap-[2.4rem] md:gap-[1.6rem] sm:gap-[1.2rem] items-center lg:w-[64rem] lg:h-[12.8rem] rounded-[0.6rem] border lg:px-[1.8rem] lg:py-[1.6rem] md:px-[0.8rem] md:py-[1.3rem] sm:px-0 sm:py-[1.3rem] bg-white border-line-100 lg:mt-[2.4rem] md:mt-[1.4rem] sm:mt-[1.4rem] lg:mb-[3.2rem] md:mb-[1.4rem] sm:mb-[1.4rem] ">
        <div className="lg:w-[9.6rem] lg:h-[9.6rem] md:w-[4.6rem] md:h-[4.6rem] sm:w-[4.6rem] sm:h-[4.6rem] relative ">
          <Image src={estimation.driver.image} alt={estimation.driver.name} fill />
        </div>
        <div className="flex flex-col lg:gap-[1.6rem] md:gap-[0.6rem] sm:gap-[0.6rem]">
          <h1 className="lg:text-[2.4rem] md:text-[1.4rem] sm:text-[1.4rem] font-semibold text-black-300 ">
            {estimation.driver.name} 기사님
          </h1>
          <div className="flex lg:gap-[1.6rem] md:gap-[1.25rem] sm:gap-[1.25rem] ">
            <div className="flex lg:gap-[1.2rem] md:gap-[0.6rem] sm:gap-[0.6rem]">
              <h2 className="lg:text-[2rem] md:text-[1.3rem] sm:text-[1.3rem] font-normal text-gray-500 ">이사일</h2>
              <span className="lg:text-[2rem] md:text-[1.3rem] sm:text-[1.3rem] font-semibold text-black-400 ">
                {DateWithoutDayWeeKFormat(estimation.moveInfo.date)}
              </span>
            </div>
            <div className="w-[0.1rem] lg:h-[1.6rem] md:h-[1.4rem] sm:h-[1.4rem] rounded-[10rem] bg-line-200 "></div>
            <div className="flex lg:gap-[1.2rem] md:gap-[0.6rem] sm:gap-[0.6rem]">
              <h2 className="lg:text-[2rem] md:text-[1.3rem] sm:text-[1.3rem] font-normal text-gray-500 ">견적가</h2>
              <span className="lg:text-[2rem] md:text-[1.3rem] sm:text-[1.3rem] font-semibold text-black-400 ">
                {estimation.price}원
              </span>
            </div>
          </div>
        </div>
      </div>
      <ButtonWrapper id="review_card-btn">
        <ButtonWrapper.Button className="lg:w-[64rem] lg:h-[6.4rem] md:w-[56rem] md:h-[3.8rem] sm:w-[29.9rem] sm:h-[4.8rem] lg:rounded-[1.6rem] md:rounded-[0.8rem] sm:rounded-[0.8rem] p-[1.6rem] bg-blue-300 text-center lg:text-[2rem] md:text-[1.6rem] sm:text-[1.6rem] font-semibold text-white ">
          리뷰 작성하기
        </ButtonWrapper.Button>
      </ButtonWrapper>
    </div>
  );
}
