'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getEstimationData } from '@/api/DriverService';
import type { ReviewCardEstimations } from '@/interfaces/Card/ReviewCardInterface';
import MovingTypeChips from '../chips/MovingTypeChips';
import { ButtonWrapper } from '../common/headless/Button';

export default function ReviewCard() {
  const [estimationsData, setEstimationsData] = useState<ReviewCardEstimations[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getEstimationData();
      setEstimationsData(data);
    };
    fetchData();
  }, []);

  if (estimationsData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {estimationsData.map(estimation => (
        <div key={estimation.id}>
          <div>
            <MovingTypeChips type={estimation.moveInfo.type} />
          </div>
          <div>
            <div>
              <Image src={estimation.driver.image} alt={estimation.driver.name} />
            </div>
            <div>
              <h1>{estimation.driver.name} 기사님</h1>
              <div>
                <div>
                  <h2>이사일</h2>
                  <span>{estimation.moveInfo.date}</span>
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
