'use client';

import Image from 'next/image';
import type { ReviewCardProps } from '@/interfaces/Card/ReviewCardInterface';
import { DateWithoutDayWeeKFormat } from '@/utils/Format';
import MovingTypeChips from '../chips/MovingTypeChips';
import { ButtonWrapper } from '../common/headless/Button';

export default function ReviewCard({ estimationsData }: ReviewCardProps) {
  return (
    <div>
      {estimationsData.map(estimation => (
        <div key={estimation.id}>
          <div>
            <MovingTypeChips type={estimation.moveInfo.type} />
          </div>
          <div>
            <div className="lg:w-[10.8rem] lg:h-[9.9rem] relative ">
              <Image src={estimation.driver.image} alt={estimation.driver.name} fill />
            </div>
            <div>
              <h1>{estimation.driver.name} 기사님</h1>
              <div>
                <div>
                  <h2>이사일</h2>
                  <span>{DateWithoutDayWeeKFormat(estimation.moveInfo.date)}</span>
                </div>
                <div>
                  <h2>견적가</h2>
                  <span>{estimation.price}원</span>
                </div>
              </div>
            </div>
          </div>
          <ButtonWrapper id="review_card-btn">
            <ButtonWrapper.Button>리뷰 작성하기</ButtonWrapper.Button>
          </ButtonWrapper>
        </div>
      ))}
    </div>
  );
}
